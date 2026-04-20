/**
 * Session Service Implementation
 * 
 * Manages user sessions and session state
 */

import { SessionService, Session } from './types';
import { decodeToken } from './jwt';

/**
 * In-memory session store (in production, use Redis/database)
 */
const sessions = new Map<string, Session>();

/**
 * Session expiration time: 24 hours
 */
const SESSION_EXPIRY_MS = 24 * 60 * 60 * 1000;

/**
 * Generate a unique session ID
 */
function generateSessionId(): string {
  return `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * HappyTails Session Service implementation
 */
export class HappyTailsSessionService implements SessionService {
  /**
   * Create a new session for a user
   */
  async createSession(userId: string, deviceInfo?: string): Promise<string> {
    const sessionId = generateSessionId();
    const now = new Date();
    
    const session: Session = {
      id: sessionId,
      userId,
      createdAt: now,
      expiresAt: new Date(now.getTime() + SESSION_EXPIRY_MS),
      deviceInfo,
      isValid: true,
    };
    
    sessions.set(sessionId, session);
    
    // Clean up expired sessions periodically
    this.cleanupExpiredSessions();
    
    return sessionId;
  }
  
  /**
   * Get session by ID
   */
  async getSession(sessionId: string): Promise<Session | null> {
    const session = sessions.get(sessionId);
    
    if (!session) {
      return null;
    }
    
    // Check if expired
    if (new Date() > session.expiresAt) {
      await this.invalidateSession(sessionId);
      return null;
    }
    
    return session;
  }
  
  /**
   * Invalidate a session
   */
  async invalidateSession(sessionId: string): Promise<void> {
    const session = sessions.get(sessionId);
    
    if (session) {
      session.isValid = false;
      sessions.delete(sessionId);
    }
  }
  
  /**
   * Get all sessions for a user
   */
  async getUserSessions(userId: string): Promise<Session[]> {
    const userSessions: Session[] = [];
    const now = new Date();
    
    for (const session of sessions.values()) {
      if (session.userId === userId && session.isValid && session.expiresAt > now) {
        userSessions.push(session);
      }
    }
    
    return userSessions;
  }
  
  /**
   * Invalidate all sessions for a user
   */
  async invalidateAllUserSessions(userId: string): Promise<void> {
    for (const [sessionId, session] of sessions.entries()) {
      if (session.userId === userId) {
        session.isValid = false;
        sessions.delete(sessionId);
      }
    }
  }
  
  /**
   * Extend session expiration
   */
  async extendSession(sessionId: string, additionalMs: number = SESSION_EXPIRY_MS): Promise<boolean> {
    const session = sessions.get(sessionId);
    
    if (!session || !session.isValid) {
      return false;
    }
    
    session.expiresAt = new Date(session.expiresAt.getTime() + additionalMs);
    return true;
  }
  
  /**
   * Validate session from access token
   */
  async validateFromToken(accessToken: string): Promise<Session | null> {
    const payload = decodeToken(accessToken);
    
    if (!payload) {
      return null;
    }
    
    // Find an active session for this user
    const now = new Date();
    
    for (const session of sessions.values()) {
      if (
        session.userId === payload.sub &&
        session.isValid &&
        session.expiresAt > now
      ) {
        return session;
      }
    }
    
    // No active session found - create one
    return null;
  }
  
  /**
   * Clean up expired sessions
   */
  private cleanupExpiredSessions(): void {
    const now = new Date();
    
    for (const [sessionId, session] of sessions.entries()) {
      if (session.expiresAt <= now) {
        sessions.delete(sessionId);
      }
    }
  }
}

/**
 * Default session service instance
 */
export const sessionService = new HappyTailsSessionService();

/**
 * Factory function to create session service
 */
export function createSessionService(): SessionService {
  return new HappyTailsSessionService();
}
/**
 * Placeholder for session management
 */

export interface SessionService {
  createSession(userId: string): Promise<string>;
  getSession(sessionId: string): Promise<any>;
  invalidateSession(sessionId: string): Promise<void>;
}

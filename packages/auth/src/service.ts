/**
 * Auth Service Implementation
 * 
 * Handles user authentication, login, logout, and token management
 */

import { AuthService, AuthResult, AuthUser, AuthError, AuthException, UserRole } from './types';
import { createToken, createRefreshToken, verifyToken, verifyRefreshToken, TOKEN_EXPIRY } from './jwt';

/**
 * Mock user database for development
 * In production, this would be a real database
 */
const MOCK_USERS: Record<string, { password: string; user: AuthUser }> = {
  'admin@shelter.org': {
    password: 'admin123',
    user: {
      id: 'user-001',
      email: 'admin@shelter.org',
      name: 'Admin User',
      role: UserRole.ADMIN,
      createdAt: new Date('2024-01-01'),
      lastLoginAt: new Date(),
    },
  },
  'coordinator@shelter.org': {
    password: 'coord123',
    user: {
      id: 'user-002',
      email: 'coordinator@shelter.org',
      name: 'Alex Coordinator',
      role: UserRole.COORDINATOR,
      createdAt: new Date('2024-01-15'),
      lastLoginAt: new Date(),
    },
  },
  'foster@example.com': {
    password: 'foster123',
    user: {
      id: 'user-003',
      email: 'foster@example.com',
      name: 'Maria Foster',
      role: UserRole.FOSTER,
      createdAt: new Date('2024-02-01'),
      lastLoginAt: new Date(),
    },
  },
  'adopter@example.com': {
    password: 'adopter123',
    user: {
      id: 'user-004',
      email: 'adopter@example.com',
      name: 'Jordan Adopter',
      role: UserRole.ADOPTER,
      createdAt: new Date('2024-03-01'),
      lastLoginAt: new Date(),
    },
  },
};

/**
 * Active refresh tokens (in production, store in database/Redis)
 */
const activeRefreshTokens = new Set<string>();

/**
 * Auth Service implementation
 */
export class HappyTailsAuthService implements AuthService {
  /**
   * Authenticate user with email and password
   */
  async login(email: string, password: string): Promise<AuthResult> {
    // Simulate network delay
    await this.delay(300);
    
    const userRecord = MOCK_USERS[email.toLowerCase()];
    
    if (!userRecord) {
      throw {
        code: AuthError.INVALID_CREDENTIALS,
        message: 'Invalid email or password',
      } as AuthException;
    }
    
    if (userRecord.password !== password) {
      throw {
        code: AuthError.INVALID_CREDENTIALS,
        message: 'Invalid email or password',
      } as AuthException;
    }
    
    // Create tokens
    const accessToken = createToken({
      sub: userRecord.user.id,
      email: userRecord.user.email,
      role: userRecord.user.role,
    });
    
    const refreshToken = createRefreshToken(userRecord.user.id);
    
    // Store refresh token
    activeRefreshTokens.add(refreshToken);
    
    // Update last login
    userRecord.user.lastLoginAt = new Date();
    
    return {
      accessToken,
      refreshToken,
      expiresIn: TOKEN_EXPIRY.ACCESS,
      user: { ...userRecord.user },
    };
  }
  
  /**
   * Logout user and invalidate tokens
   */
  async logout(refreshToken?: string): Promise<void> {
    if (refreshToken) {
      activeRefreshTokens.delete(refreshToken);
    }
  }
  
  /**
   * Verify access token and return user info
   */
  async verify(token: string): Promise<AuthUser> {
    const payload = verifyToken(token);
    
    if (!payload) {
      throw {
        code: AuthError.TOKEN_INVALID,
        message: 'Invalid or expired token',
      } as AuthException;
    }
    
    // Find user by ID
    const user = Object.values(MOCK_USERS).find(u => u.user.id === payload.sub);
    
    if (!user) {
      throw {
        code: AuthError.TOKEN_INVALID,
        message: 'User not found',
      } as AuthException;
    }
    
    return user.user;
  }
  
  /**
   * Refresh access token using refresh token
   */
  async refresh(refreshToken: string): Promise<AuthResult> {
    const payload = verifyRefreshToken(refreshToken);
    
    if (!payload) {
      throw {
        code: AuthError.TOKEN_EXPIRED,
        message: 'Invalid or expired refresh token',
      } as AuthException;
    }
    
    // Find user
    const user = Object.values(MOCK_USERS).find(u => u.user.id === payload.sub);
    
    if (!user) {
      throw {
        code: AuthError.TOKEN_INVALID,
        message: 'User not found',
      } as AuthException;
    }
    
    // Create new tokens
    const accessToken = createToken({
      sub: user.user.id,
      email: user.user.email,
      role: user.user.role,
    });
    
    const newRefreshToken = createRefreshToken(user.user.id);
    
    // Rotate refresh token
    activeRefreshTokens.delete(refreshToken);
    activeRefreshTokens.add(newRefreshToken);
    
    return {
      accessToken,
      refreshToken: newRefreshToken,
      expiresIn: TOKEN_EXPIRY.ACCESS,
      user: { ...user.user },
    };
  }
  
  /**
   * Validate refresh token without creating new access token
   */
  async validateRefreshToken(refreshToken: string): Promise<boolean> {
    const payload = verifyRefreshToken(refreshToken);
    return payload !== null && activeRefreshTokens.has(refreshToken);
  }
  
  /**
   * Invalidate all sessions for a user
   */
  async invalidateAllSessions(_userId: string): Promise<void> {
    // In a real implementation, this would invalidate all tokens for the user
    // For now, we just clear all refresh tokens (simplified)
    activeRefreshTokens.clear();
  }
  
  /**
   * Helper to simulate network delay
   */
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

/**
 * Default auth service instance
 */
export const authService = new HappyTailsAuthService();

/**
 * Factory function to create auth service
 * Allows for dependency injection in tests
 */
export function createAuthService(): AuthService {
  return new HappyTailsAuthService();
}
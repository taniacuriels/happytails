/**
 * Auth Types
 * 
 * Type definitions for authentication and authorization
 * 
 * Note: UserRole is duplicated here to avoid circular dependencies.
 * In production, this should come from @happytails/domain
 */

/**
 * User roles in the system
 */
export enum UserRole {
  FOSTER = 'foster',
  ADOPTER = 'adopter',
  SHELTER_STAFF = 'shelter_staff',
  COORDINATOR = 'coordinator',
  ADMIN = 'admin',
}

/**
 * User credentials for login
 */
export interface Credentials {
  email: string;
  password: string;
}

/**
 * Authentication result containing tokens
 */
export interface AuthResult {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  user: AuthUser;
}

/**
 * User information returned after authentication
 */
export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatarUrl?: string;
  createdAt: Date;
  lastLoginAt?: Date;
}

/**
 * JWT Token payload
 */
export interface TokenPayload {
  sub: string; // user id
  email: string;
  role: UserRole;
  iat: number;
  exp: number;
}

/**
 * Session information
 */
export interface Session {
  id: string;
  userId: string;
  createdAt: Date;
  expiresAt: Date;
  deviceInfo?: string;
  isValid: boolean;
}

/**
 * Refresh token request
 */
export interface RefreshTokenRequest {
  refreshToken: string;
}

/**
 * Logout request
 */
export interface LogoutRequest {
  refreshToken?: string;
  allDevices?: boolean;
}

/**
 * Auth errors
 */
export enum AuthError {
  INVALID_CREDENTIALS = 'INVALID_CREDENTIALS',
  TOKEN_EXPIRED = 'TOKEN_EXPIRED',
  TOKEN_INVALID = 'TOKEN_INVALID',
  SESSION_EXPIRED = 'SESSION_EXPIRED',
  USER_DISABLED = 'USER_DISABLED',
  RATE_LIMITED = 'RATE_LIMITED',
}

export interface AuthException {
  code: AuthError;
  message: string;
}

/**
 * Auth Service interface
 */
export interface AuthService {
  login(email: string, password: string): Promise<AuthResult>;
  logout(refreshToken?: string): Promise<void>;
  verify(token: string): Promise<AuthUser>;
  refresh(refreshToken: string): Promise<AuthResult>;
}

/**
 * Session Service interface
 */
export interface SessionService {
  createSession(userId: string, deviceInfo?: string): Promise<string>;
  getSession(sessionId: string): Promise<Session | null>;
  invalidateSession(sessionId: string): Promise<void>;
}
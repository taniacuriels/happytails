/**
 * Auth Package
 * 
 * Authentication and authorization for HappyTails
 * 
 * @package @happytails/auth
 */

export * from './types';
export * from './jwt';
export * from './service';
export * from './sessionService';

// Re-export interfaces for convenience
export type { AuthService } from './types';
export type { SessionService } from './types';

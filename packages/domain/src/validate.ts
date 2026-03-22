/**
 * Validation utilities
 */

import { User, UserRole } from './types';

export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

export function validateRole(role: unknown): role is UserRole {
  return Object.values(UserRole).includes(role as UserRole);
}

export function validateUser(user: Partial<User>): boolean {
  if (!user.email || !user.name || !user.role) {
    return false;
  }
  
  if (!validateRole(user.role)) {
    return false;
  }
  
  return true;
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Domain Package
 * 
 * Core business logic including:
 * - User roles (foster, adopter, shelter staff, admin)
 * - Permissions matrix
 * - Business rules and constraints
 */

// Re-export all domain types and utilities
export * from './types';
export * from './roles';
export * from './permissions';
export * from './validate';

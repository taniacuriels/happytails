/**
 * Role definitions and utilities
 */

import { UserRole } from './types';

export const ROLE_LABELS: Record<UserRole, string> = {
  [UserRole.FOSTER]: 'Foster',
  [UserRole.ADOPTER]: 'Adopter',
  [UserRole.SHELTER_STAFF]: 'Shelter Staff',
  [UserRole.COORDINATOR]: 'Coordinator',
  [UserRole.ADMIN]: 'Administrator',
};

export const ROLE_HIERARCHY: Record<UserRole, number> = {
  [UserRole.ADMIN]: 5,
  [UserRole.COORDINATOR]: 4,
  [UserRole.SHELTER_STAFF]: 3,
  [UserRole.FOSTER]: 2,
  [UserRole.ADOPTER]: 1,
};

export function getLabel(role: UserRole): string {
  return ROLE_LABELS[role] || 'Unknown';
}

export function canElevate(fromRole: UserRole, toRole: UserRole): boolean {
  return ROLE_HIERARCHY[fromRole] > ROLE_HIERARCHY[toRole];
}

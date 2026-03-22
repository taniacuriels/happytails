/**
 * Permissions matrix
 * 
 * Defines what actions each role can perform
 */

import { UserRole } from './types';

type Action = string;

const PERMISSIONS: Record<UserRole, Record<Action, boolean>> = {
  [UserRole.ADMIN]: {
    // Admin has all permissions
    '*': true,
  },
  [UserRole.COORDINATOR]: {
    'view:animals': true,
    'view:users': true,
    'manage:foster_assignments': true,
    'moderate:messages': true,
    'manage:timelines': true,
  },
  [UserRole.SHELTER_STAFF]: {
    'view:animals': true,
    'create:animal_records': true,
    'update:animal_status': true,
    'view:conversations': true,
    'moderate:messages': true,
  },
  [UserRole.FOSTER]: {
    'view:assigned_animals': true,
    'update:animal_notes': true,
    'message:shelter_staff': true,
    'message:coordinator': true,
    'view:own_timeline': true,
  },
  [UserRole.ADOPTER]: {
    'view:available_animals': true,
    'message:shelter_staff': true,
    'view:own_timeline': true,
  },
};

export function hasPermission(role: UserRole, action: Action): boolean {
  const rolePerms = PERMISSIONS[role];
  if (!rolePerms) return false;
  
  // Check wildcard permission
  if (rolePerms['*']) return true;
  
  // Check specific permission
  return rolePerms[action] === true;
}

export function getPermissions(role: UserRole): Record<Action, boolean> {
  return PERMISSIONS[role] || {};
}

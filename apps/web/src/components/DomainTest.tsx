import React from 'react';
import { UserRole, getLabel, canElevate, validateRole, validateUser } from '@happytails/domain';

export default function DomainTest() {
  const testUser = {
    id: '1',
    email: 'test@example.com',
    name: 'Test User',
    role: UserRole.FOSTER,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  return (
    <div style={{ padding: 16, background: '#f8f8f8', borderRadius: 8 }}>
      <h3>Domain Package Test</h3>
      <div>Role label: {getLabel(testUser.role)}</div>
      <div>Can foster elevate admin? {canElevate(UserRole.FOSTER, UserRole.ADMIN) ? 'Yes' : 'No'}</div>
      <div>Is FOSTER a valid role? {validateRole(UserRole.FOSTER) ? 'Yes' : 'No'}</div>
      <div>Is testUser valid? {validateUser(testUser) ? 'Yes' : 'No'}</div>
    </div>
  );
}

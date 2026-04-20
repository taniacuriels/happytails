import { UserRole } from '../src/types';
import { ROLE_LABELS, ROLE_HIERARCHY, getLabel, canElevate } from '../src/roles';
import { validateRole, validateUser, validateEmail, ValidationError } from '../src/validate';

describe('UserRole', () => {
  it('should have all expected roles', () => {
    expect(Object.values(UserRole)).toEqual(
      expect.arrayContaining(['foster', 'adopter', 'shelter_staff', 'coordinator', 'admin'])
    );
  });
});

describe('Role labels and hierarchy', () => {
  it('should return correct label for each role', () => {
    expect(getLabel(UserRole.FOSTER)).toBe('Foster');
    expect(getLabel(UserRole.ADOPTER)).toBe('Adopter');
    expect(getLabel(UserRole.SHELTER_STAFF)).toBe('Shelter Staff');
    expect(getLabel(UserRole.COORDINATOR)).toBe('Coordinator');
    expect(getLabel(UserRole.ADMIN)).toBe('Administrator');
  });

  it('should determine if a role can elevate another', () => {
    expect(canElevate(UserRole.ADMIN, UserRole.FOSTER)).toBe(true);
    expect(canElevate(UserRole.FOSTER, UserRole.ADMIN)).toBe(false);
    expect(canElevate(UserRole.COORDINATOR, UserRole.FOSTER)).toBe(true);
  });
});

describe('Validation utilities', () => {
  it('should validate valid roles', () => {
    expect(validateRole(UserRole.FOSTER)).toBe(true);
    expect(validateRole('invalid')).toBe(false);
  });

  it('should validate users', () => {
    expect(
      validateUser({
        id: '1',
        email: 'test@example.com',
        name: 'Test',
        role: UserRole.FOSTER,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
    ).toBe(true);
    expect(validateUser({ email: '', name: '', role: '' })).toBe(false);
  });

  it('should validate emails', () => {
    expect(validateEmail('test@example.com')).toBe(true);
    expect(validateEmail('invalid-email')).toBe(false);
  });
});

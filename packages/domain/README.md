# Domain Package

Core business logic, roles, permissions, and business rules.

## Exports

### Types
- `UserRole` - Role enumeration
- `User` - User interface
- `Animal` - Animal interface
- `Conversation` - Conversation interface
- `Timeline` - Timeline interface
- And more...

### Utilities
- `hasPermission()` - Check if a role can perform an action
- `validateUser()` - Validate user data
- `validateEmail()` - Email validation

### Role Management
- `ROLE_LABELS` - Human-readable role names
- `ROLE_HIERARCHY` - Role priority levels
- `canElevate()` - Check if one role can manage another

## Usage

```typescript
import { UserRole, hasPermission, validateUser } from '@happytails/domain';

if (hasPermission(UserRole.ADMIN, 'manage:users')) {
  // Admin can manage users
}
```

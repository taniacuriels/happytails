# Contributing

## Architecture Principles

This project follows a monorepo structure with shared business logic and platform-specific presentations.

### Key Rules
- **Business logic is shared** - Keep it in packages under `packages/`
- **Presentation is platform-specific** - Apps have independent UI implementations
- **Design tokens are shared** - Use design tokens package for styling
- **Type safety first** - All code should be TypeScript with strict mode

## Project Structure

```
apps/
  ├─ mobile/        # React Native app
  └─ web/           # Next.js web app

packages/
  ├─ domain/        # Business rules, roles, permissions
  ├─ messaging/     # Communication logic
  ├─ scheduling/    # Timeline and appointment logic
  ├─ notifications/ # Notification system
  ├─ auth/          # Authentication
  └─ design-tokens/ # Shared design language
```

## Development Workflow

### Setup
```bash
npm install
npm run build
```

### Development
```bash
npm run dev
```

This runs all apps/packages in development mode.

### Testing
```bash
npm run test        # Run all tests
npm run test:watch  # Watch mode
```

### Linting & Type Checking
```bash
npm run lint
npm run type-check
```

### Building for Production
```bash
npm run build
npm start  # runs from each app
```

## Code Style

- **Formatting** - Prettier (auto on save)
- **Linting** - ESLint
- **Language** - TypeScript with strict mode
- **Imports** - Path aliases for cross-package imports

### Path Aliases

Access packages using these aliases:
```typescript
import { UserRole } from '@domain/types';
import { ConversationService } from '@messaging/conversation';
import { TimelineService } from '@scheduling/timeline';
import { COLORS } from '@design-tokens/colors';
```

## Commit Convention

Use conventional commits:
```
feat: add new feature
fix: fix a bug
docs: documentation changes
style: code style (no logic changes)
refactor: code refactoring
test: test additions/changes
chore: dependency or tooling changes
```

## Pull Request Process

1. Create feature branch from `main`
2. Make changes following code style
3. Test locally: `npm run test && npm run lint && npm run type-check`
4. Push and create PR with description
5. Ensure CI passes and request review

## Package Development

When developing a new package:

1. Create package structure in `packages/package-name`
2. Add `package.json`, `tsconfig.json`, `src/index.ts`
3. Export public API from `src/index.ts`
4. Add README.md explaining the package
5. Update root `package.json` workspaces if needed
6. Implement with TypeScript + strict mode

## Adding Dependencies

- Use `npm install` at root to add to all workspaces
- Use `npm install -w @package-name` to add to specific workspace
- Update workspace dependencies in package.json

## Questions or Issues?

See the [architecture document](docs/happytails_architecture.md) for design decisions.

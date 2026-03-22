# HappyTails

A comprehensive Shelter Communication Platform for coordinating animal rescue, foster networks, and adoptions.

## Architecture

This is a monorepo containing:

### Apps
- **mobile** - React Native app for fosters, adopters, on-call staff
- **web** - Next.js web app for shelter admins, coordinators, power users

### Packages (Shared Business Logic)
- **domain** - Roles, permissions, business rules
- **messaging** - Threads, events, moderation rules
- **scheduling** - Timelines, appointments, conflicts
- **notifications** - Triggers and preferences
- **auth** - Authentication and authorization
- **design-tokens** - Shared design language (colors, spacing, typography)

## Getting Started

```bash
# Install dependencies
npm install

# Start development
npm run dev

# Run tests
npm run test

# Build for production
npm run build
```

## Project Structure

```
repo/
├─ apps/
│  ├─ mobile/        # React Native app
│  └─ web/           # Next.js web app
├─ packages/
│  ├─ domain/        # Business logic & rules
│  ├─ messaging/     # Communication engine
│  ├─ scheduling/    # Timeline & appointment management
│  ├─ notifications/ # Alert & notification system
│  ├─ auth/          # Authentication
│  └─ design-tokens/ # Design system
├─ docs/             # Architecture & design docs
└─ package.json
```

## Key Principles

- **Platform-Appropriate UX**: Shared business logic, platform-specific presentation
- **Mobile-First for Time-Sensitive**: Push notifications, quick responses
- **Web for Complexity**: Bulk operations, data oversight, coordination
- **Accessibility Baseline**: Keyboard navigation, screen readers, high contrast

## Documentation

See [docs/happytails_architecture.md](docs/happytails_architecture.md) for detailed architecture decisions.

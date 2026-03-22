# UX Architecture Mapping --- Shelter Communication Platform

This document maps the Shelter Communication Platform's UX decisions to
concrete **App vs Web architecture** and clarifies **which features
belong where**, grounded in real shelter workflows.

------------------------------------------------------------------------

## 1. Product Surfaces Overview

### Mobile App (Primary)

**Purpose:** Daily, emotional, time-sensitive interactions\
**Users:** Fosters, adopters, on-call shelter staff\
**Usage Pattern:** Short sessions, interrupt-driven, notification-heavy

### Web App (Complementary)

**Purpose:** Management, oversight, and complexity\
**Users:** Shelter admins, coordinators, power users\
**Usage Pattern:** Longer sessions, data-heavy, multi-tasking

------------------------------------------------------------------------

## 2. Feature-by-Feature Platform Mapping

### Centralized Communication

**Mobile (Primary)** - Inbox & conversation threads - Quick replies -
Attachments (photos, vet docs) - Push notifications - Read receipts

**Web (Secondary)** - Full message history - Search across
conversations - Moderation and escalation - Audit trails

**Principle:** Send and respond on mobile. Review and manage on web.

------------------------------------------------------------------------

### Role-Based Interfaces

**Mobile** - Strong role gating - Minimal navigation - Role-focused
tasks only

**Web** - Role switching - Cross-role visibility - Bulk and
administrative actions

**Principle:** Mobile is the role experience. Web is role coordination.

------------------------------------------------------------------------

### Timeline-Based Scheduling

**Mobile (Primary)** - Animal timelines - Adoption timelines - "What's
next" emphasis

**Web (Expanded)** - Filterable timelines - Calendar overlays - Conflict
detection - Bulk rescheduling

**Principle:** Mobile explains what's happening. Web explains how it
fits together.

------------------------------------------------------------------------

### Notification Strategy

**Mobile** - Push notifications - Time-sensitive alerts -
Acknowledgement-required events

**Web** - Notification center - Notification history - Preference
management

**Principle:** Mobile interrupts. Web explains.

------------------------------------------------------------------------

### Accessibility

**Mobile** - Large tap targets - Clear typography - Reduced motion
support - Screen reader compatibility

**Web** - Keyboard navigation - Screen reader support - High-contrast
modes - Zoom-safe layouts

Accessibility is a baseline requirement across platforms.

------------------------------------------------------------------------

### Custom Design System

**Shared** - Design tokens (colors, spacing, typography, motion) -
Semantic meaning and intent

**Not Shared** - Platform-specific components - Navigation patterns -
Gesture handling

**Principle:** Share design language, not UI code.

------------------------------------------------------------------------

### Motion & Interaction

**Mobile** - State transitions - Loading skeletons - Confirmation
feedback

**Web** - Subtle transitions - Expand/collapse interactions - Focus
indicators

Motion is functional, not decorative.

------------------------------------------------------------------------

### Progressive Disclosure

**Mobile** - Simple defaults - Advanced actions hidden - Contextual
expansion

**Web** - Advanced panels - Bulk operations - Dense information views

**Principle:** Mobile reduces stress. Web supports power users.

------------------------------------------------------------------------

## 3. Architecture Mapping

    repo/
    ├─ apps/
    │  ├─ mobile/        # React Native app
    │  └─ web/           # Web app (Next.js / React)
    │
    ├─ packages/
    │  ├─ domain/        # Roles, permissions, business rules
    │  ├─ messaging/     # Threads, events, moderation rules
    │  ├─ scheduling/    # Timelines, appointments, conflicts
    │  ├─ notifications/# Triggers and preferences
    │  ├─ auth/
    │  └─ design-tokens/

**Core Rule:** Business logic is shared. Presentation is
platform-specific.

------------------------------------------------------------------------

## 4. Executive Summary

The mobile app is optimized for real-time, emotional, and task-driven
interactions.\
The web platform is optimized for coordination, oversight, and
complexity.

Both platforms share the same domain logic while expressing it through
platform-appropriate UX.

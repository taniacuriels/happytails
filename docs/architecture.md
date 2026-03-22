# Architecture Overview — Shelter Communication Platform

This document describes the high-level system architecture for the Shelter App, designed to support both Web and Mobile clients with shared UI, state, and UX principles.

---

## 1. High-Level System Architecture

```mermaid
flowchart LR
  subgraph Clients
    RN[React Native App]
    WEB[Next.js Web App]
  end

  subgraph Shared
    UI[Design System<br/>Storybook]
    HOOKS[Shared Hooks]
    UTILS[Shared Utils]
  end

  subgraph Services
    API[Backend API]
    AUTH[Auth Service]
    NOTIF[Notification Service]
  end

  RN --> UI
  RN --> HOOKS
  RN --> API

  WEB --> UI
  WEB --> HOOKS
  WEB --> API

  API --> AUTH
  API --> NOTIF

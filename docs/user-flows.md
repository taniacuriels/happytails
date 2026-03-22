# Shelter App – User Map & Flows

This document defines the core **user personas, user flows, and interaction paths** for the Shelter & Foster Management App. These flows guide UX decisions, navigation structure, and feature implementation across mobile (React Native) and web (Next.js).

---

## Purpose

The goal of this app is to centralize communication, scheduling, and adoption workflows for shelters, fosters, volunteers, and adopters—reducing fragmented tools and missed information.

This document is used to:

* Inform wireframes and UI design
* Define navigation and screen structure
* Align development with real user needs
* Demonstrate UX-driven engineering in a portfolio

---

## Personas Overview

### Foster / Caregiver

**Goals**

* Care for foster pets
* Track vet appointments
* Coordinate meet-and-greets
* Communicate with shelter volunteers

**Pain Points**

* Multiple communication channels
* Missed or unclear scheduling
* Scattered pet information

---

### Volunteer / Shelter Staff

**Goals**

* Review adoption applications
* Coordinate fosters and adopters
* Schedule meet-and-greets
* Verify vet references

**Pain Points**

* Tracking many pets and people
* Manual follow-ups
* Operational complexity

---

### Adopter (Optional MVP)

**Goals**

* Apply for adoption
* Track application status
* Schedule meet-and-greets

**Pain Points**

* Lack of transparency
* Delayed communication
* Unclear next steps

---

## High-Level User Map

```
Authentication
 └── Role Detection
      ├── Foster Dashboard
      ├── Volunteer Dashboard
      └── Adopter Dashboard
```

Each role has a dedicated dashboard while sharing common systems like messaging, notifications, and scheduling.

---

## Foster User Flow

### Foster Dashboard Flow

```
Login
 └── Foster Dashboard
      ├── My Pets
      │    └── Pet Detail
      │         ├── Health Info
      │         ├── Vet Appointments
      │         │    └── Appointment Detail
      │         │         ├── Confirm / Reschedule
      │         │         └── Notes
      │         └── Meet & Greets
      │              └── Meet & Greet Detail
      │                   ├── Confirm / Decline
      │                   └── Message Volunteer
      ├── Upcoming Schedule (Timeline View)
      ├── Messages
      └── Notifications
```

**UX Focus**

* Timeline-based dashboard
* Quick access to upcoming tasks
* Minimal administrative overhead

---

## Volunteer / Shelter Staff Flow

### Adoption & Scheduling Flow

```
Login
 └── Volunteer Dashboard
      ├── Applications
      │    └── Application Detail
      │         ├── Applicant Info
      │         ├── Vet References
      │         │    └── Vet Review Status
      │         ├── Approve / Reject
      │         └── Message Applicant
      ├── Pets
      │    └── Pet Detail
      │         ├── Foster Assigned
      │         ├── Meet & Greets
      │         │    └── Schedule Meet & Greet
      │         └── Status Updates
      ├── Scheduling
      │    └── Calendar View
      ├── Messages
      └── Reports / History
```

**UX Focus**

* Status-driven UI
* Clear operational overview
* Action-first layouts

---

## Adopter Flow (Optional MVP)

```
Sign Up
 └── Application Dashboard
      ├── My Applications
      │    └── Application Status
      │         ├── Submitted
      │         ├── Under Review
      │         ├── Approved / Rejected
      │         └── Next Steps
      ├── Meet & Greets
      │    └── Schedule / Confirm
      ├── Messages
      └── Notifications
```

**UX Focus**

* Transparency
* Status clarity
* Reduced anxiety through communication

---

## Shared Cross-Role Flows

### Notifications Flow

```
Event Trigger
 └── Push / In-App Notification
      └── Deep Link to Relevant Screen
```

Examples:

* Meet-and-greet scheduled
* Upcoming vet appointment
* Application status update

---

### Messaging Flow

```
Messages
 └── Conversation
      ├── Foster ↔ Volunteer
      ├── Volunteer ↔ Adopter
      └── Context-aware (linked to pet or application)
```

---

## How This Supports Development

These flows map directly to:

* Role-based navigation
* State-driven UI rendering
* Screen-level ownership
* Cross-platform reuse (mobile + web)

They provide a clear blueprint for:

* Figma wireframes
* Component design
* Redux / state modeling
* React Navigation & Next.js routing

---

## Portfolio & Resume Value

This document demonstrates:

* UX-driven engineering
* Persona-based design
* Real-world workflow modeling
* Design-to-code thinking

---

**Author**
Tania C. Curiel Salazar

/**
 * Core domain types shared across the platform
 */

export enum UserRole {
  FOSTER = 'foster',
  ADOPTER = 'adopter',
  SHELTER_STAFF = 'shelter_staff',
  COORDINATOR = 'coordinator',
  ADMIN = 'admin',
}

export enum AnimalStatus {
  INTAKE = 'intake',
  AVAILABLE = 'available',
  FOSTER = 'foster',
  ADOPTED = 'adopted',
  RETURNED = 'returned',
  DECEASED = 'deceased',
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

export interface Animal {
  id: string;
  name: string;
  species: string;
  status: AnimalStatus;
  age?: number;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Conversation {
  id: string;
  participants: string[]; // User IDs
  subject: string;
  createdAt: Date;
  updatedAt: Date;
  lastMessageAt?: Date;
}

export interface Message {
  id: string;
  conversationId: string;
  authorId: string;
  content: string;
  attachments?: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Timeline {
  id: string;
  entityId: string; // Animal or user ID
  entityType: 'animal' | 'user';
  events: TimelineEvent[];
  createdAt: Date;
  updatedAt: Date;
}

export interface TimelineEvent {
  id: string;
  type: string;
  description: string;
  timestamp: Date;
  metadata?: Record<string, unknown>;
}

/**
 * Placeholder for timeline logic
 */

export interface TimelineService {
  createEvent(entityId: string, type: string, description: string): Promise<void>;
  getEvents(entityId: string): Promise<any[]>;
}

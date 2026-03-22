/**
 * Placeholder for notification triggers
 */

export interface NotificationTrigger {
  id: string;
  eventType: string;
  condition: Record<string, unknown>;
  active: boolean;
}

export interface TriggerService {
  registerTrigger(trigger: NotificationTrigger): Promise<void>;
  fireTrigger(eventType: string, context: Record<string, unknown>): Promise<void>;
}

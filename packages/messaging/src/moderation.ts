/**
 * Placeholder for moderation logic
 */

export interface ModerationRule {
  id: string;
  name: string;
  active: boolean;
}

export interface ModerationService {
  checkMessage(content: string): Promise<boolean>;
  reportMessage(messageId: string, reason: string): Promise<void>;
}

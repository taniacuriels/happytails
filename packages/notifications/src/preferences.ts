/**
 * Placeholder for preference management
 */

export interface NotificationPreferences {
  userId: string;
  enablePush: boolean;
  enableEmail: boolean;
  quietHoursStart?: string;
  quietHoursEnd?: string;
}

export interface PreferenceService {
  getPreferences(userId: string): Promise<NotificationPreferences>;
  updatePreferences(userId: string, prefs: Partial<NotificationPreferences>): Promise<void>;
}

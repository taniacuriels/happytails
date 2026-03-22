/**
 * Placeholder for notification logic
 */

export interface NotificationService {
  send(userId: string, title: string, body: string): Promise<void>;
  getHistory(userId: string): Promise<any[]>;
}

/**
 * Placeholder for message logic
 */

export interface MessageService {
  send(conversationId: string, authorId: string, content: string): Promise<string>;
  getMessages(conversationId: string, limit?: number): Promise<any[]>;
  delete(messageId: string): Promise<void>;
}

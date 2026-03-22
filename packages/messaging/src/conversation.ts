/**
 * Placeholder for conversation logic
 */

export interface ConversationService {
  create(participantIds: string[], subject: string): Promise<string>;
  getById(id: string): Promise<any>;
  list(userId: string): Promise<any[]>;
  addParticipant(conversationId: string, userId: string): Promise<void>;
}

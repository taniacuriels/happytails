'use client';

import { MessageService, ConversationService } from '@happytails/messaging';

/**
 * POC: Using shared messaging package in web app
 */
export default function MessagingDemo() {
  // These would be implemented with actual backend calls
  const messageService: MessageService = {
    send: async (conversationId, authorId, content) => {
      console.log('Sending message:', { conversationId, authorId, content });
      return 'msg-123'; // Return mock message ID
    },
    getMessages: async (conversationId, limit = 50) => {
      console.log('Fetching messages for:', conversationId, 'limit:', limit);
      return []; // Return mock messages
    },
    delete: async (messageId) => {
      console.log('Deleting message:', messageId);
    },
  };

  const conversationService: ConversationService = {
    create: async (participantIds, subject) => {
      console.log('Creating conversation:', { participantIds, subject });
      return 'conv-123';
    },
    getById: async (id) => {
      console.log('Getting conversation:', id);
      return null;
    },
    list: async (userId) => {
      console.log('Listing conversations for:', userId);
      return [];
    },
    addParticipant: async (conversationId, userId) => {
      console.log('Adding participant:', { conversationId, userId });
    },
  };

  const handleSendMessage = async () => {
    const messageId = await messageService.send('conv-1', 'user-1', 'Hello from web!');
    console.log('Message sent:', messageId);
    
    // Also test conversation service
    const convId = await conversationService.create(['user-1', 'user-2'], 'Test Conversation');
    console.log('Conversation created:', convId);
  };

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', margin: '20px 0' }}>
      <h2>Messaging Package POC</h2>
      <p>Using @happytails/messaging package in Next.js web app</p>
      
      <div style={{ marginTop: '10px' }}>
        <button 
          onClick={handleSendMessage}
          style={{
            padding: '8px 16px',
            background: '#0070f3',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Test Message Service
        </button>
      </div>

      <div style={{ marginTop: '10px', fontSize: '12px', color: '#666' }}>
        Check console for logs
      </div>
    </div>
  );
}
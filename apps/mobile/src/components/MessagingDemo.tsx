/**
 * POC: Using shared messaging package in mobile app
 */

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { MessageService, ConversationService } from '@happytails/messaging';

const messageService: MessageService = {
  send: async (conversationId, authorId, content) => {
    console.log('Sending message:', { conversationId, authorId, content });
    return 'msg-123';
  },
  getMessages: async (conversationId, limit = 50) => {
    console.log('Fetching messages for:', conversationId, 'limit:', limit);
    return [];
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

export default function MessagingDemo() {
  const handleSendMessage = async () => {
    const messageId = await messageService.send('conv-1', 'user-1', 'Hello from mobile!');
    console.log('Message sent:', messageId);
    
    const convId = await conversationService.create(['user-1', 'user-2'], 'Test Conversation');
    console.log('Conversation created:', convId);
    
    Alert.alert('Success', 'Message sent! Check console for logs.');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Messaging Package POC</Text>
      <Text style={styles.subtitle}>Using @happytails/messaging in React Native</Text>
      
      <TouchableOpacity 
        style={styles.button}
        onPress={handleSendMessage}
      >
        <Text style={styles.buttonText}>Test Message Service</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    margin: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#0070f3',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 4,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
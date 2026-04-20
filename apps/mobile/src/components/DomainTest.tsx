import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { UserRole, getLabel, canElevate, validateRole, validateUser } from '@happytails/domain';

export default function DomainTest() {
  const testUser = {
    id: '1',
    email: 'test@example.com',
    name: 'Test User',
    role: UserRole.FOSTER,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Domain Package Test</Text>
      <Text>Role label: {getLabel(testUser.role)}</Text>
      <Text>Can foster elevate admin? {canElevate(UserRole.FOSTER, UserRole.ADMIN) ? 'Yes' : 'No'}</Text>
      <Text>Is FOSTER a valid role? {validateRole(UserRole.FOSTER) ? 'Yes' : 'No'}</Text>
      <Text>Is testUser valid? {validateUser(testUser) ? 'Yes' : 'No'}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    margin: 8,
  },
  header: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 8,
  },
});

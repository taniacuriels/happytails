/**
 * POC: Using shared auth package in mobile app
 */

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { authService, createToken, verifyToken, TOKEN_EXPIRY } from '@happytails/auth';

export default function AuthTest() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');
  const [error, setError] = useState('');

  const testLogin = async () => {
    setLoading(true);
    setResult('');
    setError('');
    
    try {
      // Test login
      const loginResult = await authService.login('foster@example.com', 'foster123');
      setResult(`✅ Login successful!\nUser: ${loginResult.user.name}\nRole: ${loginResult.user.role}`);
      
      // Test verify
      const user = await authService.verify(loginResult.accessToken);
      console.log('Verified user:', user);
      
      // Test token creation
      const testToken = createToken({
        sub: 'test-user',
        email: 'test@example.com',
        role: 'foster' as any,
      });
      console.log('Created test token:', testToken);
      
      // Test token verification
      const payload = verifyToken(testToken);
      console.log('Token payload:', payload);
      
      Alert.alert('Success', 'Auth package working! Check console for details.');
    } catch (e: any) {
      setError(`❌ Error: ${e.message || e.code || JSON.stringify(e)}`);
      Alert.alert('Error', e.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const testInvalidLogin = async () => {
    setLoading(true);
    setResult('');
    setError('');
    
    try {
      await authService.login('foster@example.com', 'wrongpassword');
      setError('❌ Should have thrown an error');
    } catch (e: any) {
      setResult(`✅ Correctly rejected invalid credentials\nError: ${e.code}`);
      Alert.alert('Success', 'Invalid credentials properly rejected');
    } finally {
      setLoading(false);
    }
  };

  const testAdminLogin = async () => {
    setLoading(true);
    setResult('');
    setError('');
    
    try {
      const loginResult = await authService.login('admin@shelter.org', 'admin123');
      setResult(`✅ Admin Login!\nUser: ${loginResult.user.name}\nRole: ${loginResult.user.role}`);
      Alert.alert('Success', 'Admin login successful!');
    } catch (e: any) {
      setError(`❌ Error: ${e.message}`);
      Alert.alert('Error', e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Auth Package Test</Text>
      <Text style={styles.subtitle}>Testing @happytails/auth in React Native</Text>
      
      {loading && <ActivityIndicator size="large" color="#0070f3" />}
      
      <TouchableOpacity 
        style={[styles.button, styles.primaryButton]}
        onPress={testLogin}
        disabled={loading}
      >
        <Text style={styles.buttonText}>Test Foster Login</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={[styles.button, styles.secondaryButton]}
        onPress={testAdminLogin}
        disabled={loading}
      >
        <Text style={styles.buttonText}>Test Admin Login</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={[styles.button, styles.dangerButton]}
        onPress={testInvalidLogin}
        disabled={loading}
      >
        <Text style={styles.buttonText}>Test Invalid Credentials</Text>
      </TouchableOpacity>
      
      {result ? (
        <View style={styles.resultBox}>
          <Text style={styles.resultText}>{result}</Text>
        </View>
      ) : null}
      
      {error ? (
        <View style={[styles.resultBox, styles.errorBox]}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : null}
      
      <Text style={styles.hint}>
        Token expiry: {TOKEN_EXPIRY.ACCESS / 1000 / 60}min access, {TOKEN_EXPIRY.REFRESH / 1000 / 60 / 60 / 24}days refresh
      </Text>
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
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 4,
    alignItems: 'center',
    marginBottom: 10,
  },
  primaryButton: {
    backgroundColor: '#22c55e',
  },
  secondaryButton: {
    backgroundColor: '#0070f3',
  },
  dangerButton: {
    backgroundColor: '#ef4444',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  resultBox: {
    marginTop: 16,
    padding: 12,
    backgroundColor: '#dcfce7',
    borderRadius: 4,
  },
  resultText: {
    color: '#166534',
    fontSize: 14,
  },
  errorBox: {
    backgroundColor: '#fee2e2',
  },
  errorText: {
    color: '#991b1b',
    fontSize: 14,
  },
  hint: {
    marginTop: 16,
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
});
/**
 * POC: Using shared auth package in mobile app
 * Login form with email and password inputs
 */

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, ActivityIndicator, TextInput } from 'react-native';
import { authService } from '@happytails/auth';

export default function AuthTest() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Please enter both email and password');
      Alert.alert('Error', 'Please enter both email and password');
      return;
    }
    
    setLoading(true);
    setResult('');
    setError('');
    
    try {
      const loginResult = await authService.login(email, password);
      setResult(`✅ Login successful!\nUser: ${loginResult.user.name}\nRole: ${loginResult.user.role}\nEmail: ${loginResult.user.email}`);
      Alert.alert('Success', `Welcome ${loginResult.user.name}!`);
    } catch (e: any) {
      const errorMsg = e.message || e.code || 'Login failed';
      setError(`❌ Error: ${errorMsg}`);
      Alert.alert('Error', errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setEmail('');
    setPassword('');
    setResult('');
    setError('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🔐 Login</Text>
      
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Enter your email"
          placeholderTextColor="#999"
          autoCapitalize="none"
          keyboardType="email-address"
          autoCorrect={false}
        />
      </View>
      
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Password</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            value={password}
            onChangeText={setPassword}
            placeholder="Enter your password"
            placeholderTextColor="#999"
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity 
            style={styles.eyeButton}
            onPress={() => setShowPassword(!showPassword)}
          >
            <Text style={styles.eyeText}>{showPassword ? '🙈' : '👁️'}</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={styles.buttonRow}>
        <TouchableOpacity 
          style={[styles.button, styles.primaryButton]}
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Login</Text>
          )}
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.button, styles.secondaryButton]}
          onPress={handleClear}
          disabled={loading}
        >
          <Text style={styles.buttonText}>Clear</Text>
        </TouchableOpacity>
      </View>
      
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
      
      <View style={styles.helpBox}>
        <Text style={styles.helpTitle}>Test Credentials:</Text>
        <Text style={styles.helpText}>• Foster: foster@example.com / foster123</Text>
        <Text style={styles.helpText}>• Admin: admin@shelter.org / admin123</Text>
        <Text style={styles.helpText}>• Adopter: adopter@example.com / adopter123</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    margin: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 10,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  passwordInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 10,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  eyeButton: {
    position: 'absolute',
    right: 10,
    padding: 5,
  },
  eyeText: {
    fontSize: 18,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  button: {
    flex: 1,
    padding: 12,
    borderRadius: 4,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  primaryButton: {
    backgroundColor: '#22c55e',
  },
  secondaryButton: {
    backgroundColor: '#6b7280',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resultBox: {
    marginTop: 12,
    padding: 10,
    backgroundColor: '#d1fae5',
    borderRadius: 4,
  },
  resultText: {
    fontSize: 14,
    fontFamily: 'monospace',
    color: '#065f46',
  },
  errorBox: {
    backgroundColor: '#fee2e2',
  },
  errorText: {
    fontSize: 14,
    fontFamily: 'monospace',
    color: '#991b1b',
  },
  helpBox: {
    marginTop: 16,
    padding: 10,
    backgroundColor: '#f3f4f6',
    borderRadius: 4,
  },
  helpTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#666',
  },
  helpText: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
});

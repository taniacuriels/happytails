/**
 * Auth Package Test - Simple verification
 * 
 * This tests the auth package by importing it in the web app
 */

'use client';

import { authService, createToken, verifyToken, TOKEN_EXPIRY } from '@happytails/auth';
import { useState } from 'react';

export default function AuthTest() {
  const [result, setResult] = useState<string>('');
  const [error, setError] = useState<string>('');

  const testLogin = async () => {
    setResult('');
    setError('');
    
    try {
      // Test login
      const loginResult = await authService.login('foster@example.com', 'foster123');
      setResult(`✅ Login successful!\nUser: ${loginResult.user.name} (${loginResult.user.role})\nToken: ${loginResult.accessToken.substring(0, 30)}...`);
      
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
      
    } catch (e: any) {
      setError(`❌ Error: ${e.message || e.code || JSON.stringify(e)}`);
    }
  };

  const testInvalidLogin = async () => {
    setResult('');
    setError('');
    
    try {
      await authService.login('foster@example.com', 'wrongpassword');
      setError('❌ Should have thrown an error');
    } catch (e: any) {
      setResult(`✅ Correctly rejected invalid credentials\nError: ${e.code} - ${e.message}`);
    }
  };

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', margin: '20px 0' }}>
      <h2>Auth Package Test</h2>
      <p>Testing @happytails/auth package</p>
      
      <div style={{ marginBottom: '10px' }}>
        <button 
          onClick={testLogin}
          style={{
            padding: '8px 16px',
            background: '#22c55e',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            marginRight: '10px'
          }}
        >
          Test Valid Login
        </button>
        
        <button 
          onClick={testInvalidLogin}
          style={{
            padding: '8px 16px',
            background: '#ef4444',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Test Invalid Login
        </button>
      </div>
      
      <div style={{ marginTop: '10px' }}>
        <p style={{ whiteSpace: 'pre-wrap', fontFamily: 'monospace' }}>
          {result}
        </p>
        <p style={{ whiteSpace: 'pre-wrap', fontFamily: 'monospace', color: 'red' }}>
          {error}
        </p>
      </div>
      
      <div style={{ marginTop: '10px', fontSize: '12px', color: '#666' }}>
        <p>Token expiry: {TOKEN_EXPIRY.ACCESS}ms (15 min) access, {TOKEN_EXPIRY.REFRESH}ms (7 days) refresh</p>
        <p>Check browser console for detailed logs</p>
      </div>
    </div>
  );
}
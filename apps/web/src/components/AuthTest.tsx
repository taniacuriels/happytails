'use client';

import { authService } from '@happytails/auth';
import { useState } from 'react';

export default function AuthTest() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [result, setResult] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }
    
    setLoading(true);
    setResult('');
    setError('');
    
    try {
      const loginResult = await authService.login(email, password);
      setResult(`✅ Login successful!\nUser: ${loginResult.user.name} (${loginResult.user.role})\nEmail: ${loginResult.user.email}\nToken: ${loginResult.accessToken.substring(0, 30)}...`);
      
      // Test verify
      const user = await authService.verify(loginResult.accessToken);
      console.log('Verified user:', user);
      
    } catch (e: any) {
      setError(`❌ Error: ${e.message || e.code || JSON.stringify(e)}`);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setEmail('');
    setPassword('');
    setResult('');
    setError('');
  };

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', margin: '20px 0', borderRadius: '8px' }}>
      <h2>🔐 Login</h2>
      
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          style={{
            width: '100%',
            padding: '10px',
            fontSize: '16px',
            border: '1px solid #ccc',
            borderRadius: '4px'
          }}
        />
      </div>
      
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Password</label>
        <div style={{ position: 'relative' }}>
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            style={{
              width: '100%',
              padding: '10px',
              paddingRight: '40px',
              fontSize: '16px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              boxSizing: 'border-box'
            }}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            style={{
              position: 'absolute',
              right: '10px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: '14px',
              color: '#666'
            }}
          >
            {showPassword ? '🙈' : '👁️'}
          </button>
        </div>
      </div>
      
      <div style={{ marginBottom: '15px' }}>
        <button 
          onClick={handleLogin}
          disabled={loading}
          style={{
            padding: '12px 24px',
            background: loading ? '#9ca3af' : '#22c55e',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: loading ? 'not-allowed' : 'pointer',
            fontSize: '16px',
            fontWeight: 'bold',
            marginRight: '10px'
          }}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
        
        <button 
          onClick={handleLogout}
          style={{
            padding: '12px 24px',
            background: '#6b7280',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          Clear
        </button>
      </div>
      
      <div style={{ marginTop: '10px' }}>
        <p style={{ whiteSpace: 'pre-wrap', fontFamily: 'monospace', color: 'green' }}>
          {result}
        </p>
        <p style={{ whiteSpace: 'pre-wrap', fontFamily: 'monospace', color: 'red' }}>
          {error}
        </p>
      </div>
      
      <div style={{ marginTop: '15px', fontSize: '12px', color: '#666', background: '#f3f4f6', padding: '10px', borderRadius: '4px' }}>
        <p style={{ fontWeight: 'bold', marginBottom: '5px' }}>Test Credentials:</p>
        <p>• Foster: foster@example.com / foster123</p>
        <p>• Admin: admin@shelter.org / admin123</p>
        <p>• Adopter: adopter@example.com / adopter123</p>
      </div>
    </div>
  );
}
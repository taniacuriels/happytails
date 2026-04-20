/**
 * Auth Package Test
 * 
 * Run with: npx ts-node packages/auth/test.ts
 */

import { authService, createToken, verifyToken, TOKEN_EXPIRY } from './dist/index.js';

async function runTests() {
  console.log('🧪 Testing @happytails/auth package\n');
  
  // Test 1: Login with valid credentials
  console.log('Test 1: Login with valid credentials');
  try {
    const result = await authService.login('foster@example.com', 'foster123');
    console.log('  ✅ Login successful');
    console.log('  - Access token:', result.accessToken.substring(0, 50) + '...');
    console.log('  - User:', result.user.name, '(' + result.user.role + ')');
    console.log('  - Expires in:', result.expiresIn, 'ms');
  } catch (e: any) {
    console.log('  ❌ Login failed:', e.message);
  }
  console.log('');
  
  // Test 2: Login with invalid credentials
  console.log('Test 2: Login with invalid credentials');
  try {
    await authService.login('foster@example.com', 'wrongpassword');
    console.log('  ❌ Should have thrown error');
  } catch (e: any) {
    console.log('  ✅ Correctly rejected invalid credentials');
    console.log('  - Error:', e.code, '-', e.message);
  }
  console.log('');
  
  // Test 3: Verify token
  console.log('Test 3: Verify token');
  try {
    const loginResult = await authService.login('admin@shelter.org', 'admin123');
    const user = await authService.verify(loginResult.accessToken);
    console.log('  ✅ Token verified');
    console.log('  - User:', user.name, '(' + user.role + ')');
  } catch (e: any) {
    console.log('  ❌ Verification failed:', e.message);
  }
  console.log('');
  
  // Test 4: Refresh token
  console.log('Test 4: Refresh token');
  try {
    const loginResult = await authService.login('coordinator@shelter.org', 'coord123');
    const refreshResult = await authService.refresh(loginResult.refreshToken);
    console.log('  ✅ Token refreshed');
    console.log('  - New access token:', refreshResult.accessToken.substring(0, 50) + '...');
  } catch (e: any) {
    console.log('  ❌ Refresh failed:', e.message);
  }
  console.log('');
  
  // Test 5: JWT utilities
  console.log('Test 5: JWT utilities');
  const token = createToken({
    sub: 'user-123',
    email: 'test@example.com',
    role: 'foster' as any,
  });
  const payload = verifyToken(token);
  console.log('  ✅ Created and verified token');
  console.log('  - Payload:', payload);
  console.log('');
  
  // Test 6: Token expiration
  console.log('Test 6: Token expiration');
  console.log('  - Access token expiry:', TOKEN_EXPIRY.ACCESS, 'ms (15 minutes)');
  console.log('  - Refresh token expiry:', TOKEN_EXPIRY.REFRESH, 'ms (7 days)');
  console.log('');
  
  // Test 7: Logout
  console.log('Test 7: Logout');
  try {
    const loginResult = await authService.login('adopter@example.com', 'adopter123');
    await authService.logout(loginResult.refreshToken);
    console.log('  ✅ Logout successful');
  } catch (e: any) {
    console.log('  ❌ Logout failed:', e.message);
  }
  console.log('');
  
  console.log('🎉 All tests completed!');
}

runTests().catch(console.error);
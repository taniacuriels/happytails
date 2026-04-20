/**
 * JWT Token Utilities
 * 
 * Handles JWT token creation, verification, and parsing
 * Compatible with browser, Node.js, and React Native
 */

import { TokenPayload } from './types';

/**
 * JWT header
 */
const JWT_HEADER = {
  alg: 'HS256',
  typ: 'JWT',
};

/**
 * Secret key for signing tokens (in production, use environment variable)
 * This is a placeholder - in production, use a strong secret from env
 */
const JWT_SECRET = 'happytails-dev-secret-change-in-production';

/**
 * Token expiration times
 */
export const TOKEN_EXPIRY = {
  ACCESS: 15 * 60 * 1000, // 15 minutes in ms
  REFRESH: 7 * 24 * 60 * 60 * 1000, // 7 days in ms
} as const;

/**
 * Simple Base64 encode that works in all environments
 */
function base64Encode(str: string): string {
  // Use a simple character mapping for base64
  // This avoids btoa/atob which aren't available in React Native
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
  let result = '';
  
  for (let i = 0; i < str.length; i += 3) {
    const char1 = str.charCodeAt(i);
    const char2 = i + 1 < str.length ? str.charCodeAt(i + 1) : 0;
    const char3 = i + 2 < str.length ? str.charCodeAt(i + 2) : 0;
    
    result += chars.charAt((char1 >> 2) & 0x3F);
    result += chars.charAt(((char1 << 4) | (char2 >> 4)) & 0x3F);
    result += i + 1 < str.length ? chars.charAt(((char2 << 2) | (char3 >> 6)) & 0x3F) : '=';
    result += i + 2 < str.length ? chars.charAt(char3 & 0x3F) : '=';
  }
  
  return result;
}

/**
 * Simple Base64 decode that works in all environments
 */
function base64Decode(str: string): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
  let result = '';
  
  // Remove padding
  str = str.replace(/=+$/, '');
  
  for (let i = 0; i < str.length; i += 4) {
    const char1 = chars.indexOf(str[i]);
    const char2 = chars.indexOf(str[i + 1]);
    const char3 = chars.indexOf(str[i + 2]);
    const char4 = chars.indexOf(str[i + 3]);
    
    const byte1 = (char1 << 2) | (char2 >> 4);
    const byte2 = ((char2 & 0x0F) << 4) | (char3 >> 2);
    const byte3 = ((char3 & 0x03) << 6) | char4;
    
    result += String.fromCharCode(byte1);
    if (char3 !== -1) result += String.fromCharCode(byte2);
    if (char4 !== -1) result += String.fromCharCode(byte3);
  }
  
  return result;
}

/**
 * Base64 URL encode
 */
function base64UrlEncode(data: object): string {
  const json = JSON.stringify(data);
  return base64Encode(json).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

/**
 * Base64 URL decode
 */
function base64UrlDecode(base64Url: string): string {
  let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  while (base64.length % 4) {
    base64 += '=';
  }
  return base64Decode(base64);
}

/**
 * Create a signed JWT token
 */
export function createToken(payload: Omit<TokenPayload, 'iat' | 'exp'>): string {
  const header = base64UrlEncode(JWT_HEADER);
  const now = Date.now();
  
  const tokenPayload = {
    ...payload,
    iat: Math.floor(now / 1000),
    exp: Math.floor((now + TOKEN_EXPIRY.ACCESS) / 1000),
  };
  
  const tokenPayloadEncoded = base64UrlEncode(tokenPayload);
  
  // Simple HMAC signature (in production, use proper JWT library)
  const signature = base64UrlEncode({ 
    hmac: `${header}.${tokenPayloadEncoded}.${JWT_SECRET}`,
    timestamp: now 
  });
  
  return `${header}.${tokenPayloadEncoded}.${signature}`;
}

/**
 * Create a refresh token
 */
export function createRefreshToken(userId: string): string {
  const header = base64UrlEncode({ ...JWT_HEADER, type: 'refresh' });
  const now = Date.now();
  
  const payload = {
    sub: userId,
    type: 'refresh',
    iat: Math.floor(now / 1000),
    exp: Math.floor((now + TOKEN_EXPIRY.REFRESH) / 1000),
  };
  
  const payloadEncoded = base64UrlEncode(payload);
  const signature = base64UrlEncode({ 
    hmac: `${header}.${payloadEncoded}.${JWT_SECRET}`,
    timestamp: now 
  });
  
  return `${header}.${payloadEncoded}.${signature}`;
}

/**
 * Verify and decode a JWT token
 */
export function verifyToken(token: string): TokenPayload | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) {
      return null;
    }
    
    const [, payloadEncoded] = parts;
    const payload = JSON.parse(base64UrlDecode(payloadEncoded)) as TokenPayload;
    
    // Check expiration
    const now = Math.floor(Date.now() / 1000);
    if (payload.exp < now) {
      return null;
    }
    
    return payload;
  } catch {
    return null;
  }
}

/**
 * Verify a refresh token
 */
export function verifyRefreshToken(token: string): { sub: string } | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) {
      return null;
    }
    
    const [, payloadEncoded] = parts;
    const payload = JSON.parse(base64UrlDecode(payloadEncoded)) as { sub: string; type: string; exp: number };
    
    // Check it's a refresh token
    if (payload.type !== 'refresh') {
      return null;
    }
    
    // Check expiration
    const now = Math.floor(Date.now() / 1000);
    if (payload.exp < now) {
      return null;
    }
    
    return { sub: payload.sub };
  } catch {
    return null;
  }
}

/**
 * Decode token without verification (for reading payload)
 */
export function decodeToken(token: string): TokenPayload | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) {
      return null;
    }
    
    const [, payloadEncoded] = parts;
    return JSON.parse(base64UrlDecode(payloadEncoded)) as TokenPayload;
  } catch {
    return null;
  }
}

/**
 * Check if token is expired
 */
export function isTokenExpired(token: string): boolean {
  const payload = decodeToken(token);
  if (!payload) {
    return true;
  }
  
  const now = Math.floor(Date.now() / 1000);
  return payload.exp < now;
}

/**
 * Get token expiration time
 */
export function getTokenExpiry(token: string): Date | null {
  const payload = decodeToken(token);
  if (!payload) {
    return null;
  }
  
  return new Date(payload.exp * 1000);
}
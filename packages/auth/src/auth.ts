/**
 * Placeholder for authentication
 */

export interface AuthService {
  login(email: string, password: string): Promise<string>;
  logout(token: string): Promise<void>;
  verify(token: string): Promise<any>;
}

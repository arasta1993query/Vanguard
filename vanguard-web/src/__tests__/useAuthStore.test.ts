import { describe, it, expect, beforeEach } from 'vitest';
import { useAuthStore } from '../store/useAuthStore';

describe('useAuthStore (Zustand Global Auth State)', () => {
  beforeEach(() => {
    // Reset state before each test
    useAuthStore.setState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    });
  });

  it('initially has no authenticated user', () => {
    const state = useAuthStore.getState();
    expect(state.user).toBeNull();
    expect(state.isAuthenticated).toBe(false);
  });

  it('setAuth updates the user and authentication status', () => {
    const mockUser = { id: '123', email: 'test@vanguard.local', roles: ['User'] };
    
    useAuthStore.getState().setAuth(mockUser);
    
    const state = useAuthStore.getState();
    expect(state.user).toEqual(mockUser);
    expect(state.isAuthenticated).toBe(true);
  });

  it('clearAuth removes the user and authentication status', () => {
    const mockUser = { id: '123', email: 'test@vanguard.local', roles: ['Admin'] };
    useAuthStore.getState().setAuth(mockUser);
    
    // Perform Clear
    useAuthStore.getState().clearAuth();
    
    const state = useAuthStore.getState();
    expect(state.user).toBeNull();
    expect(state.isAuthenticated).toBe(false);
  });
});

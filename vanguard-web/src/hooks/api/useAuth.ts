import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { useAuthStore, User } from '@/store/useAuthStore';

// Fetch current user based on HttpOnly cookie
export const useCurrentUser = () => {
  const { setAuth, clearAuth, setLoading } = useAuthStore();

  return useQuery({
    queryKey: ['currentUser'],
    queryFn: async () => {
      try {
        const { data } = await apiClient.get<User>('/auth/me');
        setAuth(data);
        return data;
      } catch (err) {
        clearAuth();
        throw err;
      }
    },
    retry: false, // Don't retry if essentially unauthenticated
  });
};

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (credentials: Record<string, string>) => {
      const { data } = await apiClient.post('/auth/login', credentials);
      return data;
    },
    onSuccess: () => {
      // Invalidate the current user query to force a re-fetch and update Zustand
      queryClient.invalidateQueries({ queryKey: ['currentUser'] });
    },
  });
};

export const useRegister = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userData: Record<string, string>) => {
      const { data } = await apiClient.post('/auth/register', userData);
      return data;
    },
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  const { clearAuth } = useAuthStore();

  return useMutation({
    mutationFn: async () => {
      await apiClient.post('/auth/logout');
    },
    onSuccess: () => {
      clearAuth();
      queryClient.clear();
      window.location.href = '/login';
    },
  });
};

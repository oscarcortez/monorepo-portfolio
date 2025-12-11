import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

type UserResponse = {
  id: string;
  email: string;
  name: string;
};

type LoginCredentials = {
  email: string;
  password: string;
};

const authApi = {
  login: async (credentials: LoginCredentials): Promise<UserResponse> => {
    const res = await fetch('http://localhost:4000/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(credentials),
    });

    if (!res.ok) {
      throw new Error('Login failed');
    }

    return res.json();
  },

  me: async (): Promise<UserResponse> => {
    const res = await fetch('/api/auth/me', { credentials: 'include' });
    if (!res.ok) throw new Error('Not authenticated');
    return res.json();
  },

  logout: async (): Promise<void> => {
    await fetch('/api/auth/logout', {
      method: 'POST',
      credentials: 'include',
    });
  },
};

export function useUser() {
  return useQuery({
    queryKey: ['user'],
    queryFn: authApi.me,
    retry: false,
    staleTime: 5 * 60 * 1000,
  });
}

export function useLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authApi.login,
    onSuccess: (user) => {
      queryClient.setQueryData(['user'], user);
    },
  });
}

export function useLogout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      queryClient.setQueryData(['user'], null);
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });
}

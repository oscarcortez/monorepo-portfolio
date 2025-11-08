import { create } from 'zustand';

import { UserPublic } from '@/src/app/graphql/generated/graphql';

type UserPublicState = {
  user: UserPublic | null;
  setUser: (_user: UserPublic | null) => void;
  loading: boolean;
  setLoading: (_loading: boolean) => void;
  error: Error | null;
  setError: (_error: Error | null) => void;
};

export const useUserPublicStore = create<UserPublicState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  loading: false,
  setLoading: (loading) => set({ loading }),
  error: null,
  setError: (error) => set({ error }),
}));

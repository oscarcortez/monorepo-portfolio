import { create } from 'zustand';

import { UserHeroQuery } from '@/src/app/graphql/generated/graphql-types';

type UserHero = UserHeroQuery['userHero'];

type UserPublicState = {
  user: UserHero | null;
  setUser: (_user: UserHero | null) => void;
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

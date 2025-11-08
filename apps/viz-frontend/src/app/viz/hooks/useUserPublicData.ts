'use client';

import { useEffect } from 'react';

import { useUserHeroQuery } from '../../graphql/generated/graphql';
import { useUserPublicStore } from '../stores/userPublicStore';

export const useUserPublicData = (userUuid: string) => {
  const { setUser, setLoading, setError } = useUserPublicStore();

  const { data, loading, error } = useUserHeroQuery({
    variables: { userUuid },
  });

  useEffect(() => {
    setLoading(loading);

    if (data?.userHero) {
      setUser(data.userHero);
    }

    if (error) {
      setError(error);
    }
  }, [data, error, loading, setError, setLoading, setUser]);

  return useUserPublicStore();
};

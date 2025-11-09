'use client';

import { useEffect } from 'react';
import { useQuery } from '@apollo/client/react';

import type { UserHeroQuery, UserHeroQueryVariables } from '../../graphql/generated/graphql-types';
import { useUserPublicStore } from '../stores/userPublicStore';

import { USER_HERO_QUERY } from './graphql';

export const useUserPublicData = (userUuid: string) => {
  const { setUser, setLoading, setError } = useUserPublicStore();

  const { data, loading, error } = useQuery<UserHeroQuery, UserHeroQueryVariables>(USER_HERO_QUERY, {
    variables: { userUuid },
  });

  useEffect(() => {
    setLoading(loading);
    // console.log({ data, error });

    if (data?.userHero) {
      setUser(data.userHero);
    }

    if (error) {
      setError(error);
    }
  }, [data, error, loading, setError, setLoading, setUser]);

  return useUserPublicStore();
};

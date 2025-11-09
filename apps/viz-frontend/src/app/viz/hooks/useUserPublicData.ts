'use client';

import { useEffect } from 'react';
// import { useQuery } from '@apollo/client/react/hooks';
import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client/react';

import type { UserHeroQuery, UserHeroQueryVariables } from '../../graphql/generated/graphql-types';
import { useUserPublicStore } from '../stores/userPublicStore';

const USER_HERO_QUERY = gql`
  query UserHero($userUuid: String!) {
    userHero(userUuid: $userUuid) {
      uuid
      name
      email
      contacts {
        displayText
        iconPath
        link
        title
        type
        uuid
        className
      }
      heroGreetings {
        content
        device
        footer
        title
        uuid
      }
      navLinks {
        className
        content
        language
        url
        uuid
      }
      payments {
        displayText
        isFavorite
        link
        title
        paymentSource {
          logoPath
          website
          name
        }
      }
    }
  }
`;

export const useUserPublicData = (userUuid: string) => {
  const { setUser, setLoading, setError } = useUserPublicStore();

  const { data, loading, error } = useQuery<UserHeroQuery, UserHeroQueryVariables>(USER_HERO_QUERY, {
    variables: { userUuid },
  });

  useEffect(() => {
    setLoading(loading);
    console.log({ data, error });

    if (data?.userHero) {
      setUser(data.userHero);
    }

    if (error) {
      setError(error);
    }
  }, [data, error, loading, setError, setLoading, setUser]);

  return useUserPublicStore();
};

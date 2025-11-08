'use client';

import { PropsWithChildren } from 'react';
import { HttpLink } from '@apollo/client';
import { ApolloNextAppProvider, ApolloClient, InMemoryCache } from '@apollo/client-integration-nextjs';

const client = () => {
  const httpLink = new HttpLink({
    uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
    fetchOptions: { cache: 'no-store' },
  });

  return new ApolloClient({
    cache: new InMemoryCache(),
    link: httpLink,
    devtools: {
      enabled: process.env.NODE_ENV !== 'production', // Habilita devtools solo en desarrollo
    },
  });
};

export function ApolloWrapper({ children }: PropsWithChildren) {
  return <ApolloNextAppProvider makeClient={client}>{children}</ApolloNextAppProvider>;
}

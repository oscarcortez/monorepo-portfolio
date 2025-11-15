'use client';

import { PropsWithChildren } from 'react';
import { HttpLink, ApolloLink } from '@apollo/client';
import { ApolloNextAppProvider, ApolloClient, InMemoryCache } from '@apollo/client-integration-nextjs';

const client = () => {
  // Auth middleware que agrega el token al header
  const authLink = new ApolloLink((operation, forward) => {
    // Obtén el token del localStorage
    const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;

    // Agrega el header Authorization con Bearer token
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : '',
      },
    });

    return forward(operation);
  });

  const httpLink = new HttpLink({
    uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
    fetchOptions: { cache: 'no-store' },
  });

  return new ApolloClient({
    cache: new InMemoryCache(),
    link: ApolloLink.from([authLink, httpLink]), // ✅ authLink primero, luego httpLink
    devtools: {
      enabled: process.env.NODE_ENV !== 'production', // Habilita devtools solo en desarrollo
    },
  });
};

export function ApolloWrapper({ children }: PropsWithChildren) {
  return <ApolloNextAppProvider makeClient={client}>{children}</ApolloNextAppProvider>;
}

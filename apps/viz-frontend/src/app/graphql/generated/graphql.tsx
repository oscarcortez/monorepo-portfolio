import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
  JSON: { input: any; output: any; }
};

export type Contact = {
  __typename?: 'Contact';
  className?: Maybe<Scalars['String']['output']>;
  contactId: Scalars['ID']['output'];
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  displayText?: Maybe<Scalars['String']['output']>;
  iconPath?: Maybe<Scalars['String']['output']>;
  link: Scalars['String']['output'];
  sortOrder: Scalars['Int']['output'];
  title: Scalars['String']['output'];
  type: ContactType;
  user: User;
  userId: Scalars['Int']['output'];
  uuid: Scalars['String']['output'];
};

export enum ContactType {
  Discord = 'DISCORD',
  Email = 'EMAIL',
  Facebook = 'FACEBOOK',
  Github = 'GITHUB',
  Instagram = 'INSTAGRAM',
  Linkedin = 'LINKEDIN',
  Phone = 'PHONE',
  Resume = 'RESUME',
  Tiktok = 'TIKTOK',
  Twitter = 'TWITTER',
  Website = 'WEBSITE',
  Youtube = 'YOUTUBE'
}

export enum DeviceType {
  Desktop = 'DESKTOP',
  Mobile = 'MOBILE',
  Other = 'OTHER',
  Tablet = 'TABLET',
  Tv = 'TV'
}

export type HeroGreeting = {
  __typename?: 'HeroGreeting';
  content: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  device: DeviceType;
  footer: Scalars['String']['output'];
  heroGreetingId: Scalars['ID']['output'];
  language: LanguageCode;
  title: Scalars['String']['output'];
  user: User;
  userId: Scalars['Int']['output'];
  uuid: Scalars['String']['output'];
};

export enum LanguageCode {
  En = 'EN',
  Es = 'ES',
  Fr = 'FR',
  Pt = 'PT'
}

export type NavLink = {
  __typename?: 'NavLink';
  className?: Maybe<Scalars['String']['output']>;
  content: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  language: LanguageCode;
  navLinkId: Scalars['ID']['output'];
  sortOrder: Scalars['Int']['output'];
  updatedAt: Scalars['DateTime']['output'];
  url: Scalars['String']['output'];
  user: User;
  userId: Scalars['Int']['output'];
  uuid: Scalars['String']['output'];
};

export type Payment = {
  __typename?: 'Payment';
  className?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  displayText?: Maybe<Scalars['String']['output']>;
  isFavorite: Scalars['Boolean']['output'];
  link?: Maybe<Scalars['String']['output']>;
  paymentId: Scalars['ID']['output'];
  paymentSource?: Maybe<PaymentSource>;
  paymentSourceId: Scalars['Int']['output'];
  sortOrder: Scalars['Int']['output'];
  title: Scalars['String']['output'];
  user: User;
  userId: Scalars['Int']['output'];
  uuid: Scalars['String']['output'];
};

export type PaymentSource = {
  __typename?: 'PaymentSource';
  Payment?: Maybe<Array<Payment>>;
  _count: PaymentSourceCount;
  code?: Maybe<Scalars['String']['output']>;
  countryCode?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  logoPath?: Maybe<Scalars['String']['output']>;
  metadata?: Maybe<Scalars['JSON']['output']>;
  name: Scalars['String']['output'];
  paymentSourceId: Scalars['ID']['output'];
  type: PaymentSourceType;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  uuid: Scalars['String']['output'];
  website?: Maybe<Scalars['String']['output']>;
};

export type PaymentSourceCount = {
  __typename?: 'PaymentSourceCount';
  Payment: Scalars['Int']['output'];
};

export enum PaymentSourceType {
  Bank = 'BANK',
  Crypto = 'CRYPTO',
  Other = 'OTHER',
  Psp = 'PSP',
  Wallet = 'WALLET'
}

export type Query = {
  __typename?: 'Query';
  hello: Scalars['String']['output'];
  userHero: User;
};


export type QueryUserHeroArgs = {
  userUuid: Scalars['String']['input'];
};

export type User = {
  __typename?: 'User';
  _count: UserCount;
  contacts?: Maybe<Array<Contact>>;
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  email: Scalars['String']['output'];
  heroGreetings?: Maybe<Array<HeroGreeting>>;
  name: Scalars['String']['output'];
  navLinks?: Maybe<Array<NavLink>>;
  passwordHash: Scalars['String']['output'];
  payments?: Maybe<Array<Payment>>;
  updatedAt: Scalars['DateTime']['output'];
  userId: Scalars['ID']['output'];
  uuid: Scalars['String']['output'];
};

export type UserCount = {
  __typename?: 'UserCount';
  contacts: Scalars['Int']['output'];
  heroGreetings: Scalars['Int']['output'];
  navLinks: Scalars['Int']['output'];
  payments: Scalars['Int']['output'];
};

export type UserHeroQueryVariables = Exact<{
  userUuid: Scalars['String']['input'];
}>;


export type UserHeroQuery = { __typename?: 'Query', userHero: { __typename?: 'User', uuid: string, name: string, email: string, contacts?: Array<{ __typename?: 'Contact', displayText?: string | null, iconPath?: string | null, link: string, title: string, type: ContactType, uuid: string, className?: string | null }> | null, heroGreetings?: Array<{ __typename?: 'HeroGreeting', content: string, device: DeviceType, footer: string, title: string, uuid: string }> | null, navLinks?: Array<{ __typename?: 'NavLink', className?: string | null, content: string, language: LanguageCode, url: string, uuid: string }> | null, payments?: Array<{ __typename?: 'Payment', displayText?: string | null, isFavorite: boolean, link?: string | null, title: string, paymentSource?: { __typename?: 'PaymentSource', logoPath?: string | null, website?: string | null, name: string } | null }> | null } };


export const UserHeroDocument = gql`
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

/**
 * __useUserHeroQuery__
 *
 * To run a query within a React component, call `useUserHeroQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserHeroQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserHeroQuery({
 *   variables: {
 *      userUuid: // value for 'userUuid'
 *   },
 * });
 */
export function useUserHeroQuery(baseOptions: ApolloReactHooks.QueryHookOptions<UserHeroQuery, UserHeroQueryVariables> & ({ variables: UserHeroQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<UserHeroQuery, UserHeroQueryVariables>(UserHeroDocument, options);
      }
export function useUserHeroLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<UserHeroQuery, UserHeroQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<UserHeroQuery, UserHeroQueryVariables>(UserHeroDocument, options);
        }
export function useUserHeroSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<UserHeroQuery, UserHeroQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<UserHeroQuery, UserHeroQueryVariables>(UserHeroDocument, options);
        }
export type UserHeroQueryHookResult = ReturnType<typeof useUserHeroQuery>;
export type UserHeroLazyQueryHookResult = ReturnType<typeof useUserHeroLazyQuery>;
export type UserHeroSuspenseQueryHookResult = ReturnType<typeof useUserHeroSuspenseQuery>;
export type UserHeroQueryResult = Apollo.QueryResult<UserHeroQuery, UserHeroQueryVariables>;
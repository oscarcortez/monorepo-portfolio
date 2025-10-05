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
};

export type ContactPublic = {
  __typename?: 'ContactPublic';
  displayText?: Maybe<Scalars['String']['output']>;
  iconPath?: Maybe<Scalars['String']['output']>;
  link: Scalars['String']['output'];
  title: Scalars['String']['output'];
  type: ContactType;
  uuid: Scalars['String']['output'];
};

/** Contact type enumeration */
export enum ContactType {
  Email = 'EMAIL',
  Github = 'GITHUB',
  Instagram = 'INSTAGRAM',
  Linkedin = 'LINKEDIN',
  Phone = 'PHONE',
  Twitter = 'TWITTER'
}

/** Device type for hero greetings */
export enum DeviceType {
  Desktop = 'DESKTOP',
  Mobile = 'MOBILE',
  Other = 'OTHER',
  Tablet = 'TABLET',
  Tv = 'TV'
}

export type HeroGreetingPublic = {
  __typename?: 'HeroGreetingPublic';
  content: Scalars['String']['output'];
  device: DeviceType;
  footer: Scalars['String']['output'];
  title: Scalars['String']['output'];
  uuid: Scalars['String']['output'];
};

/** Language code enumeration */
export enum LanguageCode {
  En = 'EN',
  Es = 'ES',
  Fr = 'FR',
  Pt = 'PT'
}

export type NavLinkPublic = {
  __typename?: 'NavLinkPublic';
  className?: Maybe<Scalars['String']['output']>;
  content: Scalars['String']['output'];
  language: LanguageCode;
  url: Scalars['String']['output'];
  uuid: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  hello: Scalars['String']['output'];
  userHero: UserPublic;
};


export type QueryUserHeroArgs = {
  userUuid: Scalars['String']['input'];
};

export type UserPublic = {
  __typename?: 'UserPublic';
  contacts: Array<ContactPublic>;
  email: Scalars['String']['output'];
  heroGreetings: Array<HeroGreetingPublic>;
  name: Scalars['String']['output'];
  navLinks: Array<NavLinkPublic>;
  uuid: Scalars['String']['output'];
};

export type UserHeroQueryVariables = Exact<{
  userUuid: Scalars['String']['input'];
}>;


export type UserHeroQuery = { __typename?: 'Query', userHero: { __typename?: 'UserPublic', uuid: string, name: string, email: string, contacts: Array<{ __typename?: 'ContactPublic', displayText?: string | null, iconPath?: string | null, link: string, title: string, type: ContactType, uuid: string }>, heroGreetings: Array<{ __typename?: 'HeroGreetingPublic', content: string, device: DeviceType, footer: string, title: string, uuid: string }>, navLinks: Array<{ __typename?: 'NavLinkPublic', className?: string | null, content: string, language: LanguageCode, url: string, uuid: string }> } };


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
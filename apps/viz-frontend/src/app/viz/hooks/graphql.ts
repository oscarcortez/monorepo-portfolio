import { gql, DocumentNode } from '@apollo/client';

import type { UserHeroQuery, UserHeroQueryVariables } from 'src/app/graphql/generated/graphql-types';

export const USER_HERO_QUERY: DocumentNode = gql`
  query UserHero($userUuid: String!) {
    userHero(userUuid: $userUuid) {
      uuid
      email
      firstName
      lastName
      username
      picture
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

// Exportar los tipos para usar en componentes
export type { UserHeroQuery, UserHeroQueryVariables };

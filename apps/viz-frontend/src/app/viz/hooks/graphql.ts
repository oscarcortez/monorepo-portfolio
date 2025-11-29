import { gql } from '@apollo/client';

export const USER_HERO_QUERY = gql`
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

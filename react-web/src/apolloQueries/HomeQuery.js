import gql from "graphql-tag";

const HomeQuery = gql`
  {
    HighlightedPublications(limit: 12) {
      CurrentState {
        stateName
      }
      ImageGroup {
        image1
        image2
        image3
      }
      id
      brand
      group
      modelName
      price
      fuel
      year
      carState
      kms
      User {
        isAgency
        agencyName
        email
        name
        agencyEmail
      }
    }
  }
`;
const LastPublicationsQuery = gql`
  {
    LastPublications(limit: 4) {
      CurrentState {
        stateName
      }
      ImageGroup {
        image1
        image2
        image3
      }
      User {
        isAgency
        agencyName
      }
      id
      group
      modelName
      price
      fuel
      year
      carState
      kms
    }
  }
`;
export { HomeQuery, LastPublicationsQuery };

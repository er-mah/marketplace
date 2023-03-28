import gql from 'graphql-tag';

const searchPubMutation = gql`mutation searchPub($text: String!, $userType: String) {
  searchPublication(text:$text, userType: $userType){
    hasNextPage
    totalCount    
    Publications {
      CurrentState {
        stateName
        createdAt
      }
      ImageGroup {
        image1
      }
      User{
        name
        agencyName
      }
      codia
      id
      group
      brand
      modelName
      price
      fuel
      year
      carState
      kms
      name
      observation
    }
  }
}
    `;

export { searchPubMutation };

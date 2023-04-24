import gql from 'graphql-tag';

const SearchUserPublicationQuery = gql`
mutation searchPublication($user_id:Int, $userType:String, $carState: String, $state: String, $MAHtoken: String, $page: Int, $order: String)
  {searchPublication(user_id:$user_id, userType: $userType, carState: $carState, state: $state, MAHtoken:$MAHtoken, page:$page, order:$order) {
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

const markAsSoldMutation = gql`
mutation markAsSold($publication_id: Int, $MAHtoken:String){
  markAsSold(publication_id:,$publication_id, MAHtoken: $MAHtoken) {
    id
  }
}
`;
const highlightPublication = gql`
mutation highlightPublication($publication_id: Int, $MAHtoken:String){
  highlightPublication(publication_id:,$publication_id, MAHtoken: $MAHtoken) {
    id
  }
}
`;
export { SearchUserPublicationQuery, markAsSoldMutation, highlightPublication };

import gql from 'graphql-tag';

const SearchMutation = gql`
mutation searchPublication($brand:String, $modelName:String, $userType:String, $user_id:Int, $carState: String, $text: String, $page: Int $fuel: String, $year: Int, $state: String, $province:String,  $MAHtoken: String)
  {searchPublication(brand:$brand, modelName:$modelName, userType:$userType, user_id: $user_id, carState: $carState, text: $text, page: $page, fuel: $fuel, year: $year state: $state, province: $province, MAHtoken:$MAHtoken) {
    totalCount
    hasNextPage
    filters    
    Publications {
      CurrentState {
        stateName
      }
      ImageGroup {
        image1
        image2
        image3
      }
      id
      group
      modelName
      price
      fuel
      year
      carState
      kms
      User{
        isAgency
        agencyName
        email
        name
        agencyEmail
      }
    }
  }
}
    `;
export default SearchMutation;

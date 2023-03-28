import gql from 'graphql-tag';


const searchUserMutation = gql `mutation searchUser($text: String!, $userType: String) {
  searchUser(text:$text, userType: $userType){
    Users {
      id
		  name
      email
      address
      phone
      profileImage
      bannerImage
      agencyName
      agencyAdress
      agencyEmail
      agencyPhone
      isAgency
      isAdmin
      Suspendida
      Pendiente
      Destacada
      Publicada
		}
    totalCount
    hasNextPage
  }
}`;

export {searchUserMutation};
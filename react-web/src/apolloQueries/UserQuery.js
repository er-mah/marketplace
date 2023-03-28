import gql from 'graphql-tag';

const AllUsersQuery = gql`
query AllUsersResume($page: Int) {
  AllUsersResume(page: $page) {
    Users {
      id
      name
      email
      phone
      address
      agencyPhone
      agencyName
      agencyAdress
      agencyEmail
      Suspendida
      Pendiente
      Destacada
      Publicada
      isAgency
    }
    totalCount
    hasNextPage
  }
}`;
const AllUsersMailsQuery = gql`
query AllUsersMails {
  AllUsersMails {
    totalCount
    Users {
      id
      email
      isAdmin
    }
  }
}`;
const DeleteUserMutation = gql`
mutation deleteUser($MAHtoken: String! $userId: Int!){
  deleteUser(MAHtoken: $MAHtoken, userId:$userId)
}`;


export { AllUsersQuery, AllUsersMailsQuery, DeleteUserMutation };

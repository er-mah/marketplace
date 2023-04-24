import gql from 'graphql-tag';

const UserDetailQuery = gql`
query User($MAHtoken: String!) {
    User(MAHtoken: $MAHtoken) {
      name
      address
      email
      phone,
      Province{
        id
        name
      }
      Town{
        id
        name
      }
    }
  }  
`;
const UserDataMutation = gql`
mutation modifyUserData($MAHtoken: String!, $name:String, $address:String, $phone:String, $agencyName:String, $agencyAdress:String,$agencyEmail:String, $agencyPhone:String, $province_id:Int, $town_id:Int) {
  modifyUserData(MAHtoken: $MAHtoken, name:$name, address:$address, phone:$phone, agencyName:$agencyName, agencyAdress:$agencyAdress, agencyEmail:$agencyEmail, agencyPhone:$agencyPhone, province_id:$province_id, town_id:$town_id){
    name,
    address,
    email
    phone,
    agencyName,
    agencyAdress,
    agencyEmail,
    agencyPhone,
    province_id,
    town_id
  }
}
`;
const UserPasswordMutation = gql`
mutation updatePassword($MAHtoken: String!, $oldPassword: String!, $newPassword: String!){
  updatePassword(MAHtoken:$MAHtoken, oldPassword:$oldPassword, newPassword:$newPassword)
}`;
const ResetPasswordMutation = gql`
mutation resetPassword($oldPassword: String!, $newPassword: String!){
  resetPassword(oldPassword:$oldPassword, newPassword:$newPassword)
}`;
export { UserDetailQuery, UserDataMutation, UserPasswordMutation, ResetPasswordMutation };

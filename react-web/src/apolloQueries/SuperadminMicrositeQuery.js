import gql from 'graphql-tag';

const AdminUserDataMutation = gql`
mutation modifyUserData($userId: Int, $MAHtoken: String!, $name:String, $address:String, $phone:String, $agencyName:String, $agencyAdress:String,$agencyEmail:String, $agencyPhone:String, $province_id:Int, $town_id:Int) {
  modifyUserData(userId:$userId, MAHtoken: $MAHtoken, name:$name, address:$address, phone:$phone, agencyName:$agencyName, agencyAdress:$agencyAdress, agencyEmail:$agencyEmail, agencyPhone:$agencyPhone, province_id:$province_id, town_id:$town_id){
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
}`

export {AdminUserDataMutation}
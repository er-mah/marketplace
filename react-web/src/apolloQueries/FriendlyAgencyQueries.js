import gql from 'graphql-tag';

const GetAllAgencies = gql`
{GetAllAgencies {
    id
    phone
    agencyName
    agencyEmail
    agencyAdress
    agencyPhone
    bannerImage
    profileImage
  }}`;

const GetAgencyDetail = gql`
query GetAgencyDetail($id: Int!){
  GetAgencyDetail(id: $id){
    id
    phone
    agencyName
    agencyEmail
    agencyAdress
    agencyPhone
    bannerImage
    profileImage
  }
}
`;

export { GetAllAgencies, GetAgencyDetail };

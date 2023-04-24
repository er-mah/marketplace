import gql from 'graphql-tag';

const AgencyDetailQuery = gql`
query User($MAHtoken: String!, $id:Int) {
    User(MAHtoken: $MAHtoken, id: $id) {
      agencyName
      agencyAdress
      agencyEmail
      agencyPhone
      phone
      profileImage
      bannerImage
    }
  }  
`;

export { AgencyDetailQuery };


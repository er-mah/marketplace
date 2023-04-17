import gql from 'graphql-tag';

const CountUnreadMessagesQuery = gql`query UnreadMessages($MAHtoken: String!){
  CountUnreadMessages(MAHtoken:$MAHtoken)
}`;

const CountActivePublications = gql`
query CountActivePublications($MAHtoken: String){
  CountActivePublications(MAHtoken: $MAHtoken)
}
`;
const CountHighLighPublications = gql`
query CountHighLighPublications($MAHtoken: String){
  CountHighLighPublications(MAHtoken: $MAHtoken)
}
`;

export { CountUnreadMessagesQuery, CountActivePublications, CountHighLighPublications };


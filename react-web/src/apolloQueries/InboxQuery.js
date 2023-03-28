import gql from 'graphql-tag';

const CommentThreadQuery = gql`
query GetThreadForInbox($MAHtoken: String!, $id: Int!) {
    GetThreadForInbox(MAHtoken: $MAHtoken, id:$id) {
      id
      createdAt
      chatToken
      participant1_id
      participant2_id
      Publication{
        id
        brand
        modelName
        year
        kms
        carState
        price
        ImageGroup{
          image1
        }
      }
    }
  }
`;
const markThreadAsReaded = gql`
mutation markThreadAsReaded($commentThread_id: Int!) {
  markThreadAsReaded(commentThread_id: $commentThread_id)
}`;

export { CommentThreadQuery, markThreadAsReaded };


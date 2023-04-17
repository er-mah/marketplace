import gql from 'graphql-tag';

const AdminAllCommentThreads = gql`
query AdminCT($MAHtoken: String!) {
    AdminCommentThread(MAHtoken: $MAHtoken) {
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
      messages{
        createdAt
        content
        read
        User{
          email
        }
      }
    }
  }
`;

const DeleteCT = gql`
mutation DeleteCT($MAHtoken: String!, $commentThread_id: Int! ){
  deleteCommentThread(MAHtoken:$MAHtoken, commentThread_id:$commentThread_id)
}`;

export { AdminAllCommentThreads, DeleteCT };


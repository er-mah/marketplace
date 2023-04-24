import gql from 'graphql-tag';

const CommentThreadQuery = gql`
query CommentThread($MAHtokenP2: String!) {
    CommentThread(MAHtokenP2: $MAHtokenP2) {
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
const CountUnreadMessagesQuery = gql`
query CountUnreadMessages($MAHtoken: String!) {
    CountUnreadMessages(MAHtoken: $MAHtoken)
  }
  `;
const CommentThreadSubscription = gql`
  subscription threadAdded($MAHtoken: String!) {
    threadAdded(MAHtoken: $MAHtoken) {
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

export { CommentThreadQuery, CountUnreadMessagesQuery, CommentThreadSubscription };


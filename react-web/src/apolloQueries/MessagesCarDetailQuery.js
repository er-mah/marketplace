import gql from 'graphql-tag';

const MessageQuery = gql`
  query Messages($commentThread_id: Int) {
    Messages(commentThread_id: $commentThread_id) {
      id
      createdAt
      from_id
      content
      User {
        name
      }
    }
  }
`;
const MessageSubscription = gql`
  subscription messageAdded($commentThread_id: Int!) {
    messageAdded(commentThread_id: $commentThread_id) {
      id
      createdAt      
      from_id
      content
      User {
        name
      }
    }
  }
`;
const addMessageMutation = gql`
  mutation($commentThread_id: Int!, $from_id: Int, $content: String!, $read:String) {
    addMessage(
      commentThread_id: $commentThread_id
      from_id: $from_id
      content: $content
      read: $read,
    ) {
      id
    }
  }
`;

const createCommentThread = gql`
  mutation(
    $chatToken: String
    $publication_id: Int!
    $content: String!
    $participant1_id: Int
  ) {
    createCommentThread(
      chatToken: $chatToken
      publication_id: $publication_id
      content: $content
      participant1_id: $participant1_id
    ) {
      id
      chatToken
      participant1_id
      participant2_id
      publication_id
      messages {
        id
        from_id
        content
        User {
          name
        }
      }
    }
  }
`;
export { MessageQuery, MessageSubscription, addMessageMutation, createCommentThread };

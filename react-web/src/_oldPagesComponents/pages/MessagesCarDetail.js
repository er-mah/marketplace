import React, { Component } from 'react';
import { FormGroup, Input, Label, Button, Modal, ModalBody, ModalHeader } from 'reactstrap';
import { ChatFeed, Message } from 'react-chat-ui';
// Todo: adapt this
// import { graphql, compose } from 'react-apollo';
import jwtDecode from 'jwt-decode';
import { stringify, parse } from 'query-string';
// Todo: adapt this
// import jsonwt from 'jsonwebtoken';
import moment from 'moment';

import { getUserDataFromToken, isUserLogged } from '../../modules/sessionFunctions';
import {
  MessageQuery,
  MessageSubscription,
  addMessageMutation,
  createCommentThread,
} from '../../graphql/_old/MessagesCarDetailQuery';

/* eslint react/jsx-filename-extension: 0 */
/* eslint camelcase: 0 */
/* eslint react/prop-types: 0 */

const fillStateWithMessages = (messagesData, location, publicationUserId) => {
  // En caso de ser un mensaje de un usuario anónimo
  const anonymName = parse(location.search).chatToken
    ? jwtDecode(parse(location.search).chatToken).name
    : null;
  if (!messagesData.loading) {
    const messages = [];
    messagesData.Messages.map((message) => {
      messages.push(new Message({
        id: publicationUserId !== message.from_id ? 0 : message.from_id,
        message: message.content,
        senderName: message.User ? `${message.User.name}--${moment(message.createdAt).format('DD/MM/YYYY HH:mm')}` : `${anonymName}--${moment(message.createdAt).format('DD/MM/YYYY HH:mm')} `,

      }));
    });
    return messages;
  }
  return [
    new Message({
      id: 0,
      message: 'Cargando mensajes...',
    }),
  ];
};

class MessagesCarDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      content: '',
      modal: false,
    };
    this.toggle = this.toggle.bind(this);
  }
  componentWillMount() {
    this.props.subscribeToNewMessages({
      commentThread_id: this.props.commentThread_id,
    });
  }
  toggle() {
    this.setState({
      modal: !this.state.modal,
    });
  }
  isTextInputIncomplete() {
    if (this.state.content === '') {
      return true;
    }
    return false;
  }
  isModalIncomplete() {
    if (this.state.name === '' ||
      this.state.email === '') {
      return true;
    }
    return false;
  }
  sendMessage() {
    const { content } = this.state;
    if (!isUserLogged() && parse(this.props.location.search).chatToken === undefined) {
      this.toggle();
      return false;
    }
    if (this.props.commentThread_id) {
      this.props.mutate({
        variables: {
          commentThread_id: this.props.commentThread_id,
          from_id: getUserDataFromToken().id,
          content,
        },
      });
      this.setState({ content: '' });
      return true;
    }

    this.props.createCommentThread({
      variables: {
        publication_id: this.props.publicationId,
        content,
        participant1_id: getUserDataFromToken().id,
      },
    })
      .then(() => {
        window.location.reload();
      });
  }
  sendAnonMessage() {
    const { content } = this.state;
    if (this.props.commentThread_id) {
      this.props.mutate({
        variables: {
          commentThread_id: this.props.commentThread_id,
          from_id: getUserDataFromToken().id,
          content,
        },
      });
      return this.setState({ content: '' });
    }
    const chatToken = jsonwt.sign(
      {
        name: this.state.name,
        email: this.state.email,
      },
      'MAH2018!#',
    );
    this.props.createCommentThread({
      variables: {
        publication_id: this.props.publicationId,
        content,
        chatToken,
      },
    })
      .then(() => {
        this.toggle();
        const searchObj = {
          publication_id: parse(this.props.location.search).publication_id,
          chatToken,
        };
        this.props.history.push(`/carDetail?${stringify(searchObj)}`);
        window.location.reload();
      });
  }
  render() {
    const { messagesData, location, publicationUserId } = this.props;
    return (
      <span>
        <FormGroup>
          <h5>¿Consultas?</h5>
          <ChatFeed
            maxHeight={400}
            messages={fillStateWithMessages(
              messagesData,
              location,
              publicationUserId,
            )} // Boolean: list of message objects
            hasInputField={false} // Boolean: use our input, or use your own
            showSenderName // show the name of the user who sent the message
            bubblesCentered // Boolean should the bubbles be centered in the feed?
            bubbleStyles={{
              text: {
                fontSize: 30,
              },
              chatbubble: {
                borderRadius: 70,
                padding: 40,
              },
            }}
          />
          <Input
            disabled={this.props.disabled}
            value={this.state.content}
            onChange={e => this.setState({ content: e.target.value })}
            type="textarea"
            rows="5"
          />
        </FormGroup>
        <Button
          disabled={this.isTextInputIncomplete()}
          onClick={() => this.sendMessage()}
          color="secondary"
          className="btn btn-secondary btn-lg"
        >
          PREGUNTAR
        </Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Tus datos para ponerte en contacto</ModalHeader>
          <ModalBody>
            <div className="col-md-8 offset-md-2">
              <FormGroup>
                <Label for="exampleEmail">Nombre</Label>
                <Input value={this.state.name} onChange={e => this.setState({ name: e.target.value })} type="text" name="name" id="exampleEmail" />
              </FormGroup>
              <FormGroup>
                <Label for="exampleEmail">Email</Label>
                <Input value={this.state.email} onChange={e => this.setState({ email: e.target.value })} type="email" name="name" id="exampleEmail" />
              </FormGroup>
              <FormGroup>
                <Button color="primary" disabled={this.isModalIncomplete()} onClick={() => { this.sendAnonMessage(); }}>Enviar Consulta</Button>
              </FormGroup>
            </div>
          </ModalBody>
        </Modal>
      </span>
    );
  }
}
const options = ({ commentThread_id }) => ({
  variables: {
    commentThread_id,
  },
});
const withMessages = graphql(MessageQuery, {
  name: 'messagesData',
  options,
});
const withMessagesSubscription = graphql(MessageQuery, {
  name: 'messagesSubscriptions',
  options,
  props: props => ({
    subscribeToNewMessages: params =>
      props.messagesSubscriptions.subscribeToMore({
        document: MessageSubscription,
        variables: {
          commentThread_id: params.commentThread_id,
        },
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) {
            return prev;
          }
          const newFeedItem = subscriptionData.data.messageAdded;
          return Object.assign({}, prev, {
            Messages: [...prev.Messages, newFeedItem],
          });
        },
      }),
  }),
});
const withMessageMutation = graphql(addMessageMutation);
const withCommentThreadMutation = graphql(createCommentThread, {
  name: 'createCommentThread',
});
const withData = compose(
  withMessages,
  withMessagesSubscription,
  withMessageMutation,
  withCommentThreadMutation,
);
const MessagesCarWithData = withData(MessagesCarDetail);

export default MessagesCarWithData;

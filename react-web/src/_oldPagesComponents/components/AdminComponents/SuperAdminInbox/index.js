/* eslint react/jsx-filename-extension: 0 */
/* eslint react/prop-types: 0 */
/* eslint class-methods-use-this: 0 */

import React, { Component } from 'react';
import {
  Col,
  Row,
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
} from 'reactstrap';
import { parse } from 'query-string';
// Todo: adapt this
// import { graphql, compose } from 'react-apollo';
import { ChatFeed, Message } from 'react-chat-ui';
import jwtDecode from 'jwt-decode';
import moment from 'moment';
import { animateScroll as scroll } from 'react-scroll';

import AdminBar from '../../../pages/old/AdminBar';
import NotificationModal from '../../../pages/old/NotificationModal';

import {
  CommentThreadQuery,
  markThreadAsReaded,
} from '../../../graphql/old/InboxQuery';
import {
  MessageQuery,
  MessageSubscription,
  addMessageMutation,
} from '../../../graphql/old/MessagesCarDetailQuery';

import {
  getUserToken,
  getUserDataFromToken,
  isAdminLogged,
} from '../../../modules/sessionFunctions';
import { DeleteCT } from '../../../graphql/old/SuperAdminAllMessages';
import { thousands } from '../../../modules/functions';

class SuperAdminInbox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deleteModal: false,
      notiTitle: '',
      notiMessage: '',
      showNotiModal: false,
    };
    this.toggleDeleteModal = this.toggleDeleteModal.bind(this);
    this.deleteMessage = this.deleteMessage.bind(this);
  }
  componentWillMount() {
    scroll.scrollToTop({ duration: 300 });
    if (!isAdminLogged()) {
      this.props.history.push('/loginAdmin');
    }
    this.props.subscribeToNewMessages({
      commentThread_id: parse(this.props.location.search).ct_id,
    });
  }
  fillStateWithMessages(ThreadsQuery, messagesData, publicationUserId) {
    // En caso de ser un mensaje de un usuario anónimo
    if (!ThreadsQuery.loading) {
      const anonymName = ThreadsQuery.GetThreadForInbox.chatToken
        ? jwtDecode(ThreadsQuery.GetThreadForInbox.chatToken).email
        : null;
      const messages = [];
      messagesData.Messages.map((message) => {
        messages.push(new Message({
          id: publicationUserId === message.from_id ? 0 : message.from_id,
          message: message.content,
          senderName: message.User
            ? `${message.User.name}--${moment(message.createdAt).format('DD/MM/YYYY HH:mm')}`
            : `${anonymName}--${moment(message.createdAt).format('DD/MM/YYYY HH:mm')} `,
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
  }
  toggleDeleteModal() {
    this.setState({ deleteModal: !this.state.deleteModal });
  }
  deleteMessage(commentThread_id) {
    this.props
      .deleteCT({
        variables: {
          commentThread_id,
          MAHtoken: getUserToken(),
        },
        refetchQueries: ['AdminCT'],
      })
      .then(({ data: { deleteCommentThread } }) => {
        this.setState({
          deleteModal: false,
        });
        this.props.history.push(`/superAdminAllMessages?rsl=scs&msg=${deleteCommentThread}`);
      })
      .catch(({ graphQLErrors, networkError }) => {
        if (graphQLErrors) {
          graphQLErrors.map(({ message }) =>
            this.setState({
              deleteModal: false,
              notiTitle: 'Error',
              notiMessage: message,
              showNotiModal: true,
            }));
        }
        if (networkError) {
          this.setState({
            deleteModal: false,
            notiTitle: 'Error',
            notiMessage: networkError,
            showNotiModal: true,
          });
        }
      });
  }
  render() {
    const ctId = parse(this.props.location.search).ct_id;
    const { ThreadsQuery, messagesData, history } = this.props;
    const publicationUserId = getUserDataFromToken().id;
    return (
      <div>
        <AdminBar history={this.props.history} />
        <div className="container-fluid mt-4">
          <Button color="link" onClick={() => history.goBack()}>
            {'< Volver a Bandeja de Entrada'}
          </Button>
          <Row className="mt-4">
            <Col md="6">
              {ThreadsQuery.loading || messagesData.loading ? (
                <img
                  className="loading-gif"
                  style={{ height: '250px' }}
                  src="/assets/utils/loading.gif"
                  key={0}
                  alt="Loading..."
                />
              ) : (
                <div className="row">
                  <Col md="6">
                    <img
                      width="100%"
                      height="100%"
                      src={`${process.env.REACT_APP_API}/images/${
                        ThreadsQuery.GetThreadForInbox.Publication.ImageGroup
                          .image1
                      }`}
                      alt="banner"
                    />
                  </Col>
                  <Col md="6" className="d-flex flex-column">
                    <h6>
                      <b>
                        {ThreadsQuery.GetThreadForInbox.Publication.brand}
                        {ThreadsQuery.GetThreadForInbox.Publication.group}
                      </b>
                    </h6>
                    <h6>
                      {ThreadsQuery.GetThreadForInbox.Publication.modelName}
                    </h6>
                    <h5>
                      <b>
                        {ThreadsQuery.GetThreadForInbox.Publication.price
                          ? `$
                    ${thousands(
                      ThreadsQuery.GetThreadForInbox.Publication.price,
                      2,
                      ',',
                      '.',
                    )}`
                          : 'Consultar'}
                      </b>
                    </h5>
                    <h6>
                      {ThreadsQuery.GetThreadForInbox.Publication.year} -{' '}
                      {thousands(
                        ThreadsQuery.GetThreadForInbox.Publication.kms,
                        0,
                        ',',
                        '.',
                      )}
                    </h6>
                  </Col>
                </div>
              )}
            </Col>
            <Col md="6">
              <ChatFeed
                maxHeight={500}
                messages={this.fillStateWithMessages(
                  ThreadsQuery,
                  messagesData,
                  publicationUserId,
                )} // Boolean: list of message objects
                hasInputField={false} // Boolean: use our input, or use your own
                showSenderName // show the name of the user who sent the message
                bubblesCentered // Boolean should the bubbles be centered in the feed?
              />
              <div className="underline" />
              <Button
                color="primary"
                className="float-right"
                onClick={() => this.toggleDeleteModal()}
              >
                Eliminar Conversación
              </Button>
            </Col>
          </Row>
        </div>
        <Modal isOpen={this.state.deleteModal} toggle={this.toggleDeleteModal}>
          <ModalHeader toggle={this.toggleDeleteModal}>Confirme</ModalHeader>
          <ModalBody>
            <div className="col-md-9 offset-md-2">
              <p>¿Desea eliminar este mensaje?</p>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={() => this.deleteMessage(ctId)}>
              OK
            </Button>
            <Button color="secondary" onClick={() => this.toggleDeleteModal()}>
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>
        <NotificationModal
          primaryText={this.state.notiTitle}
          secondaryText={this.state.notiMessage}
          buttonName="Aceptar"
          showNotificationModal={this.state.showNotiModal}
          handleClose={() => this.setState({ showNotiModal: false })}
        />
      </div>
    );
  }
}

const options = ({ location }) => ({
  variables: {
    MAHtoken: getUserToken(),
    id: parseInt(parse(location.search).ct_id,10),
    commentThread_id: parse(location.search).ct_id, // requerida por MessageQuery
  },
});
const withThreadData = graphql(CommentThreadQuery, {
  name: 'ThreadsQuery',
  options,
});
const withMessages = graphql(MessageQuery, {
  name: 'messagesData',
  options,
});
const withMessageMutation = graphql(addMessageMutation);
const withMarkThreadAsReadedMutation = graphql(markThreadAsReaded, {
  name: 'markAsRead',
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
const withDeleteCTMutation = graphql(DeleteCT, { name: 'deleteCT' });

const withData = compose(
  withThreadData,
  withMessages,
  withMarkThreadAsReadedMutation,
  withMessagesSubscription,
  withMessageMutation,
  withDeleteCTMutation,
);

export default withData(SuperAdminInbox);

import React, { Component } from 'react';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
// Todo: adapt this
// import { graphql, compose } from 'react-apollo';
import moment from 'moment';
import _ from 'lodash';
import { thousands } from '../../modules/functions';
import NotificationModal from './NotificationModal';
import { DeleteCT } from '../../graphql/_old/SuperAdminAllMessages';
import { getUserToken } from '../../modules/sessionFunctions';
/* eslint react/jsx-filename-extension: 0 */

class CardMessagge extends Component {
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
  toggleDeleteModal() {
    this.setState({ deleteModal: !this.state.deleteModal });
  }
  deleteMessage(commentThread_id) {
    this.props.deleteCT({
      variables: {
        commentThread_id,
        MAHtoken: getUserToken(),
      },
      refetchQueries: ['AdminCT'],
    })
      .then(({ data: { deleteCommentThread } }) => {
        this.setState({
          deleteModal: false,
          notiTitle: 'Hecho',
          notiMessage: deleteCommentThread,
          showNotiModal: true,
        });
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
    const {
      admin, data, history, data: { Publication }, data: { Publication: { ImageGroup }, messages },
    } = this.props;
    let unreadMessages = false;
    messages.map((msg) => {
      if (!msg.read) {
        unreadMessages = true;
      }
    });
    return (
      <div className="list-message">
        <div className="row">
          <div className="col-3">
            <img className="loading-gif" src={`${process.env.REACT_APP_API}/images/${ImageGroup.image1}`} style={{ width: '100%' }}alt="banner" />
          </div>
          <div className="col-9">
            <div className="item-data">
              <img className="float-right" src={unreadMessages ? '/assets/images/icon-envelop-red.svg' : '/assets/images/icon-envelop2-red.svg'} alt="" />
              <p>{moment(_.last(messages).createdAt).format('DD/MM/YYYY hh:mm')}</p>

              <h5><b>{Publication.brand} {Publication.modelName}</b></h5>
              <p className="item-description" ><small>{Publication.year}  -  {thousands(Publication.kms, 0, ',', '.')}km  - {Publication.price ? `$${thousands(Publication.price, 2, ',', '.')}` : 'Consultar'}</small></p>
              <p>Ultimo mensaje: {_.truncate((_.last(messages).content), { length: 40 })}</p>
            </div>
            <div className="item-admin">
              <Button onClick={() => this.toggleDeleteModal()} className="btn-default btn-link-primary float-right">Eliminar</Button>
              <Button
                onClick={admin ? () => history.push(`/superAdminInbox?ct_id=${data.id}`) : () => history.push(`/inbox?ct_id=${data.id}`)}
                className="btn-default btn-link-primary float-right"
              >
                {admin ? 'Ver' : 'Responder'}
              </Button>
            </div>
          </div>
          <Modal isOpen={this.state.deleteModal} toggle={this.toggleDeleteModal}>
            <ModalHeader toggle={this.toggleDeleteModal}>Confirme</ModalHeader>
            <ModalBody>
              <div className="col-md-9 offset-md-2">
                <p>¿Desea eliminar este mensaje?</p>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={() => this.deleteMessage(data.id)}>OK</Button>
              <Button color="secondary" onClick={() => this.toggleDeleteModal()}>Cancelar</Button>
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
      </div>
    );
  }
}

const withDeleteCTMutation = graphql(DeleteCT, { name: 'deleteCT' });
const withData = compose(withDeleteCTMutation);
export default withData(CardMessagge);

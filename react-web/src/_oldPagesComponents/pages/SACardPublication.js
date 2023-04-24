import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { stringify } from 'query-string';
// Todo: adapt this
// import { graphql, compose } from 'react-apollo';
import moment from 'moment';
import ProgressiveImage from 'react-progressive-image';
import photoGaleryParser from '../../modules/photoGaleryParser';

import { AprovePublicationMutation, DisaprovePublicationMutation, HightlightPublication, UnHightlightPublication, changeStateMutation } from '../../graphql/_old/admin/AdminPublicationQueries';
import { getUserToken } from '../../modules/sessionFunctions';

/* eslint react/jsx-filename-extension: 0 */
const isPubVisible = (stateName) => {
  if (stateName === 'Publicada' || stateName === 'Destacada' || stateName === 'Vendida' || stateName === 'Apto para garantía') {
    return true;
  }
  return false;
};

const isPubEditable = (stateName) => {
  if (stateName === 'Publicada' || stateName === 'Destacada' || stateName === 'Apto para garantía') {
    return true;
  }
  return false;
};

class SACardPublication extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      modalMsg: '',
      modalTitle: '',
      questionModal: false,
      deleteModal: false,
      questionModalTitle: '',
      questionModalText: '',
      verb: '',
      reason: '',
    };
    this.toggle = this.toggle.bind(this);
    this.toggleQuestionModal = this.toggleQuestionModal.bind(this);
    this.toggleDeleteModal = this.toggleDeleteModal.bind(this);
    this.pubStateClass = this.pubStateClass.bind(this);
    this.highlightPublication = this.highlightPublication.bind(this);
    this.changePublicationState = this.changePublicationState.bind(this);
    this.handleRedirect = this.handleRedirect.bind(this);
    this.deletePub = this.deletePub.bind(this);
  }
  aprove() {
    this.props.aprove({
      variables: {
        publication_id: this.props.data.id,
        MAHtoken: getUserToken(),
      },
    })
      .then(({ data: { aprovePublication: { CurrentState: { stateName } } } }) => {
        this.setState({
          modal: true,
          questionModal: false,
          modalTitle: 'Listo',
          modalMsg: `La publicación ha cambiado exitosamente a estado ${stateName}.`,
        });
      })
      .catch(({ graphQLErrors, networkError }) => {
        if (graphQLErrors) {
          graphQLErrors.map(({ message }) =>
            this.setState({
              modal: true,
              questionModal: false,
              modalTitle: 'Error',
              modalMsg: message,
            }));
        }
        if (networkError) {
          this.setState({
            modal: true,
            questionModal: false,
            modalTitle: 'Error',
            modalMsg: networkError,
          });
        }
      });
  }
  disaprove() {
    this.props.disaprove({
      variables: {
        publication_id: this.props.data.id,
        MAHtoken: getUserToken(),
        reason: this.state.reason,
      },
    })
      .then(({ data: { disaprovePublication: { CurrentState: { stateName } } } }) => {
        this.setState({
          modal: true,
          questionModal: false,
          modalTitle: 'Hecho',
          modalMsg: `La publicación ha cambiado exitosamente a estado ${stateName}.`,
        });
      })
      .catch(({ graphQLErrors, networkError }) => {
        if (graphQLErrors) {
          graphQLErrors.map(({ message }) =>
            this.setState({
              modal: true,
              questionModal: false,
              modalTitle: 'Error',
              modalMsg: message,
            }));
        }
        if (networkError) {
          this.setState({
            modal: true,
            questionModal: false,
            modalTitle: 'Error',
            modalMsg: networkError,
          });
        }
      });
  }
  pubStateClass(stateName) {
    switch (stateName) {
      case 'Publicada':
        return 'published';
      case 'Vendida':
        return 'sold';
      case 'Eliminada':
        return 'sold';
      case 'Destacada':
        return 'highlighted';
      case 'Pendiente':
        return 'pending';
      default:
        return '';
    }
  }
  toggle() {
    this.setState({
      modal: !this.state.modal,
    });
  }
  toggleQuestionModal(verb, pubId) {
    this.setState({
      questionModal: !this.state.questionModal,
      questionModalText: `¿Esta seguro que desea ${verb} esta publicación?`,
      verb,
      pubId,
    });
  }
  toggleDeleteModal() {
    this.setState({
      deleteModal: !this.state.deleteModal,
    });
  }
  showPublicatorName(data) {
    if (data.User) {
      return data.User.agencyName === null ? data.User.name : data.User.agencyName;
    }
    return data.name;
  }
  highlightPublication(id, revertHighlight) {
    revertHighlight ?
      this.props.unhightlight({
        variables: {
          publication_id: id,
          MAHtoken: getUserToken(),
        },
      })
        .then(({ data: { adminUnHighlightPublication: { CurrentState: { stateName } } } }) => {
          this.setState({
            modal: true,
            questionModal: false,
            modalTitle: 'Listo',
            modalMsg: `La publicación ha cambiado exitosamente a estado ${stateName}.`,
          });
        })
        .catch(({ graphQLErrors, networkError }) => {
          if (graphQLErrors) {
            graphQLErrors.map(({ message }) =>
              this.setState({
                modal: true,
                questionModal: false,
                modalTitle: 'Error',
                modalMsg: message,
              }));
          }
          if (networkError) {
            this.setState({
              modal: true,
              questionModal: false,
              modalTitle: 'Error',
              modalMsg: networkError,
            });
          }
        })
      :
      this.props.hightlight({
        variables: {
          publication_id: id,
          MAHtoken: getUserToken(),
        },
      })
        .then(({ data: { adminhighlightPublication: { CurrentState: { stateName } } } }) => {
          this.setState({
            modal: true,
            questionModal: false,
            modalTitle: 'Listo',
            modalMsg: `La publicación ha cambiado exitosamente a estado ${stateName}.`,
          });
        })
        .catch(({ graphQLErrors, networkError }) => {
          if (graphQLErrors) {
            graphQLErrors.map(({ message }) =>
              this.setState({
                modal: true,
                questionModal: false,
                modalTitle: 'Error',
                modalMsg: message,
              }));
          }
          if (networkError) {
            this.setState({
              modal: true,
              questionModal: false,
              modalTitle: 'Error',
              modalMsg: networkError,
            });
          }
        });
  }
  toggleModalState(pubId) {
    this.setState({
      modalState: !this.state.modalState,
      pubId,
    });
  }
  changePublicationState(stateName) {
    this.props
      .changeStateTo({
        variables: {
          MAHtoken: getUserToken(),
          publication_id: this.state.pubId,
          stateName,
        },
      })
      .then((data) => {
        this.setState({
          questionModal: false,
          deleteModal: false,
        });
        this.setState({
          modalTitle: 'Listo.',
          modalMsg: 'Cambios aplicados.',
          modal: true,
        });
      })
      .catch((error, { graphQLErrors, networkError }) => {
        console.log(error);
        if (graphQLErrors) {
          this.setState({
            questionModal: false,
            deleteModal: false,
          });
          graphQLErrors.map(({ message }) =>
            this.setState({
              modalTitle: 'Error',
              modalMsg: message,
              modal: true,
            }));
        }
        if (networkError) {
          this.setState({
            modalTitle: 'Error',
            modalMsg: networkError,
            modal: true,
          });
        }
      });
  }
  deletePub(pubId) {
    this.setState({
      pubId,
    });
    this.toggleDeleteModal();
  }
  handleRedirect() {
    const { data } = this.props;
    const dataCar = {
      brand: data.brand,
      carState: data.carState,
      codia: data.codia,
      group: data.group,
      kms: data.kms,
      modelName: data.modelName,
      observation: data.observation,
      price: data.price || 'Consultar',
      year: data.year,
      publication_id: data.id,
    };
    this.props.history.push(`/createPublication?${(stringify(dataCar))}`);
  }

  render() {
    const { data, history, data: { CurrentState: { stateName } } } = this.props;
    return (
      <div className="box-item" >
        <div className="row item-car wide" >
          <div className="col-4">
            <div className="row">
              <ProgressiveImage
                src={photoGaleryParser(data.ImageGroup)[0].src}
              >
                {src => (<img
                  src={src}
                  alt="banner"
                  width="100%"
                  height="100%"
                />)}
              </ProgressiveImage>

            </div>
          </div>
          <div className="col-8 d-flex flex-column justify-content-between">
            <div className="item-data" >
              <p className={`item-state badge badge-secondary ${this.pubStateClass(stateName)}`}>{stateName}</p>
              <p className="item-name"><strong>{this.showPublicatorName(data)}</strong></p>
              <p className="item-description">{data.brand} {data.group}</p>
              <small>{data.modelName}</small>
            </div>
            <div className="d-flex flex-column align-items-end item-visibility" >
              <h6>
                {!isPubVisible(stateName)
                  ? 'Publicación no visible'
                  : `Visible hasta ${moment(data.CurrentState.createdAt).add(60, 'days').format('DD/MM/YYYY')}`
                }
              </h6>
            </div>
          </div>
          <div className="col-12 d-flex flex-column justify-content-around">
            <div className="item-admin" >
              {(stateName !== 'Vendida' && stateName !== 'Pendiente') && <Button className="btn-default btn-link-primary float-left btn-admin" onClick={() => this.toggleModalState(data.id)}>Marcar como Vendido</Button>}
              <Button className="btn-default btn-link-primary float-right btn-admin" onClick={() => this.deletePub(data.id)}>Eliminar</Button>
              {isPubEditable(stateName) && <Button className="btn-default btn-link-primary float-right btn-admin" onClick={this.handleRedirect}>Editar</Button>}
              {isPubVisible(stateName) && stateName !== 'Destacada' && stateName !== 'Vendida' && <Button className="btn-default btn-link-primary float-right btn-admin" onClick={() => this.highlightPublication(data.id)} >Destacar</Button>}
              <Button className="btn-default btn-link-primary float-right btn-admin" onClick={() => history.push(`/carDetail?publication_id=${data.id}&t=${getUserToken()}`)} >Ver</Button>
              {/* {stateName === 'Vencida' && <Button className="btn-default btn-link-primary float-right btn-admin" onClick={() => {}} >Editar Vigencia</Button>} */}
              {stateName === 'Pendiente' && <Button className="btn-default btn-link-primary float-right btn-admin" onClick={() => { this.toggleQuestionModal('desaprobar'); }} >Desaprobar</Button>}
              {stateName === 'Pendiente' && <Button className="btn-default btn-link-primary float-right btn-admin" onClick={() => { this.toggleQuestionModal('aprobar'); }} >Aprobar</Button>}
              {stateName === 'Destacada' && <Button className="btn-default btn-link-primary float-right btn-admin" onClick={() => { this.highlightPublication(data.id, true); }} >Dejar de Destacar</Button>}
              {stateName === 'Vencida' && <Button className="btn-default btn-link-primary float-right btn-admin" onClick={() => { this.toggleQuestionModal('volver a publicar', data.id); }} >Volver a publicar</Button>}

              <div className="clearfix" />
            </div>
          </div>
        </div>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>{this.state.modalTitle}</ModalHeader>
          <ModalBody>
            <div className="col-md-6 offset-md-3">
              {this.state.modalMsg}
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={() => { this.toggle(); window.location.reload(); }}>OK</Button>
          </ModalFooter>
        </Modal>

        <Modal
          isOpen={this.state.modalState}
          toggle={this.toggleModalState}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggleModalState}>Confirme</ModalHeader>
          <ModalBody>
            <div className="col-md-6 offset-md-3">
              ¿Pudiste vender este vehículo?
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={() => this.changePublicationState('Vendida')}>
              OK
            </Button>
            <Button color="secondary" onClick={() => this.toggleModalState()}>
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>

        <Modal isOpen={this.state.questionModal} toggle={this.toggleQuestionModal}>
          <ModalHeader toggle={this.toggleQuestionModal}>{this.state.questionModalTitle}</ModalHeader>
          <ModalBody>
            <div className="col-md-6 offset-md-3">
              <h5>{this.state.questionModalText}</h5>
              {this.state.verb === 'desaprobar' &&
              <div>
                <p> Ingrese el motivo </p><small>Se enviará junto al email</small>
                <input type="textarea" onChange={(e) => { this.setState({ reason: e.target.value }); }} value={this.state.reason} style={{ width: '250px', height: '70px' }} />
              </div>

            }
            </div>
          </ModalBody>
          <ModalFooter>
            {this.state.verb !== 'volver a publicar' && <Button color="primary" disabled={this.state.verb === 'desaprobar' && this.state.reason === ''} onClick={() => (this.state.verb === 'aprobar' ? this.aprove() : this.disaprove())}>Ok</Button>}
            {this.state.verb === 'volver a publicar' && <Button color="primary" onClick={() => this.changePublicationState('Publicada')}>Ok</Button>}
            <Button color="secondary" onClick={() => this.toggleQuestionModal()}>Cancelar</Button>
          </ModalFooter>
        </Modal>

        <Modal isOpen={this.state.deleteModal} toggle={this.toggleDeleteModal}>
          <ModalHeader toggle={this.toggleDeleteModal}>¿Eliminar Publicación?</ModalHeader>
          <ModalBody>
            <div className="col-md-6 offset-md-3">
              <h5>¿Esta seguro que desea eliminar esta publicación?</h5>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={() => this.changePublicationState('Eliminada')}>Ok</Button>
            <Button color="secondary" onClick={() => this.toggleDeleteModal()}>Cancelar</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}
const withMarkPublicationAsSold = graphql(changeStateMutation, { name: 'changeStateTo' });
const withAproveMutation = graphql(AprovePublicationMutation, { name: 'aprove' });
const withDisaproveMutation = graphql(DisaprovePublicationMutation, { name: 'disaprove' });
const withHightlightPublications = graphql(HightlightPublication, { name: 'hightlight' });
const withunHightlightPublications = graphql(UnHightlightPublication, { name: 'unhightlight' });
const withData = compose(withAproveMutation, withDisaproveMutation, withHightlightPublications, withMarkPublicationAsSold, withunHightlightPublications);
export default withData(SACardPublication);

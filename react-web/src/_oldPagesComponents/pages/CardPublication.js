import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
// Todo: adapt this
// import { graphql, compose } from 'react-apollo';
import { stringify } from 'query-string';
import moment from 'moment';
import ProgressiveImage from 'react-progressive-image';

import photoGaleryParser from '../../modules/photoGaleryParser';
import { thousands } from '../../modules/functions';
import { getUserToken } from '../../modules/sessionFunctions';
import {
  markAsSoldMutation,
  highlightPublication,
} from '../../graphql/old/UserPublicationsQuery';

/* eslint react/jsx-filename-extension:0 */
/* eslint class-methods-use-this: 0 */
class CardPublication extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalState: false,
      modalTitle: '',
      modalMessage: '',
      pubId: '',
      modal: false,
    };
    this.toggle = this.toggle.bind(this);
    this.toggleModalState = this.toggleModalState.bind(this);
    this.changeToSoldState = this.changeToSoldState.bind(this);
    this.handleRedirect = this.handleRedirect.bind(this);
  }
  isPubVisible(stateName) {
    if (
      stateName === 'Publicada' ||
      stateName === 'Destacada' ||
      stateName === 'Vendida' ||
      stateName === 'Apto para garantía'
    ) {
      return true;
    }
    return false;
  }
  pubStateClass(stateName) {
    switch (stateName) {
      case 'Publicada':
        return 'published';
      case 'Vendida':
        return 'sold';
      case 'Destacada':
        return 'highlighted';
      case 'Pendiente':
        return 'pending';
      case 'Eliminada':
        return 'deleted';
      default:
        return '';
    }
  }
  isPubEditable(stateName) {
    if (
      stateName === 'Publicada' ||
      stateName === 'Pendiente' ||
      stateName === 'Destacada' ||
      stateName === 'Apto para garantía' ||
      stateName === 'Suspendida'
    ) {
      return true;
    }
    return false;
  }
  toggle() {
    this.setState({
      modal: !this.state.modal,
    });
  }
  toggleModalState(pubId) {
    this.setState({
      modalState: !this.state.modalState,
      pubId,
    });
  }
  changeToSoldState() {
    this.props
      .ChangeToSold({
        variables: {
          MAHtoken: getUserToken(),
          publication_id: this.state.pubId,
        },
        /*       update: (proxy, { data: { markAsSold } }) => {
        proxy.readQuery({
          query: SearchUserPublicationQuery,
          variables: {
            MAHtoken: getUserToken(),
            state: qs.parse(this.props.location.search).stateName,
            carState: qs.parse(this.props.location.search).carState,

          },
        });
      }, */
      })
      .then((data) => {
        this.toggleModalState('');
        this.setState({
          modalTitle: 'Felicitaciones.',
          modalMessage:
            'La publicación ha sida marcada como vendida. Felicitaciones!',
          modal: true,
        });
      })
      .catch(({ graphQLErrors, networkError }) => {
        if (graphQLErrors) {
          this.toggleModalState('');
          graphQLErrors.map(({ message }) =>
            this.setState({
              modalTitle: 'Error',
              modalMessage: message,
              modal: true,
            }));
        }
        if (networkError) {
          this.setState({
            modalTitle: 'Error',
            modalMessage: networkError,
            modal: true,
          });
        }
      });
  }

  changeToHighlightState() {
    this.props
      .HighLightPub({
        variables: {
          MAHtoken: getUserToken(),
          publication_id: this.state.pubId,
        },
      })
      .then((data) => {
        this.toggleModalState('');
        this.setState({
          modalTitle: 'Felicitaciones.',
          modalMessage: 'La publicación ha sida marcada como destacada.',
          modal: true,
        });
      })
      .catch(({ graphQLErrors, networkError }) => {
        if (graphQLErrors) {
          this.toggleModalState('');
          graphQLErrors.map(({ message }) =>
            this.setState({
              modalTitle: 'Error',
              modalMessage: message,
              modal: true,
            }));
        }
        if (networkError) {
          this.setState({
            modalTitle: 'Error',
            modalMessage: networkError,
            modal: true,
          });
        }
      });
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
      price: data.price || '',
      year: data.year,
      publication_id: data.id,
    };
    this.props.history.push(`/createPublication?${(stringify(dataCar))}`);
  }
  render() {
    const {
      onHighlight,
      data,
      data: { CurrentState: { stateName } },
    } = this.props;
    return (
      <div className="box-item">
        <div className="item-car wide">
          <div className="row">
            <div className="col-12 col-lg-4 col-md-4 col-sm-4">
              <div className="row">
                <ProgressiveImage src={photoGaleryParser(data.ImageGroup)[0].src}>
                  {src => (<img
                    src={src}
                    alt="banner"
                    width="100%"
                    height="100%"
                    style={{ marginLeft: '15px', paddingRight: '15px' }}
                  />)}
                </ProgressiveImage>
              </div>
            </div>
            <div className="col-12 col-lg-8 col-md-8 col-sm-8">
              <div className="item-data">
                <p
                  className={`item-state item-state-user badge badge-secondary ${this.pubStateClass(stateName)}`}
                >
                  {stateName}
                </p>
                <p className="item-name">
                  <strong>
                    {data.brand} {data.group}
                  </strong>
                </p>
                <small>{data.modelName}</small>
                <p className="item-price">
                  <strong>{data.price ? `$${thousands(data.price, 0, ',', '.')}` : 'Consultar'}</strong>
                </p>
                <small>
                  {data.year} - {`${thousands(this.props.data.kms, 0, ',', '.') ? ` - ${thousands(this.props.data.kms, 0, ',', '.')} kms.` : ''}`}
                </small>
              </div>
              <div className="d-flex flex-column align-items-end item-visibility">
                <h6>
                  {!this.isPubVisible(stateName)
                    ? 'Publicación no visible'
                    : `Visible hasta ${moment(data.CurrentState.createdAt).add(60, 'days').format('DD/MM/YYYY')}`
                  }
                </h6>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-12">
              <div className="item-admin">
                {
                    stateName !== 'Vendida' &&
                    stateName !== 'Pendiente' &&
                    stateName !== 'Suspendida' && (
                    <Button
                      onClick={() => {
                          this.toggleModalState(data.id);
                        }}
                      className="btn-default btn-link-primary float-left"
                    >
                        Marcar como Vendido
                    </Button>)}
                {this.isPubEditable(stateName) && (
                <Button
                  className="btn-default btn-link-primary float-right"
                  onClick={this.handleRedirect}
                >
                  <img src="/assets/utils/icon-edit-red.svg" alt="E" /> Editar

                </Button>
                  )}
                {this.isPubVisible(stateName) &&
                    stateName !== 'Destacada' &&
                    stateName !== 'Vendida' && (
                      <Button
                        className="btn-default btn-link-primary float-right"
                        onClick={() => onHighlight()}
                      >
                        <img src="/assets/utils/icon-star-red.svg" alt="D" />{' '}
                        Destacar
                      </Button>
                    )}
                <div className="clearfix" />
              </div>
            </div>
          </div>
        </div>
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
            <Button color="primary" onClick={() => this.changeToSoldState()}>
              OK
            </Button>
            <Button color="secondary" onClick={() => this.toggleModalState()}>
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggle}>
            {this.state.modalTitle}
          </ModalHeader>
          <ModalBody>
            <div className="col-md-6 offset-md-3">
              {this.state.modalMessage}
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={() => this.toggle()}>
              OK
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}
const withMarkPublicationAsSold = graphql(markAsSoldMutation, {
  name: 'ChangeToSold',
});
const withHighlightPublication = graphql(highlightPublication, {
  name: 'HighlightPub',
});
const withData = compose(withMarkPublicationAsSold, withHighlightPublication);

export default withData(CardPublication);

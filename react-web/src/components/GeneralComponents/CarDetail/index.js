/* eslint react/jsx-filename-extension: 0 */
/* eslint react/prop-types: 0 */

import React, { Component } from 'react';
import { Col, Row, Button, Modal, ModalHeader, ModalBody, Badge } from 'reactstrap';
import { graphql, compose } from 'react-apollo';
import { branch, renderComponent } from 'recompose';
import { stringify, parse } from 'query-string';
import _ from 'lodash';
import decode from 'jwt-decode';
import { Helmet } from 'react-helmet';
import ReactGA from 'react-ga';
import { hotjar } from 'react-hotjar';

import {
  CarDetailQuery,
  CarSpecs,
  CommentThreadQuery,
} from '../../../apolloQueries/CarDetailQuery';

import TopTopNav from '../../../stories/TopTopNav';
import Header from '../../../stories/Header';
import Footer from '../../../stories/Footer';
import Card123Seguros from '../../../stories/Card123Seguros';
import BreadCrum from '../../../stories/BreadCrum';
import PublicityBanner from '../../../stories/PublicityBanner';
import CarCarousel from '../../../stories/CarCarousel';
import CarSpecifications from '../../../stories/CarSpecifications';
import MessageCarDetail from '../../../stories/MessagesCarDetail';

import _404page from '../../../stories/404page';
import LoadingComponent from '../../../stories/LoadingComponent';

import { thousands } from '../../../modules/functions';
import photoGaleryParser from '../../../modules/photoGaleryParser';
import {
  getUserToken,
  getUserDataFromToken,
  isUserLogged,
} from '../../../modules/sessionFunctions';

import ReactPixel from 'react-facebook-pixel';

const fpOptions = {
  autoConfig: true,
  debug: false,
};
ReactPixel.init('549275042176385', null, fpOptions);
ReactPixel.pageView();


const renderForNullPublication = (component, propName = 'data') =>
  branch(
    props => props[propName] && props[propName].Publication === null,
    renderComponent(component),
  );

const renderWhileLoading = (component, propName = 'data', propName2 = 'data') =>
  branch(
    props =>
      props[propName] && props[propName].loading && props[propName2].loading,
    renderComponent(component),
  );
class CarDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
    };
    this.toggle = this.toggle.bind(this);
    this.renderBtnCredit = this.renderBtnCredit.bind(this);
    this.isPublicationVisible = this.isPublicationVisible.bind(this);
    ReactGA.pageview('/DETALLE-AUTO');
  }
  componentWillMount() {
    hotjar.initialize(916734, 6);
  }
  toggle() {
    this.setState({
      modal: !this.state.modal,
    });
  }
  isPublicationVisible() {
    const { carDetailData, carSpecsData } = this.props;
    if (!carDetailData.loading && !carSpecsData.loading) {
      if (carDetailData.Publication.CurrentState.stateName === 'Pendiente' || carDetailData.Publication.CurrentState.stateName === 'Vencida' || carDetailData.Publication.CurrentState.stateName === 'Suspendida' || carDetailData.Publication.CurrentState.stateName === 'Eliminada') {
        return false;
      }
      return true;
    }
    return true;
  }
  showUserPhone(data) {
    if (!data.loading) {
      if (data.User) {
        return data.User.isAgency ? data.User.agencyPhone : data.User.phone;
      }
      return data.phone || false;
    }
    return '';
  }
  dontShowEditButton() {
    if (
      isUserLogged() &&
      !this.props.carDetailData.loading &&
      this.props.carDetailData.Publication.User &&
      getUserDataFromToken().id === this.props.carDetailData.Publication.User.id
    ) {
      return false;
    }
    return true;
  }
  toggleModal() {
    this.setState({ showModal: !this.state.showModal });
  }
  renderBtnCredit(title, subtitle, brand) {
    return (
      <button>
        <label>{title}</label>
        <label className="subtitle">{subtitle}</label>
        {brand === 'miautohoy' && <img src="/logo.png" alt="Logo" />}
        {brand === 'tutasa' && <img src="/assets/images/partners/tutasa.jpeg" alt="" className="logo" />}
      </button>
    );
  }
  render() {
    const {
      carDetailData,
      carSpecsData,
      commentThreadData,
      history,
      location,
    } = this.props;
    let hiddenClass = '';
    if (!carDetailData.loading && !carSpecsData.loading) {
      if (
        carDetailData.Publication.CurrentState.stateName === 'Pendiente' ||
        carDetailData.Publication.CurrentState.stateName === 'Vencida' ||
        carDetailData.Publication.CurrentState.stateName === 'Suspendida' ||
        carDetailData.Publication.CurrentState.stateName === 'Eliminada'
      ) {
        hiddenClass = 'hidden';
      } else {
        hiddenClass = '';
      }
      if (
        (carDetailData.Publication.CurrentState.stateName === 'Pendiente' ||
          carDetailData.Publication.CurrentState.stateName === 'Vencida' ||
          carDetailData.Publication.CurrentState.stateName === 'Suspendida' ||
          carDetailData.Publication.CurrentState.stateName === 'Eliminada') &&
        parse(this.props.location.search).t
      ) {
        const uData = decode(parse(this.props.location.search).t);
        if (uData.userType === 'Admin') {
          hiddenClass = '';
        } else {
          hiddenClass = 'hidden';
        }
      }
    }
    return (
      <div>
        {!carDetailData.loading && (
          <Helmet>
            <meta charSet="utf-8" />
            <title>{`${carDetailData.Publication.brand} - ${
              carDetailData.Publication.group
            }`}
            </title>
            <meta property="fb:app_id" content={146328269397173} />
            <meta
              property="og:url"
              content={`https://miautohoy.com/carDetail${location.search}`}
            />
            <meta property="og:type" content="website" />
            <meta
              property="og:image"
              content={`https://miautohoy.com/images/${
                carDetailData.Publication.ImageGroup.image1
              }`}
            />
          </Helmet>
        )}
        {/* <TopTopNav history={history} /> */}
        <Header history={history} location={location} />
        <div className="container mt-4">
          <Row>
            <Col md="8" sm="12" xs="12">
              <BreadCrum history={history} />
            </Col>
            <Col md="4" sm="12" xs="12">
              <PublicityBanner
                history={history}
                dataPublication={carDetailData.Publication}
              />
            </Col>
          </Row>
        </div>
        {!this.isPublicationVisible() && (
          <Row>
            <div className="col-md-3 hidden-sm-down" />
            <Col md="6" sm="12" xs="12">
              <h3 className="hiddenMessage">
                {`Esta publicación se encuentra ${carDetailData.Publication.CurrentState.stateName}.`}
              </h3>
            </Col>
            <div className="col-md-3 hidden-sm-down" />
          </Row>
        )}
        <div className={`container ${hiddenClass}`}>
          {carDetailData.Publication === null && (
            <h3>Esta publicación no exite o ha sido eliminada.</h3>
          )}
          {!carDetailData.loading &&
            carDetailData.Publication !== null && (
              <Row>
                <Col md="8" sm="12" xs="12">
                  <CarCarousel
                    photoGalery={photoGaleryParser(carDetailData.Publication.ImageGroup)}
                  />
                  <div className="container-data-input-group">
                    <h5 className="title">Resumen</h5>
                    <Row>
                      <Col md="6" sm="6" xs="12">
                        <div className="data-input-group">
                          <label>ESTADO</label>
                          <p>{carDetailData.Publication.carState}</p>
                        </div>
                      </Col>
                      <Col md="6" sm="6" xs="12">
                        <div className="data-input-group">
                          <label>KM</label>
                          <p>
                            {thousands(
                              carDetailData.Publication.kms,
                              0,
                              ',',
                              '.',
                            )
                              ? thousands(
                                  carDetailData.Publication.kms,
                                  0,
                                  ',',
                                  '.',
                                )
                              : 'No especificado'}
                          </p>
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="6" sm="6" xs="12">
                        <div className="data-input-group">
                          <label>MARCA</label>
                          <p>{carDetailData.Publication.brand}</p>
                        </div>
                      </Col>
                      <Col md="6" sm="6" xs="12">
                        <div className="data-input-group">
                          <label>AÑO</label>
                          <p>{carDetailData.Publication.year}</p>
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="6" sm="6" xs="12">
                        <div className="data-input-group">
                          <label>MODELO</label>
                          <p>{carDetailData.Publication.modelName}</p>
                        </div>
                      </Col>
                      <Col md="6" sm="6" xs="12">
                        <div className="data-input-group">
                          <label>COMBUSTIBLE</label>
                          <p>{carDetailData.Publication.fuel}</p>
                        </div>
                      </Col>
                    </Row>
                  </div>
                  {!carSpecsData.loading &&
                    carSpecsData.Publication.Specifications !== null && (
                      <CarSpecifications
                        data={carSpecsData.Publication.Specifications}
                      />
                    )}
                  <div className="container-data-input-group">
                    <div className="data-input-group">
                      <h5>Comentarios del Vendedor</h5>
                      <p>{carDetailData.Publication.observation}</p>
                    </div>
                  </div>
                </Col>
                <Col md="4" sm="12" xs="12" className="sheet sheet-min">
                  <Row>
                    <Col md="12" sm="6" xs="12">
                      <Row>
                        <div className="col-12 item-data">
                          <small className="item-year">
                            {carDetailData.Publication.year}
                            {thousands(
                              carDetailData.Publication.kms,
                              0,
                              ',',
                              '.',
                            )
                              ? ` - ${thousands(
                                  carDetailData.Publication.kms,
                                  0,
                                  ',',
                                  '.',
                                )} kms`
                              : ''}
                          </small>
                          <p className="item-name">
                            <strong>
                              {`${carDetailData.Publication.brand} ${
                                carDetailData.Publication.group
                              }`}
                            </strong>
                          </p>
                          <p className="item-description">
                            {carDetailData.Publication.modelName}
                          </p>
                          <p className="item-price" style={{ display: 'contents' }}>
                            <strong>
                              {carDetailData.Publication.price
                                ? `$${thousands(
                                    carDetailData.Publication.price,
                                    0,
                                    ',',
                                    '.',
                                  )}`
                                : 'Consultar'}
                            </strong>
                          </p>
                          {
                              carDetailData.Publication.CurrentState.stateName === 'Vendida' && <Badge style={{ marginLeft: '10px' }}>VENDIDO</Badge>
                            }
                        </div>
                      </Row>
                      <Button
                        color="primary"
                        onClick={() => {
                          ReactGA.event({
                            category: 'CarDetail',
                            action: 'Ir a Créditos Prendarios',
                          });
                          history.push(`/pledgeCredits?${stringify(carDetailData.Publication)}`);
                        }}
                      >
                        ¡Solicitá tu crédito!
                      </Button>
                      <Card123Seguros isCarSelected history={history} carData={carDetailData.Publication} />
                      <div className="container-social">
                        <a
                          href={`https://www.facebook.com/sharer/sharer.php?u=https://miautohoy.com/carDetail${
                            location.search
                          }`}
                          className="btn btn-social-icon"
                        >
                          <img
                            src="/assets/utils/icon-facebook.svg"
                            alt="icon-fb"
                          />
                        </a>
                        <a
                          href={`https://twitter.com/intent/tweet?text=Vendo ${
                            carDetailData.Publication.brand
                          } - ${
                            carDetailData.Publication.group
                          }. Ingresa a https://miautohoy.com/carDetail${
                            location.search
                          } para ver más detalles!`}
                          className="btn btn-social-icon"
                        >
                          <img
                            src="/assets/utils/icon-twitter.svg"
                            alt="icon-tw"
                          />
                        </a>
                      </div>
                    </Col>
                    <Col md="12" sm="6" xs="12">
                      <div className="container-data-input-group">
                        <h5>
                          {carDetailData.Publication.User
                            ? carDetailData.Publication.User.agencyName ||
                              carDetailData.Publication.User.name
                            : 'Particular'}
                        </h5>
                        {carDetailData.Publication.User ? (
                          carDetailData.Publication.User.agencyName && (
                            <Button
                              onClick={() =>
                                this.props.history.push(`/microsite?concesionaria=${
                                    carDetailData.Publication.User.agencyName
                                  }&c_id=${carDetailData.Publication.User.id}`)
                              }
                              color="link"
                            >
                              Ver todos los autos
                            </Button>
                          )
                        ) : (
                          <span />
                        )}
                        <div className="data-input-group">
                          <label>DOMICILIO</label>
                          <p>{`
                            ${carDetailData.Publication.User
                              ? carDetailData.Publication.User.agencyAdress ||
                                carDetailData.Publication.User.address
                              : 'No especificado'} ${carDetailData.Publication.Town ? `, ${carDetailData.Publication.Town.name} ,` : ''} ${carDetailData.Publication.Province ? carDetailData.Publication.Province.name : ''}
                          `}
                          </p>
                        </div>
                        <div className="data-input-group">
                          {this.showUserPhone(carDetailData.Publication) && <label>TELÉFONOS</label>}
                          <p>{this.showUserPhone(carDetailData.Publication)}</p>
                        </div>
                        <div className="data-input-group">
                          <label>EMAIL</label>
                          <p>
                            {carDetailData.Publication.User
                              ? carDetailData.Publication.User.agencyEmail ||
                                carDetailData.Publication.User.email ||
                                'No especificado'
                              : carDetailData.Publication.email}
                          </p>
                        </div>
                      </div>
                      {this.dontShowEditButton() ? (
                        <MessageCarDetail
                          commentThread_id={
                            commentThreadData.CommentThread &&
                            !_.isEmpty(commentThreadData.CommentThread)
                              ? commentThreadData.CommentThread[0].id
                              : null
                          }
                          location={location}
                          history={history}
                          disabled={carDetailData.Publication.CurrentState.stateName === 'Vendida'}
                          publicationUserId={
                            carDetailData.Publication.User
                              ? carDetailData.Publication.User.id
                              : undefined
                          }
                          publicationId={parse(location.search).publication_id}
                        />
                      ) : (
                        <Button color="secondary">Editar Publicación</Button>
                      )}
                    </Col>
                  </Row>
                </Col>
              </Row>
            )}
        </div>
        <Modal isOpen={this.state.showModal} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>¿Qué tipo de crédito querés solicitar?</ModalHeader>
          <ModalBody>
            <Row>
              <Col md="6" sm="12" className="modal-credit modal-credit-left">
                {this.renderBtnCredit('Crédito Personal', '¡Totalmente online!', 'tutasa')}
              </Col>
              <Col md="6" sm="12" className="modal-credit modal-credit-right">
                {this.renderBtnCredit('Crédito Prendario', '¡Hasta 60 meses de plazo!', 'miautohoy')}
              </Col>
            </Row>
          </ModalBody>
        </Modal>
        <Footer history={history} />
      </div>
    );
  }
}
const options = ({ location, commentThreadData }) => ({
  variables: {
    id: parse(location.search).publication_id,
    publication_id: parse(location.search).publication_id,
    MAHtokenP1: getUserToken(),
    chatToken: parse(location.search).chatToken,
    commentThread_id:
      commentThreadData && !commentThreadData.loading
        ? commentThreadData.CommentThread.id
        : null,
  },
});
const withCarDetails = graphql(CarDetailQuery, {
  name: 'carDetailData',
  options,
});

const withSpecs = graphql(CarSpecs, { name: 'carSpecsData', options });
const withCommentThread = graphql(CommentThreadQuery, {
  name: 'commentThreadData',
  options,
});

const withData = compose(
  withSpecs,
  withCarDetails,
  withCommentThread,
  renderForNullPublication(_404page, 'carDetailData'),
  renderWhileLoading(LoadingComponent, 'carDetailData', 'carSpecsData'),
);
const CarDetailwithData = withData(CarDetail);

export default CarDetailwithData;

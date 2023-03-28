/* eslint react/jsx-filename-extension: 0 */
/* eslint react/prop-types: 0 */

import React, { Component } from 'react';
import { Col, Row, Button, Label, Input, ModalHeader, Modal, ModalBody, ModalFooter, FormGroup } from 'reactstrap';
import { graphql, compose } from 'react-apollo';
import { parse } from 'query-string';

import _ from 'lodash';
import ScrollToTop from 'react-scroll-up';
import { animateScroll as scroll } from 'react-scroll';

import AdminBar from '../../../stories/AdminBar';

import ImageCrop from '../../../stories/ImageCrop';
import SuperAdminSideBar from '../../../stories/SuperAdminSideBar';
import { uploadAgencyImages, changePassword } from '../../../modules/fetches';
import parseError from '../../../modules/errorParser';
import Breadcrumb from '../../../stories/BreadCrum';

import { AgencyDetailQuery } from '../../../apolloQueries/AgencyProfileQuery';
import { AdminUserDataMutation } from '../../../apolloQueries/SuperadminMicrositeQuery';

import { getUserToken, getUserDataFromToken } from '../../../modules/sessionFunctions';

class SuperAdminMicrosite extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modifyActive: false,
      agencyName: '',
      agencyAdress: '',
      agencyEmail: '',
      agencyPhone: '',
      previewProfileImage: '',
      previewBannerImage: '',
      profileImage: '',
      bannerImage: '',
      responseMsg: '',
      responseTitle: '',
      modal: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps({ agencyData }) {
    if (!agencyData.loading) {
      const {
        agencyAdress,
        agencyEmail,
        agencyName,
        agencyPhone,
        bannerImage,
        profileImage,
      } = agencyData.User;
      scroll.scrollToTop({ duration: 300 });
      this.setState({
        agencyAdress,
        agencyEmail,
        agencyName,
        agencyPhone,
        previewProfileImage: _.isNull(profileImage) ? 'default.jpg' : profileImage,
        previewBannerImage: _.isNull(bannerImage) ? 'default.jpg' : bannerImage,
      });
    }
  }
  getBannerImage(img) {
    this.setState({ bannerImage: img });
  }
  getProfileImage(img) {
    this.setState({ profileImage: img });
  }
  toggle() {
    this.setState({ modifyActive: !this.state.modifyActive });
  }
  toggleModal() {
    this.setState({
      modal: !this.state.modal,
    });
  }
  update() {
    this.props.updateData({
      variables: {
        MAHtoken: getUserToken(),
        userId: parse(this.props.location.search).u_id,
        agencyName: this.state.agencyName,
        agencyAdress: this.state.agencyAdress,
        agencyEmail: this.state.agencyEmail,
        agencyPhone: this.state.agencyPhone,
        province_id: this.state.province_id,
        town_id: this.state.town_id,
      },
      refetchQueries: ['User'],
    }).then(({ data: { modifyUserData: uData } }) => {
      this.setState({
        modal: true,
        agencyName: uData.agencyName,
        agencyAdress: uData.agencyAdress,
        agencyEmail: uData.agencyEmail,
        agencyPhone: uData.agencyPhone,
        responseTitle: 'Felicitaciones',
        responseMsg: 'Datos actualizados con éxito',
      });
      this.toggle();
    }).catch(err => console.log(err));
  }
  handleSubmit() {
    const { profileImage, bannerImage } = this.state;
    const { u_id } = parse(this.props.location.search);
    uploadAgencyImages(profileImage, bannerImage, u_id)
      .then((resp) => {
        this.setState({
          modal: true,
          responseTitle: 'Éxito',
          responseMsg: resp.message,
        });
      })
      .catch((e) => {
        const error = parseError(e);
        this.setState({
          modal: true,
          responseTitle: error.title,
          responseMsg: error.message,
        });
      });
  }
  changePassword() {
    changePassword(parse(this.props.location.search).u_id, this.state.newPassword)
      .then((resp) => {
        this.setState({
          modal: true,
          responseTitle: 'Éxito',
          responseMsg: resp.message,
        });
      })
      .catch((e) => {
        const error = parseError(e);
        this.setState({
          modal: true,
          responseTitle: error.title,
          responseMsg: error.message,
        });
      });
  }

  render() {
    const { history, location } = this.props;
    return (
      <div>
        <AdminBar history={this.props.history} />
        <div className="container">
          <Row>
            <Col lg="3" md="12" sm="12" xs="12">
              <SuperAdminSideBar history={this.props.history} location={this.props.location} />
            </Col>
            <Col lg="9" md="12" sm="12" xs="12" className="mt-4">
              <Breadcrumb history={this.props.history} />
              <Row>
                <Col lg="6" md="12" sm="12" xs="12" className="container-data-input-group">
                  <div className="card p-4 mb-4">
                    <div className="data-input-group">
                      <Label>NOMBRE DE LA AGENCIA</Label>
                      {this.state.modifyActive ? (
                        <Input
                          type="text"
                          name="agencyName"
                          value={this.state.agencyName}
                          onChange={event =>
                            this.setState({ agencyName: event.target.value })
                          }
                        />
                      ) : (
                        <p>{this.state.agencyName}</p>
                      )}
                    </div>
                    <div className="data-input-group">
                      <Label>DOMICILIO</Label>
                      {this.state.modifyActive ? (
                        <Input
                          type="text"
                          name="agencyAdress"
                          value={this.state.agencyAdress}
                          onChange={event =>
                            this.setState({ agencyAdress: event.target.value })
                          }
                        />
                      ) : (
                        <p>{this.state.agencyAdress}</p>
                      )}
                    </div>
                    <div className="data-input-group">
                      <Label>EMAIL DE CONTACTO</Label>
                      {this.state.modifyActive ? (
                        <Input
                          type="text"
                          name="agencyEmail"
                          value={this.state.agencyEmail}
                          onChange={event =>
                            this.setState({ agencyEmail: event.target.value })
                          }
                        />
                      ) : (
                        <p>{this.state.agencyEmail}</p>
                      )}
                    </div>
                    <div className="data-input-group">
                      <Label>TELEFONO FIJO</Label>
                      {this.state.modifyActive ? (
                        <Input
                          type="text"
                          name="agencyPhone"
                          value={this.state.agencyPhone}
                          onChange={event =>
                            this.setState({ agencyPhone: event.target.value })
                          }
                        />
                      ) : (
                        <p>{this.state.agencyPhone}</p>
                      )}
                    </div>
                    <div className="underline" />
                    {this.state.modifyActive ? (
                      <span>
                        <Button
                          color="primary"
                          className="btn-link-primary align-self-end"
                          onClick={() => this.update()}
                        >
                          <img src="/assets/utils/icon-check-red.svg" alt="" />Guardar
                        </Button>
                        <Button
                          color="default"
                          className="btn-link-danger align-self-end"
                          onClick={() => this.toggle()}
                        >
                          Cancelar
                        </Button>
                      </span>
                    ) : (
                      <Button
                        type="primary"
                        className="btn-link-primary align-self-end"
                        onClick={() => this.toggle()}
                      >
                        <img src="/assets/utils/icon-edit-red.svg" alt="" />
                        Editar
                      </Button>
                    )}
                  </div>
                </Col>
                <Col lg="6" md="8" sm="12" className="container-data-input-group mv-15">
                  <div className="card p-3" style={{ height: '100%' }}>
                    <h5 className="title-division"><b>Cambiar contraseña</b></h5>
                    <FormGroup>
                      <Label for="repeatPass">Nueva Contraseña</Label>
                      <Input type="password" onChange={e => this.setState({ newPassword: e.target.value })} value={this.state.newPassword} name="password" id="repeatPass" />
                    </FormGroup>
                    <Button type="secondary" className="btn-link-primary align-self-end" disabled={this.state.password === ''} onClick={() => this.changePassword()}><img src="/assets/utils/icon-check-red.svg" alt="" />Cambiar</Button>
                  </div>
                </Col>
              </Row>
              <Col lg="6" md="12" sm="12" xs="12" className="container-data-input-group">
                <div className="card p-4 mb-4">
                  <div className="data-input-group">
                    <Label>FOTO DE PORTADA</Label> <small>(Recomendado 1440 x 360)</small>
                    <div className="col-12">
                      <ImageCrop
                        aspectRatio={16 / 4}
                        cropImage={img => this.getBannerImage(img)}
                        previewImage={this.state.previewBannerImage}
                      />
                    </div>
                  </div>

                  <div className="data-input-group">
                    <Label>MARCA DE LA AGENCIA O FOTO DE PERFIL</Label> <small>(Recomendado 265 x 175)</small>
                    <div className="col-12">
                      <ImageCrop
                        aspectRatio={85 / 53}
                        cropImage={img => this.getProfileImage(img)}
                        previewImage={this.state.previewProfileImage}
                      />
                    </div>
                  </div>

                  <div className="underline" />
                  <Button
                    type="secondary"
                    className="btn-link-primary align-self-end"
                    onClick={() => this.handleSubmit()}
                  >
                    <img src="/assets/utils/icon-check-red.svg" alt="" />
                      Guardar
                  </Button>
                </div>
              </Col>
            </Col>
          </Row>
          <ScrollToTop showUnder={320} >
            <img style={{ width: '30px' }} src="/assets/utils/icon-arrow-top.svg" alt="Inicio" />
          </ScrollToTop>
        </div>
        <Modal isOpen={this.state.modal} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>{this.state.responseTitle}</ModalHeader>
          <ModalBody>
            <div className="col-md-6 offset-md-3">
              <h5>{this.state.responseMsg}</h5>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={() => this.toggleModal()}>OK</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}
const options = props => ({
  variables: {
    MAHtoken: getUserToken(),
    id: parse(props.location.search).u_id,
  },
});
const withAgencyDetail = graphql(AgencyDetailQuery, {
  name: 'agencyData',
  options,
});
const withUserDataMutation = graphql(AdminUserDataMutation, { name: 'updateData' });
const withData = compose(withAgencyDetail, withUserDataMutation);
export default withData(SuperAdminMicrosite);

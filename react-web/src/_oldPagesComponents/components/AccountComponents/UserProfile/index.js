/* eslint react/jsx-filename-extension: 0 */
/* eslint react/prop-types: 0 */

import React from 'react';
import { Col, Row, Button, FormGroup, Label, Input, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
// Todo: adapt this
// import { graphql, compose } from 'react-apollo';
import { branch, renderComponent } from 'recompose';
import ScrollToTop from 'react-scroll-up';
import ReactGA from 'react-ga';
import Select from 'react-select';


import AdminBar from '../../../pages/_old/AdminBar';
import UserSideBar from '../../../pages/_old/UserSideBar';
import { UserDetailQuery, UserDataMutation, UserPasswordMutation } from '../../../graphql/_old/UserProfileQuery';
import { getUserToken, isUserLogged } from '../../../modules/sessionFunctions';
import { getProvinces, getTowns } from '../../../modules/fetches';
import { validate, prepareArraySelect } from '../../../modules/functions';
import Login from '../../../pages/auth/Login';


const renderForUnloggedUser = (component, propName = 'data') =>
  branch(
    props => !isUserLogged(),
    renderComponent(component),
  );

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modifyActive: false,
      name: 'Cargando...',
      address: 'Cargando...',
      phone: 'Cargando...',
      email: 'Cargando...',
      provinceList: [],
      townList: [],
      oldPassword: '',
      newPassword: '',
      repeatNpass: '',
      responseMsg: '',
      responseTitle: '',
      modal: false,
    };
    ReactGA.pageview('/USUARIO-PERFIL');
    this.update = this.update.bind(this);
  }

  componentWillMount() {
    getProvinces()
      .then((response) => {
        this.setState({ provinceList: response.data });
      })
      .catch(error => console.log(error));
  }

  componentWillReceiveProps(newProps) {
    if (!newProps.userProfile.loading) {

      this.setState({
        name: newProps.userProfile.User.name,
        address: newProps.userProfile.User.address,
        email: newProps.userProfile.User.email,
        phone: newProps.userProfile.User.phone,
      });
      if (newProps.userProfile.User.Province !== null) {
        getTowns(newProps.userProfile.User.Province.id)
          .then((response) => {
            this.setState({
              townList: response.data,
              province_id: newProps.userProfile.User.Province.id,
              town_id: newProps.userProfile.User.Town.id,
            });
          })
          .catch(error => console.log(error));
      }
    }
  }
  toggle() {
    this.setState({
      modifyActive: !this.state.modifyActive,
    });
  }
  toggleModal() {
    this.setState({
      modal: !this.state.modal,
    });
  }
  onChangeProvince(newProvince) {
    getTowns(newProvince)
      .then((response) => {
        this.setState({
          province_id: newProvince,
          townList: response.data,
        });
      })
      .catch(error => console.log(error));
  }
  update() {
    this.props.updateData({
      variables: {
        MAHtoken: getUserToken(),
        name: this.state.name,
        address: this.state.address,
        phone: this.state.phone,
        province_id: this.state.province_id,
        town_id: this.state.town_id,
      },
      refetchQueries: ['User'],
    }).then(({ data: { modifyUserData: uData } }) => {
      this.setState({
        modal: true,
        name: uData.name,
        address: uData.address,
        phone: uData.phone,
        responseTitle: 'Felicitaciones',
        responseMsg: 'Datos actualizados con éxito',
      });
      this.toggle();
    }).catch(err => console.log(err));
  }
  updatePassword() {
    this.props.updatePassword({
      variables: {
        MAHtoken: getUserToken(),
        oldPassword: this.state.oldPassword,
        newPassword: this.state.newPassword,
      },
    }).then(() => {
      this.setState({
        modal: true,
        oldPassword: '',
        newPassword: '',
        repeatNpass: '',
        responseTitle: 'Felicitaciones',
        responseMsg: 'Contraseña actualizada con éxito',
      });
    }).catch(({ graphQLErrors, networkError }) => {
      if (graphQLErrors) {
        graphQLErrors.map(({ message }) =>
          this.setState({
            responseTitle: 'Error',
            responseMsg: message,
            modal: true,
          }));
      }
      if (networkError) {
        this.setState({
          responseTitle: 'Error',
          responseMsg: networkError,
          modal: true,
        });
      }
    });
  }
  isPasswordFormInvalid() {
    if (this.state.newPassword !== this.state.repeatNpass ||
    this.state.newPassword === '') {
      return true;
    }
    return false;
  }

  render() {
    const {
      history, location, userProfile,
    } = this.props;
    return (
      <div>
        <AdminBar history={history} />
        <div className="container">
          <Row>
            <Col lg="3" md="12" sm="12" xs="12">
              <UserSideBar history={history} location={location} />
            </Col>
            <Col lg="9" md="12" sm="12" className="mt-4">
              <Row>
                {!userProfile.loading &&
                <Col lg="6" md="8" sm="12" className="container-data-input-group">
                  <div className="card p-4" style={{ height: '100%' }}>
                    <div className="data-input-group">
                      <label>NOMBRE Y APELLIDO</label>
                      {this.state.modifyActive ?
                        <Input type="text" name="name" value={this.state.name} onChange={event => this.setState({ name: event.target.value })} />
                : <p>{this.state.name}</p>}
                    </div>
                    <div className="data-input-group">
                      <label>DOMICILIO</label>
                      {this.state.modifyActive ?
                        <Input type="text" name="address" value={this.state.address} onChange={event => this.setState({ address: event.target.value })} />
                  : <p>{this.state.address}</p>}
                    </div>
                    <div className="data-input-group">
                      <label>Provincia</label>
                      <Select
                        id="province-select"
                        ref={(ref) => { this.select = ref; }}
                        onBlurResetsInput={false}
                        onSelectResetsInput={false}
                        options={prepareArraySelect(this.state.provinceList, 'id', 'name')}
                        simpleValue
                        clearable
                        disabled={!this.state.modifyActive}
                        name="selected-state"
                        value={this.state.province_id}
                        placeholder="Selecciona una provincia"
                        onChange={newValue => this.onChangeProvince(newValue)}
                        searchable
                        noResultsText="No se encontraron resultados"
                         theme={theme => ({
                      ...theme,
                      borderRadius: 4,
                      colors: {
                      ...theme.colors,
                        primary25: '#A0AABF',
                        primary: '#2A3B59',
                      },
                    })
                  }
                      />
                    </div>
                    <div className="data-input-group">
                      <label>Localidad</label>
                      <Select
                        id="city-select"
                        ref={(ref) => { this.select = ref; }}
                        onBlurResetsInput={false}
                        onSelectResetsInput={false}
                        options={prepareArraySelect(this.state.townList, 'id', 'name')}
                        simpleValue
                        clearable
                        disabled={!this.state.modifyActive}
                        name="selected-state"
                        value={this.state.town_id}
                        placeholder="Selecciona una localidad"
                        onChange={town_id => this.setState({ town_id })}
                        searchable
                        noResultsText="No se encontraron resultados"
                        theme={theme => ({
                          ...theme,
                          borderRadius: 4,
                          colors: {
                          ...theme.colors,
                            primary25: '#A0AABF',
                            primary: '#2A3B59',
                          },
                        })
                        }
                      />
                    </div>
                    <div className="data-input-group">
                      <label>EMAIL DE CONTACTO <small>(Mail de inicio de sesión)</small></label>
                      <p>{this.state.email}</p>
                    </div>
                    <div className="data-input-group">
                      <label>TELEFONO DE CONTACTO</label>
                      {this.state.modifyActive ?
                        <Input type="text" name="phone" value={this.state.phone} onChange={event => this.setState({ phone: event.target.value })} />
                      : <p>{this.state.phone}</p>}
                    </div>
                    <div className="underline" />
                    {this.state.modifyActive ?
                      <span>
                        <Button color="secondary" className="btn-link-warning align-self-end" onClick={() => this.toggle()} >Cancelar</Button>
                        <Button color="primary" className="btn-link-primary align-self-end" onClick={() => this.update()}>  <img src="/assets/utils/icon-check-red.svg" alt="" />Guardar</Button>
                      </span>
                  : <Button className="btn-link-primary align-self-end" color="primary" onClick={() => this.setState({ modifyActive: true })} >Modificar</Button>}
                  </div>
                </Col>}
                <Col lg="6" md="8" sm="12" className="container-data-input-group mv-15">
                  <div className="card p-4" style={{ height: '100%' }}>
                    <h6 className="title-division"><b>¿Quieres cambiar la contraseña?</b></h6>
                    <FormGroup>
                      <Label for="pasword">Contraseña actual</Label>
                      <Input type="password" onChange={e => this.setState({ oldPassword: e.target.value })} value={this.state.oldPassword} name="password" id="pasword" />
                    </FormGroup>
                    <FormGroup>
                      <Label for="newPassword">Nueva Contraseña</Label>
                      <Input type="password" onChange={e => this.setState({ repeatNpass: e.target.value })} value={this.state.repeatNpass} name="password" id="newPassword" />
                    </FormGroup>
                    <FormGroup>
                      <Label for="repeatPass">Repetir nueva Contraseña</Label>
                      <Input type="password" onChange={e => this.setState({ newPassword: e.target.value })} value={this.state.newPassword} name="password" id="repeatPass" />
                    </FormGroup>
                    <Button type="secondary" className="btn-link-primary align-self-end" disabled={this.isPasswordFormInvalid()} onClick={() => this.updatePassword()}><img src="/assets/utils/icon-check-red.svg" alt="" />Cambiar</Button>
                  </div>
                </Col>
              </Row>
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

const options = () => ({
  variables: {
    MAHtoken: getUserToken(),
  },
});

const withUserData = graphql(UserDetailQuery, { name: 'userProfile', options });
const withUserDataMutation = graphql(UserDataMutation, { name: 'updateData' });
const withPasswordMutation = graphql(UserPasswordMutation, { name: 'updatePassword' });
const withData = compose(
  withUserData,
  renderForUnloggedUser(Login, 'userProfile'),
  withUserDataMutation,
  withPasswordMutation,
);

export default withData(UserProfile);

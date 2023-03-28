import React, { Component } from 'react';
import { Col, Row, Button, ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  FormGroup,
  Label,
  Input,
} from 'reactstrap';
import { Notification } from 'react-notification';
import { animateScroll as scroll } from 'react-scroll';

import { getUserDataFromToken } from '../modules/sessionFunctions';
import { login, recoverPassword } from '../modules/fetches';
import { saveState } from '../modules/localStorage';
import parseError from '../modules/errorParser';
import NotificationModal from './NotificationModal';

/* eslint react/jsx-filename-extension: 0 */

export default class RegisterBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      showModal: false,
      dropdownUser: false,
      modalTitle: '',
      modalMessage: '',
      isNotificationActive: false,
      forgetPass: false,
      recoverPassEmail: '',
      loading: false,
      error: '',
      displayError: false,
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.toggleUser = this.toggleUser.bind(this);
    this.toggleNotification = this.toggleNotification.bind(this);
    this.isLoginFormIncomplete = this.isLoginFormIncomplete.bind(this);
    this.recoverPass = this.recoverPass.bind(this);
    this.disabled = this.disabled.bind(this);
    scroll.scrollToTop({ duration: 300 });
  }

  isLoginFormIncomplete() {
    if (this.state.email === '' || this.state.password === '') {
      return true;
    }
    return false;
  }
  toggleModal() {
    this.setState({
      modal: !this.state.modal,
    });
  }
  toggleNotification() {
    this.setState({
      isNotificationActive: !this.state.isNotificationActive,
    });
  }
  toggleUser() {
    this.setState({
      dropdownUser: !this.state.dropdownUser,
    });
  }
  loginUser(email, password) {
    login(email, password)
      .then((response) => {
        const MAHtoken = response.message;
        saveState({ login: { MAHtoken } });
        this.toggleModal();
        this.setState({
          isNotificationActive: true,
          email: '',
          password: '',
          isUserLogged: true,
        });
      })
      .catch((error) => {
        const errorParsed = parseError(error);
        this.setState({
          email: '',
          password: '',
          modalTitle: errorParsed.title,
          modalMessage: errorParsed.message,
          showModal: true,
        });
      });
  }
  recoverPass() {
    this.setState({ loading: true });
    recoverPassword(this.state.recoverPassEmail)
      .then((res) => {
        this.setState({
          loading: false,
          modalTitle: 'Listo',
          modalMessage: res.message,
          showModal: true,
        });
      })
      .catch((error) => {
        this.setState({
          loading: false,
          displayError: true,
          error: error || error.message,
        });
      });
  }
  disabled() {
    if (this.state.recoverPassEmail !== '') {
      return false;
    }
    return true;
  }

  render() {
    const { onlyLogin, history } = this.props;
    return (
      <div className="container-fluid" style={{ marginBottom: '75px' }}>
        <Row className="header" style={{ top: '0px' }} >
          <Col md="3" sm="6" xs="6">
            <Row>
              <a onClick={() => history.push('/')} className="brand" >
                <img style={{ width: '150px' }} src="/logo.png" alt="Logo" />
              </a>
            </Row>
          </Col>

          <Col md="9" sm="6" xs="6" className="text-right">
            <div className="d-none d-md-block">
              { !onlyLogin &&
              <div className="d-inline-block">
                <Button color="secondary" className="btn-link" href="#Features" >BENEFICIOS</Button>
                <Button color="secondary" className="btn-link" href="#Plans" >PLANES</Button>
                <Button color="secondary" className="btn-link" href="#Faq" >AYUDA</Button>

                <Button color="primary" onClick={() => this.toggleModal()} className="btn-link">INICIAR SESIÓN</Button>
              </div>
              }

            </div>
            <div className="d-inline-block d-md-none">
              <ButtonDropdown
                isOpen={this.state.dropdownUser}
                toggle={this.toggleUser}
              >
                <DropdownToggle caret color="default" className="btn-link btn-block" style={{ width: '100px' }}>
                  MENU
                </DropdownToggle>
                <DropdownMenu>
                  { !onlyLogin &&
                  <div>
                    <DropdownItem
                      value="Beneficios"
                      href="#Features"
                    >
                    Beneficios
                    </DropdownItem>
                    <DropdownItem
                      value="Planes"
                      href="#Plans"
                    >
                    Planes
                    </DropdownItem>
                    <DropdownItem
                      value="Ayuda"
                      href="#Faq"
                    >
                    Ayuda
                    </DropdownItem>
                    <DropdownItem divider />
                  </div>
                }
                  <DropdownItem
                    value="iniciar sesion"
                    onClick={() => this.toggleModal()}
                  >
                Iniciar Sesión
                  </DropdownItem>
                </DropdownMenu>
              </ButtonDropdown>
            </div>
          </Col>
        </Row>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggleModal}
          className={this.props.className}
          size="lg"
        >
          <ModalHeader toggle={this.toggleModal}>Iniciar sesión</ModalHeader>
          <ModalBody>
            <div className="col-md-6 offset-md-3">
              <Button color="primary" className="btn-facebook"><img src="/assets/utils/icon-single-facebook.svg" alt="icon-facebook" /> Registrate con facebook</Button>
              <div className="underline" />
              <FormGroup>
                <Label for="exampleEmail">Email</Label>
                <Input
                  type="email"
                  name="email"
                  value={this.state.email}
                  onChange={e => this.setState({ email: e.target.value })}
                  placeholder="Ej: maria@gmail.com"
                />
              </FormGroup>
              <FormGroup>
                <Label for="exampleEmail">Contraseña </Label>
                <Input
                  type="password"
                  name="password"
                  value={this.state.password}
                  onChange={e => this.setState({ password: e.target.value })}
                  placeholder="******"
                />
                <a
                  onClick={() => {
                  this.setState({ forgetPass: true });
                }}
                  style={{ cursor: 'pointer' }}
                >¿Olvidaste tu contraseña?
                </a>
                {this.state.forgetPass && (
                <div style={{ paddingTop: '20px' }}>
                  <Label>Ingresa tu email para poder recuperarla </Label>
                  <Input
                    style={{ display: 'inline' }}
                    type="email"
                    value={this.state.recoverPassEmail}
                    onChange={e =>
                      this.setState({ recoverPassEmail: e.target.value })
                    }
                  />
                  {this.state.displayError && <small style={{ color: 'red' }}>{this.state.error}</small>}
                  <Button color="secondary" disabled={this.disabled()} onClick={this.recoverPass} className="alternative" style={{ display: 'inline' }}>Recuperar </Button>
                  {this.state.loading && <img
                    style={{ height: '85px', paddingTop: '10px' }}
                    src="/assets/utils/loading.gif"
                    key={0}
                    alt="Loading..."
                  />}
                </div>
              )}
              </FormGroup>

            </div>

          </ModalBody>
          <ModalFooter>
            <div className="row">
              <div className="col-md-4 col-sm-12 float-left offset-md-3 align-item">
                <Button
                  disabled={this.isLoginFormIncomplete()}
                  onClick={() => this.loginUser(this.state.email, this.state.password)}
                  color="primary"
                  className="alternative"
                >
                    Iniciar sesión
                </Button>
              </div>
              <div className="col-md-4 col-sm-12 float-right">
                <Button
                  onClick={() => this.toggleModal}
                  color="default"
                  className="alternative"
                >
                    Salir
                </Button>
              </div>
              <div className="col-md-6 offset-md-3">
                <div className="underline" />
                <p>No tengo cuenta. Soy un particular. <a href="" className="btn-link">Registrarme</a></p>
                <p>No tengo cuenta. Soy una concesionaria. <a href="" className="btn-link">Registrar Agencia</a></p>
              </div>
            </div>
          </ModalFooter>
        </Modal>
        <NotificationModal
          primaryText={this.state.modalTitle}
          secondaryText={this.state.modalMessage}
          buttonName="Aceptar"
          showNotificationModal={this.state.showModal}
          handleClose={() => this.setState({ showModal: false })}
        />
        <Notification
          isActive={this.state.isNotificationActive}
          message={`Bienvenido ${getUserDataFromToken().name}!`}
          title="Hola!"
          barStyle={{ backgroundColor: '#48D2A0', zIndex: 3000, fontSize: '18px' }}
          dismissAfter={3500}
          onDismiss={this.toggleNotification}
          onClick={() => this.setState({ isNotificationActive: false })}
        />
      </div>
    );
  }
}

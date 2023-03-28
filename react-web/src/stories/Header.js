import React, { Component } from "react";
import Autosuggest from "react-autosuggest";
import {
  Col,
  Row,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Label,
} from "reactstrap";
import { Notification } from "react-notification";
import FacebookLogin from "react-facebook-login";
import ReactGA from "react-ga";
import { animateScroll as scroll } from "react-scroll";

import { AvForm, AvGroup, AvField } from "availity-reactstrap-validation";
import { validate } from "../modules/functions";
import { scroller } from "react-scroll";

import _ from "lodash";
//import autocompleteStyles from '../../public/assets/styles/autocompleteInput';
import { getOptionsForReactSelect } from "../modules/autocompleteData";
import {
  isUserLogged,
  getUserDataFromToken,
  clearSession,
  isAdminLogged,
} from "../modules/sessionFunctions";
import NotificationModal from "../stories/NotificationModal";
import parseError from "../modules/errorParser";
import {
  login,
  recoverPassword,
  checkFacebookLogin,
  loginOrRegisterFacebook,
} from "../modules/fetches";
import { saveState } from "../modules/localStorage";
import CreatableSelect from "react-select/lib/Creatable";
/* eslint react/jsx-filename-extension: 0 */
const groupStyles = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
};
const groupBadgeStyles = {
  backgroundColor: "#EBECF0",
  borderRadius: "2em",
  color: "#172B4D",
  display: "inline-block",
  fontSize: 12,
  fontWeight: "normal",
  lineHeight: "1",
  minWidth: 1,
  padding: "0.16666666666667em 0.5em",
  textAlign: "center",
};
class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: "",
      dropdownOpen: false,
      dropdownOpenPublicate: false,
      modal: false,
      sidebar: "",
      email: "",
      emailValidate: false,
      password: "",
      passwordValidate: false,
      showModal: false,
      modalVender: false,
      modalTitle: "",
      modalMessage: "",
      isNotificationActive: false,
      isUserLogged: isUserLogged(),
      carState:
        this.props.carState === undefined ? "Usado" : this.props.carState,
      value: this.props.text === undefined ? "" : this.props.text,
      recoverPassEmail: "",
      forgetPass: false,
      loading: false,
      error: "",
      displayError: false,
      errorInModal: false,
      searchModal: false,
    };
    this.toggle = this.toggle.bind(this);
    this.togglePublicate = this.togglePublicate.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.toggleModalVender = this.toggleModalVender.bind(this);
    this.toggleNotification = this.toggleNotification.bind(this);
    this.recoverPass = this.recoverPass.bind(this);
    this.disabled = this.disabled.bind(this);
    this.loginFB = this.loginFB.bind(this);
    this.pledgeCredits = this.pledgeCredits.bind(this);
    this.home = this.home.bind(this);
    this.friendlyAgency = this.friendlyAgency.bind(this);
    this.withoutRegister = this.withoutRegister.bind(this);
    this.agencyRegister = this.agencyRegister.bind(this);
    this.userRegister = this.userRegister.bind(this);
    this.loginUser = this.loginUser.bind(this);
    this.statusChangeCallback = this.statusChangeCallback.bind(this);
    this.submitSearch = this.submitSearch.bind(this);
    this.toggleSearchModal = this.toggleSearchModal.bind(this);
    this.toggleUser = this.toggleUser.bind(this);
  }

  componentDidMount() {
    scroll.scrollToTop({ duration: 300 });
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: "146328269397173",
        cookie: true,
        xfbml: true,
        version: "v2.1",
      });
      this.checkLoginState();
    }.bind(this);
    (function (d, s, id) {
      let js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s);
      js.id = id;
      js.src = "//connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");
  }

  submitSearch(text, errors) {
    if (!_.isEmpty(errors)) {
      scroller.scrollTo(errors[0], {
        duration: 600,
        smooth: true,
        offset: -100,
      });
      return false;
    }
    ReactGA.event({
      category: `SearchBar ${this.props.history.location.pathname}`,
      action: "Ir a Buscar autos",
    });
    this.setState({ sidebar: "", searchModal: false });
    this.props.history.push(`/SearchCars?text=${text}`);
  }

  checkLoginState() {
    window.FB.getLoginStatus((response) => {
      this.statusChangeCallback(response);
    });
  }
  loginFB() {
    window.FB.getLoginStatus((response) => {
      window.FB.api("/me", { fields: ["email", "name"] }, (res) => {
        loginOrRegisterFacebook(res)
          .then((resp) => {
            const MAHtoken = resp.message;
            saveState({ login: { MAHtoken } });
            this.toggleModal();
            this.setState({
              isNotificationActive: true,
              email: "",
              password: "",
              isUserLogged: true,
            });
          })
          .catch((error) => console.log(error));
      });
    });
  }

  statusChangeCallback(response) {
    if (response.status === "connected") {
      window.FB.api("/me", { fields: ["email", "name"] }, (res) => {
        checkFacebookLogin(res.email)
          .then((resp) => {
            const MAHtoken = resp.message;
            saveState({ login: { MAHtoken } });
            this.setState({
              isNotificationActive: true,
              email: "",
              password: "",
              isUserLogged: true,
            });
          })
          .catch((error) => console.log(error));
      });
    }
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  }
  toggleSearchModal() {
    this.setState({
      searchModal: !this.state.searchModal,
    });
  }
  togglePublicate() {
    this.setState({
      dropdownOpenPublicate: !this.state.dropdownOpenPublicate,
    });
  }
  toggleUser() {
    this.setState({
      dropdownUser: !this.state.dropdownUser,
    });
  }
  toggleModal() {
    this.setState({
      modal: !this.state.modal,
    });
  }
  toggleModalVender() {
    this.setState({
      modalVender: !this.state.modalVender,
    });
  }
  toggleNotification() {
    this.setState({
      isNotificationActive: !this.state.isNotificationActive,
    });
  }
  pledgeCredits() {
    ReactGA.event({
      category: `SearchBar ${this.props.history.location.pathname}`,
      action: "Ir a Créditos Prendarios",
    });
    return this.props.history.push("/pledgeCredits");
  }

  home() {
    ReactGA.event({
      category: `SearchBar ${this.props.history.location.pathname}`,
      action: "Ir a Home",
    });
    return this.props.history.push("/");
  }

  friendlyAgency() {
    ReactGA.event({
      category: `SearchBar ${this.props.history.location.pathname}`,
      action: "Ir a Concesionarias",
    });
    return this.props.history.push("/friendlyAgency");
  }

  withoutRegister() {
    ReactGA.event({
      category: `SearchBar ${this.props.history.location.pathname}`,
      action: "Ir a Publicá ya",
    });
    return this.props.history.push("/withoutRegister");
  }

  userRegister() {
    ReactGA.event({
      category: `SearchBar ${this.props.history.location.pathname}`,
      action: "Ir a Registro Usuario",
    });
    return this.props.history.push("/userRegister");
  }

  agencyRegister() {
    ReactGA.event({
      category: `SearchBar ${this.props.history.location.pathname}`,
      action: "Ir a Registro Agencia",
    });
    return this.props.history.push("/agencyRegister");
  }

  loginUser(event, errors) {
    if (!_.isEmpty(errors)) {
      scroller.scrollTo(errors[0], {
        duration: 600,
        smooth: true,
        offset: -100,
      });
      return false;
    }
    login(this.state.email, this.state.password)
      .then((response) => {
        const MAHtoken = response.message;
        saveState({ login: { MAHtoken } });
        this.toggleModal();
        ReactGA.event({
          category: `SearchBar ${this.props.history.location.pathname}`,
          action: "Ir a Login",
        });
        this.setState({
          isNotificationActive: true,
          email: "",
          password: "",
          isUserLogged: true,
        });
        if (isAdminLogged()) {
          return this.props.history.push("/admin");
        }
        return this.props.history.push("/userAdmin");
      })
      .catch((error) => {
        const errorParsed = parseError(error);
        this.setState({
          errorTitleInModal: errorParsed.title,
          errorMessageInModal: errorParsed.message,
          errorInModal: true,
        });
      });
  }
  recoverPass() {
    this.setState({ loading: true });
    recoverPassword(this.state.recoverPassEmail)
      .then((res) => {
        this.setState({
          loading: false,
          modalTitle: "Listo",
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
    if (this.state.recoverPassEmail !== "") {
      return false;
    }
    return true;
  }

  clearSession() {
    try {
      window.FB.logout();
    } catch (e) {
      console.log(e);
    }
    clearSession();
    this.setState({ isUserLogged: false });
  }

  renderButton(icon, title, subtitle) {
    let url = "";
    switch (icon) {
      case "rayo":
        url = "/publicateWithoutRegister";
        break;
      case "llaves":
        url = "/userRegister";
        break;
      case "auto":
        url = "/agencyRegister";
        break;
      case "comercial":
        url = "/";
        break;
      default:
        url = "/";
    }
    return (
      <button
        className="btn-type-seller"
        style={{ cursor: "pointer" }}
        onClick={() => {
          this.props.history.push(url);
        }}
      >
        <div className="col-2">
          <img src={`/assets/images/icon-${icon}.svg`} alt="" />
        </div>
        <div className="col-10">
          <div className="d-flex flex-column justify-content-start">
            <h4>{title}</h4>
            <h6>{subtitle}</h6>
          </div>
        </div>
      </button>
    );
  }
  renderNavbarUserSection() {
    if (this.state.isUserLogged) {
      if (window.matchMedia("(max-width: 990px)").matches) {
        return (
          <span>
            <Col lg="auto">
              {isAdminLogged() ? (
                <Row>
                  <Button
                    color="default-menu"
                    onClick={() => this.props.history.push("/admin")}
                  >
                    Administrador
                  </Button>
                </Row>
              ) : (
                <Row>
                  <Button
                    color="default-menu"
                    onClick={() => this.props.history.push("/userAdmin")}
                  >
                    Mi cuenta
                  </Button>
                </Row>
              )}
            </Col>
            <div className="w-100 d-block d-lg-none" />
            <Col lg="auto">
              <Row>
                <Button
                  color="default-menu"
                  onClick={() => this.props.history.push("/createPublication")}
                >
                  Vender
                </Button>
              </Row>
            </Col>
            <div className="w-100 d-block d-lg-none" />
            <Col lg="auto">
              <Row>
                <Button
                  color="default-menu"
                  onClick={() => this.clearSession()}
                >
                  Cerrar sesión
                </Button>
              </Row>
            </Col>
          </span>
        );
      }
      return (
        <Col lg="auto">
          <Row>
            <ButtonDropdown
              isOpen={this.state.dropdownUser}
              toggle={this.toggleUser}
            >
              <DropdownToggle caret color="default-menu mr-4">
                {this.state.nameFB
                  ? this.state.nameFB
                  : _.truncate(getUserDataFromToken().name, { length: 18 })}
              </DropdownToggle>
              <DropdownMenu>
                {!isAdminLogged() && (
                  <DropdownItem
                    value="myAccount"
                    onClick={() => this.props.history.push("/userAdmin")}
                  >
                    Mi cuenta
                  </DropdownItem>
                )}
                {isAdminLogged() && (
                  <DropdownItem
                    value="myAccount"
                    onClick={() => this.props.history.push("/admin")}
                  >
                    Administrador
                  </DropdownItem>
                )}
                <DropdownItem
                  value="closeSession"
                  onClick={() => this.clearSession()}
                >
                  Cerrar Sesión
                </DropdownItem>
              </DropdownMenu>
              <Button
                color="primary"
                className="btn-seller"
                onClick={() => this.props.history.push("/createPublication")}
              >
                Vender
              </Button>
            </ButtonDropdown>
          </Row>
        </Col>
      );
    }
    return (
      <Col lg="auto">
        <Row>
          <Col lg="auto" sm="12">
            <Row>
              <Button
                color="default-menu"
                className="mr-4"
                onClick={() => this.toggleModal()}
              >
                Iniciá Sesión
              </Button>
            </Row>
          </Col>
          <Col lg="auto" sm="12" className="d-none d-md-block">
            <Button color="primary" onClick={() => this.toggleModalVender()}>
              Vender
            </Button>
          </Col>
        </Row>
      </Col>
    );
  }

  render() {
    const customStyles = {
      input: (base) => ({
        ...base,
        width: "25vw",
        height: "40px",
        fontWeight: "300",
        fontSize: "16px",
        border: "0px solid #aaa",
        borderRadius: "4px",
        outline: "none",
        paddingTop: "7px",
      }),
      menu: (base, state) =>
        state.isFocused
          ? {
              ...base,
              display: "block",
              position: "absolute",
              top: "51px",
              width: "280px",
              border: "1px solid #aaa",
              backgroundColor: "#fff",
              fontWeight: "300",
              fontSize: "16px",
              borderBottomLeftRadius: "4px",
              borderBottomRightRadius: "4px",
              zIndex: 2,
            }
          : { ...base },
      indicatorSeparator: (base) => ({
        ...base,
        display: "none",
      }),
      indicatorsContainer: () => ({ display: "none" }),
    };
    const customStylesResponsive = {
      input: (base) => ({
        ...base,
        width: "100vw",
        height: "40px",
        fontWeight: "300",
        fontSize: "16px",
        border: "0px solid #aaa",
        borderRadius: "4px",
        outline: "none",
        paddingTop: "7px",
      }),
      menu: (base, state) =>
        state.isFocused
          ? {
              ...base,
              display: "block",
              position: "absolute",
              top: "51px",
              width: "280px",
              border: "1px solid #aaa",
              backgroundColor: "#fff",
              fontWeight: "300",
              fontSize: "16px",
              borderBottomLeftRadius: "4px",
              borderBottomRightRadius: "4px",
              zIndex: 2,
            }
          : { ...base },
      indicatorSeparator: (base) => ({
        ...base,
        display: "none",
      }),
      indicatorsContainer: () => ({ display: "none" }),
    };
    const options = getOptionsForReactSelect();

    // const haveTopBar = (this.props.location.pathname === '/' || this.props.location.pathname === '/friendlyAgency' || _.startsWith(this.props.location.pathname, '/microsite') || _.startsWith(this.props.location.pathname, '/carDetail') || _.startsWith(this.props.location.pathname, '/SearchCars') || _.startsWith(this.props.location.pathname, '/hire123'));
    // const haveToBanner = (this.props.location.pathname === '/friendlyAgency' || _.startsWith(this.props.location.pathname, '/carDetail') || _.startsWith(this.props.location.pathname, '/SearchCars') || _.startsWith(this.props.location.pathname, '/hire123'));
    return (
      <div
        className="container-fluid"
        style={{
          marginBottom: "90px",
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 9999,
        }}
      >
        <Row className="header">
          <Col md="2" className="brand">
            <Row>
              <a onClick={() => this.props.history.push("/")} >
                <img style={{ width: "120px" }} src="/logo.svg" alt="TechMo Logo" />
              </a>
            </Row>
          </Col>
          <div className="d-lg-none">
            <Button
              color="primary"
              onClick={() => this.setState({ sidebar: "active" })}
              className="float-left btn-sidebar-open btn-link-primary"
            >
              <img src="/assets/utils/icon-menu.svg" alt="" />
            </Button>
          </div>
          <Col md="10" className={`d-xl-block ${this.state.sidebar}`}>
            <Button
              color="primary"
              onClick={() => this.setState({ sidebar: "" })}
              className="btn-link-primary btn-sidebar-close d-none"
            >
              <img src="/assets/utils/icon-close.svg" alt="" />
            </Button>
            <Row className="area-btns">
              <Col lg="3" sm="4">
                {/* <Input type="text" id="search" value={this.state.text} onChange={(e) => { this.setState({ text: e.target.value }); }} /> */}
                <Row className="d-none d-sm-none d-md-block">
                  <CreatableSelect
                    placeholder={
                      <div className="d-flex flex-row">
                        <div style={{ width: "17vw" }}>
                          ¿Qué estas buscando?
                        </div>
                        <img
                          className="ml-auto pr-4"
                          src="/assets/utils/icon-search-red.svg"
                        />
                      </div>
                    }
                    onCreateOption={this.submitSearch}
                    onChange={(searchText) =>
                      this.setState({ searchText }, () =>
                        this.submitSearch(searchText.value)
                      )
                    }
                    formatCreateLabel={(search) => `Buscar: ${search}`}
                    styles={customStyles}
                    options={options}
                    onFocus={() =>
                      window.innerWidth <= 425 ? this.toggleSearchModal() : true
                    }
                    theme={(theme) => ({
                      ...theme,
                      borderRadius: 4,
                      colors: {
                        ...theme.colors,
                        primary25: "#A0AABF",
                        primary: "#2A3B59",
                      },
                    })}
                  />

                  {/* <Autosuggest
                    multiSection
                    suggestions={suggestions}
                    onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                    onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                    getSuggestionValue={getSuggestionValue}
                    renderSuggestion={renderSuggestion}
                    renderSectionTitle={renderSectionTitle}
                    getSectionSuggestions={getSectionSuggestions}
                    inputProps={inputProps}
                  /> */}
                </Row>
                <Row className="mr-auto">
                  <button
                    onClick={() => this.toggleSearchModal()}
                    className="d-sm-block d-md-none buscar-boton"
                  >
                    ¿Qué estás buscando?
                    <img
                      className="ml-auto"
                      src="/assets/utils/icon-search-red.svg"
                    />
                  </button>
                </Row>
              </Col>
              <div className="ml-auto sell-mobile">
                {this.state.isUserLogged ? (
                  <Button
                    color="primary"
                    className="mr-4 btn-seller"
                    onClick={() =>
                      this.props.history.push("/createPublication")
                    }
                  >
                    Vender
                  </Button>
                ) : (
                  <Button
                    color="primary"
                    className="mr-4 btn-seller"
                    onClick={() => this.toggleModalVender()}
                  >
                    Vender
                  </Button>
                )}
              </div>
              <div
                className={`d-flex flex-row sidebar-mobile ${this.state.sidebar} ml-auto`}
              >
                <Button
                  color="primary"
                  onClick={() => this.setState({ sidebar: "" })}
                  className="btn-link-primary btn-sidebar-close d-none"
                >
                  <img src="/assets/utils/icon-close.svg" alt="" />
                </Button>
                <div className="w-100 d-block d-lg-none" />
                <Col lg="auto">
                  <Row>
                    <Button
                      color="default-menu"
                      className="ml-4"
                      onClick={this.home}
                    >
                      Inicio
                    </Button>
                  </Row>
                </Col>
                <div className="w-100 d-block d-lg-none" />
                <Col lg="auto">
                  <Row>
                    <Button
                      color="default-menu"
                      className="ml-4"
                      onClick={this.pledgeCredits}
                    >
                      Financiación
                    </Button>
                  </Row>
                </Col>
                <div className="w-100 d-block d-lg-none" />
                <Col lg="auto">
                  <Row>
                    <Button color="default-menu" onClick={this.friendlyAgency}>
                      Concesionarias
                    </Button>
                  </Row>
                </Col>
                <div className="w-100 d-block d-lg-none" />
                {this.renderNavbarUserSection()}
              </div>
            </Row>
          </Col>
          <Modal
            isOpen={this.state.modal}
            toggle={this.toggleModal}
            className={this.props.className}
            size="md"
          >
            <ModalHeader toggle={this.toggleModal}>Iniciar sesión</ModalHeader>
            <ModalBody>
              <div className="col-md-10 offset-md-1">
                <AvForm onSubmit={this.loginUser}>
                  <FacebookLogin
                    appId="146328269397173"
                    autoLoad
                    callback={() => this.loginFB()}
                    icon="fa-facebook"
                    fields="name,email,picture"
                    textButton="Registrate con facebook"
                    cssClass="btn btn-primary btn-facebook"
                  />
                  <div className="underline" />
                  <small style={{ position: "relative", top: "-15px" }}>
                    O con tu e-mail
                  </small>
                  <AvField
                    label="Email"
                    type="email"
                    value={this.state.email}
                    onChange={(event) =>
                      this.setState({ email: event.target.value })
                    }
                    name="email"
                    id="email"
                    validate={validate("email")}
                    className="form-control"
                  />
                  <AvField
                    label="Contraseña"
                    type="password"
                    value={this.state.password}
                    onChange={(event) =>
                      this.setState({ password: event.target.value })
                    }
                    name="password"
                    id="password"
                    validate={validate("password")}
                    className="form-control"
                  />
                  <div className="d-flex flex-column align-items-center">
                    {this.state.errorInModal && (
                      <div>
                        <p className="text-danger">
                          {this.state.errorTitleInModal}.{" "}
                          {this.state.errorMessageInModal}
                        </p>
                      </div>
                    )}
                    <div className="col-6 text-center pb-3">
                      <Button
                        type="submit"
                        color="primary"
                        className="btn-block"
                      >
                        Iniciar sesión
                      </Button>
                    </div>
                    <a
                      onClick={() => {
                        this.setState({ forgetPass: true });
                      }}
                      style={{ cursor: "pointer", color: "#E40019" }}
                    >
                      ¿Olvidaste tu contraseña?
                    </a>
                  </div>
                  {this.state.forgetPass && (
                    <div style={{ paddingTop: "20px" }}>
                      <Label>Ingresa tu email para poder recuperarla </Label>
                      <AvForm onSubmit={this.recoverPass}>
                        <AvField
                          style={{ display: "inline" }}
                          type="email"
                          value={this.state.recoverPassEmail}
                          onChange={(e) =>
                            this.setState({ recoverPassEmail: e.target.value })
                          }
                          name="email"
                          id="email"
                          validate={validate("email")}
                          className="form-control"
                        />
                        {this.state.displayError && (
                          <small style={{ color: "red" }}>
                            {this.state.error}
                          </small>
                        )}
                        <Button
                          color="secondary"
                          type="submit"
                          className="alternative"
                          style={{ display: "inline" }}
                        >
                          Recuperar{" "}
                        </Button>
                      </AvForm>
                      {this.state.loading && (
                        <img
                          style={{ height: "85px", paddingTop: "10px" }}
                          src="/assets/utils/loading.gif"
                          key={0}
                          alt="Loading..."
                        />
                      )}
                    </div>
                  )}
                </AvForm>
              </div>
            </ModalBody>
          </Modal>
          <Modal
            isOpen={this.state.modalVender}
            toggle={this.toggleModalVender}
            size="md"
          >
            <ModalHeader toggle={this.toggleModalVender}>
              ¿Qué tipo de vendedor sos?
            </ModalHeader>
            <ModalBody style={{ padding: "0px" }}>
              <div className="col-md-12">
                {this.renderButton(
                  "rayo",
                  "Publicación inmediata",
                  "1 publicación gratis"
                )}
                {this.renderButton(
                  "llaves",
                  "Soy un particular. Registrate es muy fácil!",
                  "Publicaciones gratis ilimitadas"
                )}
                {this.renderButton(
                  "auto",
                  "Soy un Concesionario",
                  "Publicaciones gratis ilimitadas"
                )}
                {this.renderButton(
                  "comercial",
                  "Soy una comercializadora",
                  "Publicaciones gratis ilimitadas"
                )}
              </div>
            </ModalBody>
          </Modal>
          <Modal
            backdrop={false}
            fade={false}
            isOpen={this.state.searchModal}
            size="lg"
            className="search-modal"
            toggle={this.toggleSearchModal}
          >
            <CreatableSelect
              placeholder={
                <div className="d-flex" style={{ width: "90vw" }}>
                  ¿Qué estas buscando?
                  <img
                    className="ml-auto"
                    src="/assets/utils/icon-search-red.svg"
                  />
                </div>
              }
              onCreateOption={this.submitSearch}
              onChange={(searchText) =>
                this.setState({ searchText }, () =>
                  this.submitSearch(searchText.value)
                )
              }
              formatCreateLabel={(search) => `Buscar: ${search}`}
              styles={customStylesResponsive}
              menuIsOpen
              options={options}
              theme={(theme) => ({
                ...theme,
                borderRadius: 4,
                colors: {
                  ...theme.colors,
                  primary25: "#A0AABF",
                  primary: "#2A3B59",
                },
              })}
            />
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
            message={`Bienvenido ${
              this.state.nameFB
                ? this.state.nameFB
                : getUserDataFromToken().name
            }!`}
            title="Hola!"
            barStyle={{
              backgroundColor: "#48D2A0",
              zIndex: 3000,
              fontSize: "18px",
            }}
            dismissAfter={3500}
            onDismiss={this.toggleNotification}
            onClick={() => this.setState({ isNotificationActive: false })}
          />
        </Row>
      </div>
    );
  }
}
export default Header;

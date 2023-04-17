import React from "react";
import {
  Col,
  Row,
  Label,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button
} from "reactstrap";
// Todo: adapt this
// import { graphql, compose } from "react-apollo";
import { DeleteUserMutation } from "../../graphql/old/UserQuery";
import { getUserToken } from "../../modules/sessionFunctions";
import NotificationModal from "./NotificationModal";
/* eslint react/jsx-filename-extension: 0 */

class SACardUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      deleteUser: false,
      showModal: false,
      modalTitle: "",
      modalMessage: ""
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle(deleteUser) {
    const stateData = {
      modal: !this.state.modal,
      deleteUser
    };
    this.setState(stateData);
  }

  deleteUser() {
    this.props
      .deleteUser({
        variables: {
          MAHtoken: getUserToken(),
          userId: this.props.data.id
        },
        refetchQueries: ["AllUsersResume"]
      })
      .then(() => {
        this.toggle();
        this.setState({
          showModal: true,
          modalTitle: "Hecho",
          modalMessage: "El usuario ha sido eliminado exitosamente."
        });
      })
      .catch(({ graphQLErrors, networkError }) => {
        this.toggle();
        if (graphQLErrors) {
          graphQLErrors.map(({ message }) =>
            this.setState({
              modalTitle: "Error",
              modalMessage: message,
              showModal: true
            })
          );
        }
        if (networkError) {
          this.setState({
            modalTitle: "Error",
            modalMessage: networkError,
            showModal: true
          });
        }
      });
  }
  render() {
    const { data } = this.props;
    return (
      <Col lg="4" md="6" sm="12">
        <div className="card p-4 box-item box-user" style={{ height: "327px" }}>
          <div>
            <div className="data-input-group">
              <h4>{data.agencyName !== null ? data.agencyName : data.name}</h4>
            </div>
            <div className="data-input-group">
              <Label>EMAIL</Label>
              <p className="truncate">
                {data.agencyName !== null ? data.agencyEmail : data.email}
              </p>
            </div>
            <div className="data-input-group">
              <Label>TELEFONO DE CONTACTO</Label>
              <p>
                {data.agencyName !== null
                  ? data.agencyPhone
                  : data.phone || "No especificado."}
              </p>
            </div>
          </div>
          <div className="underline" />
          <div className="row">
            <Button
              className="btn-link-primary float-right"
              color="primary"
              onClick={() => {
                this.toggle(false);
              }}
            >
              VER MÁS
            </Button>
          </div>
          <div className="align-self-end">
           {this.props.data.isAgency && <Button
              className="btn-link-primary float-left"
              style={{ position: "relative", display: "inline" }}
              color="primary"
              onClick={()=>this.props.history.push(`/superAdminMicrosite?u_id=${this.props.data.id}`)}
            >
              <img src="/assets/utils/icon-edit-red.svg" />
            </Button>}
            <Button
              className="btn-link-primary float-left"
              style={{ position: "relative", display: "inline" }}
              color="primary"
              onClick={() => this.toggle(true)}
            >
              <img src="/assets/utils/icon-delete.svg" />
            </Button>
          </div>
        </div>
        <Modal isOpen={this.state.modal} size="lg" toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>
            {this.state.deleteUser
              ? "¿Desea eliminar este usuario?"
              : "Información del usuario"}
          </ModalHeader>
          <ModalBody>
            <div>
              <Col md={12}>
                <Row>
                  <Col md={6}>
                    <Label>
                      {data.agencyName !== null
                        ? "NOMBRE DE LA AGENCIA"
                        : "NOMBRE"}
                    </Label>
                    <p>
                      {data.agencyName !== null ? data.agencyEmail : data.email}
                    </p>
                  </Col>
                  {data.agencyName !== null && (
                    <Col md={6}>
                      <Label>NOMBRE DEL RESPONSABLE</Label>
                      <p>{data.name}</p>
                    </Col>
                  )}
                </Row>
                <Row>
                  <Col md={6}>
                    <Label>
                      {data.agencyName !== null
                        ? "EMAIL DE LA AGENCIA"
                        : "EMAIL"}
                    </Label>
                    <p>
                      {data.agencyName !== null ? data.agencyEmail : data.email}
                    </p>
                  </Col>
                  {data.agencyName !== null && (
                    <Col md={6}>
                      <Label>EMAIL DEL RESPONSABLE</Label>
                      <p>{data.email}</p>
                    </Col>
                  )}
                </Row>
                <Row>
                  <Col md={6}>
                    <Label>
                      {data.agencyName !== null
                        ? "TELÉFONO DE LA AGENCIA"
                        : "TELÉFONO"}
                    </Label>
                    <p>
                      {data.agencyName !== null ? data.agencyPhone : data.phone}
                    </p>
                  </Col>
                  {data.agencyName !== null && (
                    <Col md={6}>
                      <Label>TELÉFONO DEL RESPONSABLE</Label>
                      <p>{data.phone}</p>
                    </Col>
                  )}
                </Row>
                <Row>
                  <Col md={6}>
                    <Label>
                      {data.agencyName !== null
                        ? "DIRECCIÓN DE LA AGENCIA"
                        : "DIRECCIÓN"}
                    </Label>
                    <p>
                      {data.agencyName !== null
                        ? data.agencyAdress
                        : data.address}
                    </p>
                  </Col>
                  {data.agencyName !== null && (
                    <Col md={6}>
                      <Label>DIRECCIÓN DEL RESPONSABLE</Label>
                      <p>{data.address || "No especificado"}</p>
                    </Col>
                  )}
                </Row>
              </Col>
              <br />
              <h5 style={{ paddingLeft: "10px" }}>
                ACERCA DE LAS PUBLICACIONES
              </h5>
              <br />
              <Col md={12}>
                <ul>
                  <li>Publicadas: {data.Publicada}</li>
                  <li>Destacadas: {data.Destacada}</li>
                  <li>Suspendidas: {data.Suspendida}</li>
                  <li>Pendientes: {data.Pendiente}</li>
                </ul>
              </Col>
            </div>
            {this.state.deleteUser ? (
              <span>
                <p style={{ textAlign: "center", fontWeight: 900 }}>
                  ¿Esta seguro que desea eliminar este usuario?{" "}
                </p>
                <p
                  style={{
                    fontWeight: 700,
                    textAlign: "center",
                    margin: "20px",
                    top: "-5px",
                    lineHeight: "25px"
                  }}
                >
                  Recuerde que todas sus publicaciones también serán eliminadas
                  y no podra recuperarlas.
                </p>
              </span>
            ) : (
              <div />
            )}
          </ModalBody>
          <ModalFooter>
            <Button
              color="primary"
              onClick={() =>
                this.state.deleteUser ? this.deleteUser() : this.toggle()
              }
            >
              {this.state.deleteUser ? "ELIMINAR" : "OK"}
            </Button>
          </ModalFooter>
        </Modal>
        <NotificationModal
          primaryText={this.state.modalTitle}
          secondaryText={this.state.modalMessage}
          buttonName="Aceptar"
          showNotificationModal={this.state.showModal}
          handleClose={() =>
            this.setState({ showModal: false }, () => window.location.reload())
          }
        />
      </Col>
    );
  }
}
const withDeleteMutation = graphql(DeleteUserMutation, { name: "deleteUser" });
const withData = compose(withDeleteMutation);

export default withData(SACardUser);

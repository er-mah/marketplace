/* eslint react/jsx-filename-extension: 0 */
/* eslint react/prop-types: 0 */

import React, { Component } from 'react';
import {
  Col,
  Row,
  Button,
  Modal,
  ModalFooter,
  ModalHeader,
  ModalBody,
} from 'reactstrap';
import { parse, stringify } from 'query-string';
import DropzoneComponent from 'react-dropzone-component';
import Gallery from 'react-photo-gallery';
import { Notification } from 'react-notification';

import { getImages, editPublicationWithoutImages } from '../../../modules/fetches';
import AdminBar from '../../../stories/AdminBar';
import { isAdminLogged, getUserToken } from '../../../modules/sessionFunctions';
import { server } from '../../../modules/params';

let myDropzone;

function initCallback(dropzone) {
  myDropzone = dropzone;
}

class StepTwo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      modalBack: false,
      responseMsg: '',
      responseTitle: '',
      disabled: true,
      edit: false,
      previousImages: [],
      isNotificationActive: false,
      notificationMessage: '',
      notificationTitle: '',
    };
    this.toggle = this.toggle.bind(this);
    this.toggleNotification = this.toggleNotification.bind(this);
  }
  componentWillMount() {
    const search = parse(this.props.location.search);
    const DataCar = parse(search.DataCar);
    if (DataCar.publication_id) {
      getImages(DataCar.publication_id).then(({ data }) => {
        const arrayImages = [];
        data.map((image) => {
          arrayImages.push({
            src: `${process.env.REACT_APP_API}/images/${image}`,
            sizes: ['(min-width: 480px) 50vw,(min-width: 1024px) 33.3vw,100vw'],
            width: 4,
            height: 3,
          });
        });
        this.setState({
          disabled: false,
          edit: true,
          previousImages: arrayImages,
        });
      });
    }
  }
  disabled() {
    if (myDropzone) {
      if (myDropzone.files.length !== 0) {
        this.setState({ disabled: false });
        return false;
      }
      this.setState({ disabled: true });
      return false;
    }
    this.setState({ disabled: true });
    return false;
  }

  toggle() {
    this.setState({
      modal: !this.state.modal,
    });
  }
  handleSubmit(dataPublication) {
    this.setState({ disabled: true });
    if (myDropzone.files.length === 0) {
      editPublicationWithoutImages(dataPublication)
        .then((resp) => {
          this.setState({
            modal: true,
            responseMsg: resp.message,
            responseTitle: 'Guardado',
          });
        })
        .catch((e)=>{
          this.setState({
            modal: true,
            responseMsg: e.message,
            responseTitle: 'Error',
          })
        })
    } else {
      myDropzone.processQueue();
    }
  }

  toggleNotification() {
    this.setState({
      isNotificationActive: !this.state.isNotificationActive,
    });
  }

  toggleBack() {
    this.setState({
      modalBack: !this.state.modalBack,
    });
  }

  previous() {
    const search = parse(this.props.location.search);
    const dataCar = {
      DataCar: search.DataCar,
    };
    const dataExtras = {
      Caracteristics: search.Caracteristics,
      TecnicalData: search.TecnicalData,
      Additionals: search.Additionals,
    };
    this.props.history.push(`/createPublicationS1?${stringify(dataCar)}&${stringify(dataExtras)}`);
  }

  render() {
    const postUrl = this.state.edit ? `${server}/editPublication` : `${server}/createPublication`;
    const componentConfig = {
      iconFiletypes: ['.jpg', '.png', '.gif'],
      showFiletypeIcon: true,
      postUrl,
    };

    const search = parse(this.props.location.search);
    const dataCarForm = {
      Caracteristics: parse(search.Caracteristics),
      TecnicalData: parse(search.TecnicalData),
      Additionals: parse(search.Additionals),
      DataCar: parse(search.DataCar),
    };
    const dataPublication = Object.assign(
      {},
      dataCarForm.Caracteristics,
      dataCarForm.TecnicalData,
      dataCarForm.Additionals,
      dataCarForm.DataCar,
    );

    const djsConfig = {
      paramName: () => 'imageGroup',
      addRemoveLinks: true,
      acceptedFiles: 'image/jpeg,image/png,image/gif',
      autoProcessQueue: false,
      maxFiles: 8,
      maxFilesize: 10,
      parallelUploads: 100,
      timeout: 120000,
      uploadMultiple: true,
      dictFileTooBig: 'El archivo es muy grande ({{filesize}}). El tamaño máximo es de {{maxFilesize}}.',
      dictInvalidFileType: 'Formato de archivo incorrecto',
      dictRemoveFile: 'Borrar',
      dictMaxFilesExceeded: 'Solo se pueden subir hasta {{maxFiles}} imágenes',
      dictDefaultMessage:
        'Arrastre aquí las imágenes o haga clic para seleccionarlas.',
      dictFallbackMessage: 'Su navegador no soporta arrastrar imágenes',
      dictCancelUpload: 'Cancelar.',
      dictUploadCanceled: 'Subida cancelada.',
      dictCancelUploadConfirmation:
        '¿Esta seguro que desea cancelar la creación de la publicación?',
      params: dataPublication,
      headers: {
        mimeType: 'multipart/form-data',
        Authorization: `Bearer ${getUserToken()}`,
      },
    };
    const eventHandlers = {
      init: (dropzone) => {
        initCallback(dropzone);
      },
      addedfile: () => {
        this.disabled();
      },
      successmultiple: (_, res) => {
        this.setState({
          modal: true,
          responseTitle: 'Éxito',
          responseMsg: res,
        });
      },
    };
    const dataCar = {
      Caracteristics: stringify(parse(search.Caracteristics)),
      TecnicalData: stringify(parse(search.TecnicalData)),
      Additionals: stringify(parse(search.Additionals)),
      DataCar: stringify(parse(search.DataCar)),
    };
    return (
      <div>
        <AdminBar history={this.props.history} />
        <div className="container-fluid register-steps">
          <Row>
            <Col md="6" sm="12" xs="12" className="bg">
              <div className="col-md-8 float-right">
                <div className="text-block">
                  <h4 className="title-division-primary">Vendé tu auto ya!</h4>
                  <p>En muy simples pasos podés publicar tu auto.</p>
                </div>

                <div className="steps">
                  <div className="step done">
                    <h6>PASO 1</h6>
                    <h4>Contanos de tu auto</h4>
                    <Button
                      className="btn btn-link-primary"
                      onClick={() =>
                        this.props.history.push(`/createPublicationS1?${stringify(dataCar)}`)
                      }
                    >
                      Modificar datos
                    </Button>
                  </div>

                  <div className={`step ${!this.state.disabled ? 'done' : ''}`}>
                    <h6>PASO 2</h6>
                    <h4>Mostralo con fotos</h4>
                    <p className="info">* Mínimo 3 fotos</p>
                  </div>
                </div>
              </div>
            </Col>
            <Col md="6" sm="12" xs="12">
              <div className="col-md-9 float-left">
                <h4 className="title-division">Cómo luce?</h4>
                {this.state.edit && (
                  <div>
                    <p>
                      {' '}
                      Ten en cuenta que las siguientes imágenes se reemplazarán
                      por las que agregues:
                    </p>
                    <Gallery photos={this.state.previousImages} />
                    <div style={{ height: '100px' }} />
                  </div>
                )}
                <DropzoneComponent
                  config={componentConfig}
                  eventHandlers={eventHandlers}
                  djsConfig={djsConfig}
                />
                <div className="underline" />
                <div
                  style={{ width: '100%' }}
                  className="d-flex justify-content-between align-items-center"
                >
                  <Button color="default" onClick={() => this.setState({ modalBack: true })}>Volver</Button>
                  <Button
                    color="primary"
                    disabled={this.state.disabled}
                    onClick={() => this.handleSubmit(dataPublication)}
                  >
                    {this.state.edit ? 'Guardar Cambios' : 'Publicar'}
                  </Button>
                </div>
              </div>
              <Modal isOpen={this.state.modal}>
                <ModalHeader>
                  {this.state.responseTitle}
                </ModalHeader>
                <ModalBody>
                  <div className="col-md-6 offset-md-3">
                    {this.state.responseMsg}
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button
                    color="primary"
                    onClick={() =>
                      (isAdminLogged()
                        ? this.props.history.push('/superAdminPublications?stateName=Pendiente')
                        : this.props.history.push('/userPublications?stateName=Pendiente'))
                    }
                  >
                    OK
                  </Button>
                </ModalFooter>
              </Modal>
              <Modal isOpen={this.state.modalBack} toggle={this.toggleBack}>
                <ModalHeader toggle={this.toggleModal}>¿Estás seguro que deséas volver?</ModalHeader>
                <ModalBody>
                  <div className="col-md-6 offset-md-3">
                    Se perderán las fotos que ya se han cargado.
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button color="default" onClick={() => this.toggleBack()} >NO</Button>
                  <Button color="primary" onClick={() => this.previous()} >SI</Button>
                </ModalFooter>
              </Modal>
            </Col>
          </Row>
        </div>
        <Notification
          isActive={this.state.isNotificationActive}
          message={this.state.notificationMessage}
          title={this.state.notificationTitle}
          barStyle={{
            backgroundColor: '#FFD740', zIndex: 3000, fontSize: '18px', color: 'grey',
          }}
          dismissAfter={false}
          action="Cerrar"
          onDismiss={this.toggleNotification}
          onClick={() => this.setState({ isNotificationActive: false })}
        />
      </div>
    );
  }
}

export default StepTwo;

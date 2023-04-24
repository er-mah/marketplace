/* eslint react/jsx-filename-extension: 0 */
/* eslint react/prop-types: 0 */

import React, { Component } from 'react';
import { Col, Row, Button, Modal, ModalFooter, ModalHeader, ModalBody } from 'reactstrap';
import { parse, stringify } from 'query-string';
import DropzoneComponent from 'react-dropzone-component';
import { Notification } from 'react-notification';


import AdminBar from '../../../pages/_old/AdminBar';
import { server } from '../../../modules/params';
//import ReactPixel from 'react-facebook-pixel';

const fpOptions = {
	autoConfig: true,
  debug: false, 	
};
ReactPixel.init('549275042176385', null, fpOptions);
ReactPixel.pageView();
let myDropzone;

function initCallback(dropzone) {
  myDropzone = dropzone;
}


class StepThree extends Component {
  constructor(props) {
    super(props);
    this.state = {
      disabled: true,
      modalBack: false,
      modal: false,
      responseMsg: '',
      responseTitle: '',
      isNotificationActive: false,
      notificationMessage:'',
      notificationTitle:''
    };
    this.toggle = this.toggle.bind(this);
    this.toggleBack = this.toggleBack.bind(this);
    this.toggleNotification = this.toggleNotification.bind(this);
    
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

  toggleBack() {
    this.setState({
      modalBack: !this.state.modalBack,
    });
  }

  handleSubmit() {
    this.setState({disabled: true})
    const search = parse(this.props.location.search);
    const dataCar = {
      Caracteristics: parse(search.Caracteristics),
      TecnicalData: parse(search.TecnicalData),
      Additionals: parse(search.Additionals),
      DataCar: parse(search.DataCar),
      DataPerson: parse(search.DataPerson),
    };
    const dataPublication = Object.assign({}, dataCar.DataCar, dataCar.DataPerson);

    ReactPixel.track('CompleteRegistration', dataPublication ) 

    myDropzone.processQueue();
/*     setTimeout(()=>{
      this.setState({
        isNotificationActive: true,
        notificationTitle:'Muy lento',
        notificationMessage:'La subida está tardando demasiado, quieres probar con imágenes mas pequeñas?'
      })
    },60000) */
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
    const dataPerson = {
      DataPerson: search.DataPerson,
    };
    this.props.history.push(`/publicateWithoutRegisterS2?${stringify(dataCar)}&${stringify(dataExtras)}&${stringify(dataPerson)}`);
  }

  previousS1() {
    const search = parse(this.props.location.search);
    const dataCar = {
      DataCar: search.DataCar,
    };
    const dataExtras = {
      Caracteristics: search.Caracteristics,
      TecnicalData: search.TecnicalData,
      Additionals: search.Additionals,
    };
    const dataPerson = {
      DataPerson: search.DataPerson,
    };
    this.props.history.push(`/publicateWithoutRegisterS1?${stringify(dataCar)}&${stringify(dataExtras)}&${stringify(dataPerson)}`);
  }
  toggleNotification() {
    this.setState({
      isNotificationActive: !this.state.isNotificationActive,
    });
  }

  render() {
    const componentConfig = {
      iconFiletypes: ['.jpg', '.png', '.gif'],
      showFiletypeIcon: true,
      postUrl: `${server}/createPublication`,
    };

    const search = parse(this.props.location.search);
    const dataCar = {
      Caracteristics: parse(search.Caracteristics),
      TecnicalData: parse(search.TecnicalData),
      Additionals: parse(search.Additionals),
      DataCar: parse(search.DataCar),
      DataPerson: parse(search.DataPerson),
    };
    const dataPublication = Object.assign({}, dataCar.Caracteristics, dataCar.TecnicalData, dataCar.Additionals, dataCar.DataCar, dataCar.DataPerson);

    const djsConfig = {
      paramName: () => 'imageGroup',
      addRemoveLinks: true,
      acceptedFiles: 'image/jpeg,image/png,image/gif',
      autoProcessQueue: false,
      maxFiles: 8,
      parallelUploads: 100,
      timeout: 120000,
      uploadMultiple: true,
      dictInvalidFileType: 'Formato de archivo incorrecto',
      dictRemoveFile: 'Borrar',
      dictMaxFilesExceeded: 'Solo se pueden subir hasta 8 imágenes',
      dictDefaultMessage:
        'Arrastre aquí las imágenes o haga clic para seleccionarlas.',
      dictFallbackMessage: 'Su navegador no soporta arrastrar imágenes',
      dictCancelUpload: 'Cancelar.',
      dictUploadCanceled: 'Subida cancelada.',
      dictCancelUploadConfirmation: '¿Esta seguro que desea cancelar la creación de la publicación?',
      params: dataPublication,
      headers: {
        mimeType: 'multipart/form-data',
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
                    <Button className="btn btn-link-primary" style={{ paddingLeft: 0 }} onClick={() => this.previousS1()} >Modificar datos</Button>
                  </div>

                  <div className="step done">
                    <h6>PASO 2</h6>
                    <h4>Dejá tus datos de contacto para recibir mensajes de los interesados</h4>
                    <Button className="btn btn-link-primary" style={{ paddingLeft: 0 }} onClick={() => this.previous()} >Modificar datos</Button>
                  </div>

                  <div className={`step ${this.state.done ? 'done' : ''}`} >
                    <h6>PASO 3</h6>
                    <h4>Mostralo con fotos</h4>
                    <p className="info">* Mínimo 3 fotos</p>
                  </div>
                </div>
              </div>
            </Col>
            <Col md="6" sm="12" xs="12">
              <div className="col-md-9 float-left">
                <h4 className="title-division">Cómo luce?</h4>
                <DropzoneComponent
                  config={componentConfig}
                  eventHandlers={eventHandlers}
                  djsConfig={djsConfig}
                />
                <div className="underline" />
                <div style={{ width: '100%' }} className="d-flex justify-content-between align-items-center" >
                  <Button color="default" onClick={() => this.setState({ modalBack: true })}>Volver</Button>
                  <Button
                    color="primary"
                    disabled={this.state.disabled}
                    onClick={() => this.handleSubmit()}
                  >Publicar
                  </Button>
                </div>
              </div>
              <Modal isOpen={this.state.modal} toggle={this.toggle}>
                <ModalHeader toggle={this.toggleModal}>{this.state.responseTitle}</ModalHeader>
                <ModalBody>
                  <div className="col-md-6 offset-md-3">
                    {this.state.responseMsg}
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button color="primary" onClick={() => this.props.history.push('/')} >OK</Button>
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
            barStyle={{ backgroundColor: '#FFD740', zIndex: 3000, fontSize: '18px',color:'grey' }}
            dismissAfter={false}
            action="Cerrar"
            onDismiss={this.toggleNotification}
            onClick={() => this.setState({ isNotificationActive: false })}
          />
      </div>
    );
  }
}

export default StepThree;

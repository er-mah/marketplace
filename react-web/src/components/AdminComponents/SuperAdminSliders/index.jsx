import React, { Component, Fragment } from 'react';
import {
  Col,
  Row,
  Label,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';
import ImageCrop from '../../../stories/ImageCrop';
import { Notification } from 'react-notification';


import { getUserToken, isAdminLogged } from '../../../modules/sessionFunctions';
import AdminBar from '../../../stories/AdminBar';
import SuperAdminSideBar from '../../../stories/SuperAdminSideBar';
import { uploadSliders, getSliders, deleteSlider } from '../../../modules/fetches';

class SuperAdminSliders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      slider1: '',
      slider2: '',
      slider3: '',
      slider4: '',
      slider5: '',
      slider6: '',
      previewSlider1: '',
      previewSlider2: '',
      previewSlider3: '',
      previewSlider4: '',
      previewSlider5: '',
      previewSlider6: '',
      modal: false,
      modalTitle: '',
      modalMessage: '',
      loading: false,
      success: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.eraseSlider = this.eraseSlider.bind(this);
    this.toggleNotification = this.toggleNotification.bind(this);
    this.toggle = this.toggle.bind(this);
  }
  componentWillMount() {
    if (!isAdminLogged()) {
      this.props.history.push('/loginAdmin');
    }
    getSliders().then((res) => {
      res.data.map((row) => {
        const sliderImage = `previewSlider${row.id}`;
        this.setState({ [sliderImage]: row.image });
      });
    });
  }
  getSlider(img) {
    return (number) => {
      const sliderToModify = `slider${number}`;
      this.setState({ [sliderToModify]: img });
    };
  }
  toggle() {
    this.setState({
      modal: !this.state.modal,
    });
  }
  toggleNotification() {
    this.setState({
      notification: !this.state.notification,
    });
  }
  handleSubmit(i) {
    this.setState({ loading: true });
    const dataSlider = {
      slider: this.state[`slider${i + (i - 1)}`],
      sliderResponsive: this.state[`slider${i + i}`],
      sliderNumber: i + (i - 1),
    };
    uploadSliders(dataSlider)
      .then((res) => {
        this.setState({
          loading: false,
          notification: true,
        });
      })
      .catch((err) => {
        this.setState({
          loading: false,
          modal: true,
          modalTitle: 'Error',
          modalMessage: err.toString(),
        });
      });
  }
  eraseSlider(number) {
    this.setState({ loading: true });
    deleteSlider(number)
      .then((res) => {
        const sliderDeletedFile = `slider${number}`;
        const sliderDeleted = `previewSlider${number}`;
        this.setState({
          [sliderDeleted]: 'erased',
          [sliderDeletedFile]: '',
          loading: false,
          notification: true,
        });
      })
      .catch((err) => {
        this.setState({
          loading: false,
          modal: true,
          modalTitle: 'Error',
          modalMessage: err.toString(),
        });
      });
  }
  renderCroppers(number) {
    const numberFor = number + 1;
    const cropperArray = [];
    for (let i = 1; i < numberFor; i++) {
      const previewSliderNumber = `previewSlider${i + (i - 1)}`;
      const previewSliderNumberMobile = `previewSlider${i + i}`;
      const sliderFile = `slider${i + (i - 1)}`;
      const sliderFileMobile = `slider${i + i}`;
      cropperArray.push(<div key={i} className="slider-card" >
        <Label className="text-left" >SLIDER {i} </Label>
        <div className="slider-row">
          <div className="col-8">
            <small> (Recomendado 1920 x 560)</small>
            <ImageCrop
              aspectRatio={1920 / 560}
              cropImage={img => this.getSlider(img)(i + (i - 1))}
              previewImage={this.state[previewSliderNumber]}
              banner
            />
            <Row>
              <div className="col-12 d-flex justify-content-end">
                {this.state.loading && (
                  <img
                    style={{ height: '60px' }}
                    src="/assets/utils/loading.gif"
                    key={0}
                    alt="Loading..."
                  />
                )}
                <Button
                  className="btn-link-primary"
                  color="primary"
                  disabled={this.state.loading}
                  onClick={() => this.eraseSlider(i + (i - 1))}
                >
                  Borrar
                </Button>
              </div>
            </Row>
          </div>
          <div className="col-4">
            <small> (Recomendado 480 x 480)</small>
            <ImageCrop
              aspectRatio={480 / 480}
              cropImage={img => this.getSlider(img)(i + i)}
              previewImage={this.state[previewSliderNumberMobile]}
              bannerMobile
            />
            <Row>
              <div className="col-12 d-flex justify-content-end">
                {this.state.loading && (
                  <img
                    style={{ height: '60px' }}
                    src="/assets/utils/loading.gif"
                    key={0}
                    alt="Loading..."
                  />
                )}
                <Button
                  className="btn-link-primary"
                  color="primary"
                  disabled={this.state.loading}
                  onClick={() => this.eraseSlider(i + i)}
                >
                  Borrar
                </Button>
              </div>
            </Row>
          </div>
        </div>
        <div className="underline" style={{ margin: '10px 0px', width: 'auto' }} />
        <Button
          className="btn-link-primary"
          color="primary"
          onClick={() => this.handleSubmit(i)}
          disabled={this.state.loading || this.state[sliderFileMobile] === '' || this.state[sliderFile] === ''}
        >
          Guardar
        </Button>
      </div>);
    }
    return cropperArray;
  }

  render() {
    const { location, history } = this.props;
    return (
      <div>
        <AdminBar history={history} />
        <div className="container-fluid">
          <Row>
            <Col lg="3" md="12">
              <SuperAdminSideBar history={history} location={location} />
            </Col>
            <Col lg="9" md="12" sm="12">
              <div className="d-flex flex-md-row flex-sm-column">
                <Col
                  lg="12"
                  className="container-data-input-group mt-4"
                >
                  <div className="card p-4" style={{ height: '100%' }}>
                    <h6 className="title-division">
                      <b>Sliders</b>
                    </h6>
                    <div className="data-input-group">
                      {this.renderCroppers(3)}
                    </div>
                  </div>
                </Col>
              </div>
            </Col>
          </Row>
        </div>
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
        <Notification
          isActive={this.state.notification}
          message="Cambios guardados"
          dismissAfter={3500}
          onDismiss={this.toggleNotification}
          onClick={() => this.setState({ notification: false })}
        />
      </div>
    );
  }
}

export default SuperAdminSliders;

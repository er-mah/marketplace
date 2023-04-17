import React, { Component } from 'react';
import Cropper from 'react-cropper';
import { Modal, Button, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import _ from 'lodash';
import './ImageCrop.css';
/* eslint react/jsx-filename-extension: 0 */

const defaultSrc = '/default.jpg';
const defaultSrcBanner = '/defaultBanner.png';
const defaultSrcBannerMobile = '/defaultMobile.png';
const invalidFormat = '/formato-no-valido.png';

export default class ImageCrop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      src: props.banner ? defaultSrcBanner : props.bannerMobile ? defaultSrcBannerMobile : defaultSrc,
      cropResult: props.banner ? defaultSrcBanner : props.bannerMobile ? defaultSrcBannerMobile : defaultSrc,
    };
    this.cropImage = this.cropImage.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.previewImage === 'erased') {
      this.setState({
        cropResult: nextProps.banner ? defaultSrcBanner : nextProps.bannerMobile ? defaultSrcBannerMobile : defaultSrc,
      });
    }
    if (_.isNull(this.state.cropResult)) {
      this.setState({
        cropResult: nextProps.banner ? defaultSrcBanner : nextProps.bannerMobile ? defaultSrcBannerMobile : defaultSrc,
      });
    }
    if (nextProps.previewImage !== '' && (this.state.cropResult === defaultSrc || this.state.cropResult === defaultSrcBanner || this.state.cropResult === defaultSrcBannerMobile)) {
      this.setState({
        cropResult: `${process.env.REACT_APP_API}/images/${
          nextProps.previewImage
        }`,
      });
    }
  }

  onChange(e) {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      if (
        files[0].type === 'image/jpeg' ||
        files[0].type === 'image/png' ||
        files[0].type === 'image/jpg'
      ) {
        this.setState({ src: reader.result, cropResult: null });
      } else {
        this.setState({ cropResult: invalidFormat });
      }
    };
    reader.readAsDataURL(files[0]);
  }

  cropImage() {
    if (typeof this.cropper.getCroppedCanvas() === 'undefined') {
      return;
    }
    this.setState({
      cropResult: this.cropper.getCroppedCanvas().toDataURL(),
    });

    this.cropper.getCroppedCanvas().toBlob((blob) => {
      const file = new File([blob], 'imagenRecortada.jpg', {
        type: 'image/jpg',
        lastModified: Date.now(),
      });
      return this.props.cropImage(file);
    }); // Se pasa el archivo al componente que lo llama
  }

  shouldShowSelectImage() {
    const isCropResult = _.isNull(this.state.cropResult);
    if (isCropResult) {
      return false;
    }
    return true;
  }

  shouldShowCropper() {
    const isCropResult = _.isNull(this.state.cropResult);
    if (isCropResult) {
      return true;
    }
    return false;
  }

  render() {
    return (
      <div>
        <div>
          {this.shouldShowSelectImage() && (
            <div>
              <input
                type="file"
                componentclass="input"
                onChange={event => this.onChange(event)}
              />
            </div>
          )}
          <br />
          {this.shouldShowCropper() ? (
            <Modal isOpen size="lg">
              <ModalHeader closebutton="true" >
                Ajuste la imagen.
              </ModalHeader>
              <ModalBody>
                <div className="col-md-10 offset-md-1 text-center">
                  <p style={{ textAlign: 'center' }}>Use la rueda del mouse para hacer zoom y los puntos de las esquinas para ajustar la imagen.</p>
                  <Cropper
                    style={{ height: 400, width: '100%' }}
                    aspectRatio={this.props.aspectRatio}
                    preview=".img-preview"
                    guides={false}
                    src={this.state.src}
                    ref={(cropper) => {
                      this.cropper = cropper;
                    }}
                  />
                </div>
              </ModalBody>
              <ModalFooter>
                <div className="col-3 float-left">
                  <Button
                    color="default"
                    onClick={() =>
                      this.setState({
                        cropResult: this.props.previewImage ?
                         `${process.env.REACT_APP_API}/images/${this.props.previewImage}` : (this.props.banner ? defaultSrcBanner : this.props.bannerMobile ? defaultSrcBannerMobile : defaultSrc),
                      })
                    }
                  >
                    Cancelar
                  </Button>
                </div>
                <div className="col-3 float-right">
                  <Button
                    color="primary"
                    onClick={() => this.cropImage()}
                  >
                    Recortar
                  </Button>
                </div>
              </ModalFooter>
            </Modal>
          ) : (
            <img src={this.state.cropResult} width="100%" alt="preview" />
          )}
        </div>
        <br style={{ clear: 'both' }} />
      </div>
    );
  }
}

/* eslint react/jsx-filename-extension: 0 */
/* eslint react/prop-types: 0 */

import React from 'react';
import { Col, Row, Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

import AdminBar from '../../../stories/AdminBar';
import ReactPixel from 'react-facebook-pixel';

const fpOptions = {
	autoConfig: true,
  debug: false, 	
};
ReactPixel.init('549275042176385', null, fpOptions);
ReactPixel.pageView();
class StepFour extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal,
    });
  }

  render() {
    return (
      <div>
        <AdminBar history={this.props.history} />
        <div className="container-fluid register-steps">
          <Row>
            <Col md="6" sm="12" xs="12" className="bg pb-4">
              <div className="col-md-8 float-right">
                <div className="text-block">
                  <h4 className="title-division-primary">Vendé tu auto ya!</h4>
                  <p>En muy simples pasos podés publicar tu auto.</p>
                </div>

                <div className="steps">
                  <div className="step done">
                    <h6>PASO 1</h6>
                    <h4>Contanos de tu auto</h4>
                    <a className="link">Modificar datos</a>
                  </div>

                  <div className="step done">
                    <h6>PASO 2</h6>
                    <h4>Mostralo con fotos</h4>
                    <a className="link">Modificar datos</a>
                  </div>

                  <div className="step done">
                    <h6>PASO 3</h6>
                    <h4>Dejá tus datos de contacto para recibir mensajes de los interesados</h4>
                    <a className="link">Modificar datos</a>
                  </div>
                </div>

                <Button color="primary" onClick={() => this.toggle()} >Publicar</Button>
              </div>

            </Col>
          </Row>
          <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
            <ModalHeader toggle={this.toggle}>Felicitaciones</ModalHeader>
            <ModalBody>
              <div className="col-md-6 offset-md-3">
              Tu auto se ha publicado correctamente.
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" href="/" >OK</Button>
            </ModalFooter>
          </Modal>
        </div>
      </div>
    );
  }
}

export default StepFour;

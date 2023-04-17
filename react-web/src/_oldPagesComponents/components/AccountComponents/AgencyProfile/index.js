/* eslint react/jsx-filename-extension: 0 */
/* eslint react/prop-types: 0 */

import React from 'react';
import { Col, Row, Button, FormGroup, Label, Input } from 'reactstrap';

import AdminBar from '../../../pages/old/AdminBar';
import AdminSideBar from '../../../pages/AdminSideBar';


class AgencyProfile extends React.Component {
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
        <div className="container-fluid">
          <Row>
            <Col md="3">
              <AdminSideBar history={this.props.history} location={this.props.location} />
            </Col>
            <Col md="9" className="mt-4">
              <Row>
                <Col md="6" className="container-data-input-group">
                  <div className="card p-4" style={{height:`100%`}}>
                    <div className="data-input-group">
                      <label>NOMBRE Y APELLIDO</label>
                      <p>xxx</p>
                    </div>
                    <div className="data-input-group">
                      <label>DNI</label>
                      <p>xxx</p>
                    </div>
                    <div className="data-input-group">
                      <label>DOMICILIO</label>
                      <p>xxx</p>
                    </div>
                    <div className="data-input-group">
                      <label>EMAIL DE CONTACTO</label>
                      <p>xxx</p>
                    </div>
                    <div className="data-input-group">
                      <label>TELEFONO DE CONTACTO</label>
                      <p>xxx</p>
                    </div>

                    <div className="underline"></div>
                    <Button type="primary" className="btn-link-primary align-self-end">
                      <img src="/assets/utils/icon-edit-red.svg" alt="" />
                      Editar
                    </Button>
                  </div>
                </Col>

                <Col md="6" className="container-data-input-group">
                  <div className="card p-4" style={{height:`100%`}}>
                    <h6 className="title-division">¿Quieres cambiar la contraseña?</h6>
                    <FormGroup>
                      <Label for="exampleEmail">Contraseña actual</Label>
                      <Input type="password" name="password" id="exampleText" />
                    </FormGroup>
                    <FormGroup>
                      <Label for="exampleEmail">Nueva Contraseña</Label>
                      <Input type="password" name="password" id="exampleText" />
                    </FormGroup>
                    <FormGroup>
                      <Label for="exampleEmail">Repetir nueva Contraseña</Label>
                      <Input type="password" name="password" id="exampleText" />
                    </FormGroup>
                    <Button type="primary" className="btn-link-primary align-self-end">
                      <img src="/assets/utils/icon-check-red.svg" alt="" />
                      Guardar
                    </Button>
                  </div>

                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default AgencyProfile;

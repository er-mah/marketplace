/* eslint react/jsx-filename-extension: 0 */
/* eslint react/prop-types: 0 */

import React from 'react';
import { Col, Row, Modal, ModalBody, ModalHeader, ModalFooter, Button } from 'reactstrap';
import { stringify, parse } from 'query-string';
import { AvForm, AvGroup, AvField } from 'availity-reactstrap-validation';
import {validate} from '../../../modules/functions';
import {scroller} from 'react-scroll';
import _ from 'lodash';

import RegisterBar from '../../../pages/_old/RegisterBar';
import { registerAgency } from '../../../modules/fetches';


class StepThree extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nameOwner: '',
      nameOwnerValidate: false,
      addressOwner: '',
      addressOwnerValidate: false,
      dniOwner: '',
      dniOwnerValidate: false,
      emailOwner: '',
      emailOwnerValidate: false,
      phoneOwner: '',
      phoneOwnerValidate: false,
      pass: '',
      passValidate: false,
      modal: '',
      modalTitle: '',
      modalText: '',
    };
    this.toggle = this.toggle.bind(this);
    this.submit = this.submit.bind(this);
    
  }

  toggle() {
    this.setState({ modal: !this.state.modal });
  }

  previous() {
    const search = parse(this.props.location.search);

    const dataAgency = {
      email: search.email,
      pass: search.pass,
      repeatPass: search.repeatPass,
      name: search.name,
      phone: search.phone,
      emailAgency: search.emailAgency,
      phoneAgency: search.phoneAgency,
      nameAgency: search.nameAgency,
      addressAgency: search.addressAgency,
    };
    this.props.history.push(`/agencyRegisterS2?${stringify(dataAgency)}}`);
  }

  previousS1() {
    const search = parse(this.props.location.search);

    const dataAgency = {
      email: search.email,
      pass: search.pass,
      repeatPass: search.repeatPass,
      name: search.name,
      phone: search.phone,
      emailAgency: search.emailAgency,
      phoneAgency: search.phoneAgency,
      nameAgency: search.nameAgency,
      addressAgency: search.addressAgency,
    };
    this.props.history.push(`/agencyRegisterS1?${stringify(dataAgency)}}`);
  }

  submit(event, errors) {
    if (!_.isEmpty(errors)) {
      scroller.scrollTo(errors[0], {
        duration: 600,
        smooth: true,
        offset: -100
      });
      return false;
    } 
    const search = parse(this.props.location.search);

    const dataAgency = {
      email: search.email,
      password: this.state.pass,
      name: search.name,
      address: search.address,
      phone: search.phone,
      agencyName: search.nameAgency,
      agencyAdress: search.addressAgency,
      agencyEmail: search.emailAgency,
      agencyPhone: search.phoneAgency,
      ownerName: this.state.nameOwner,
      ownerAddress: this.state.addressOwner,
      ownerDni: this.state.dniOwner,
      ownerEmail: this.state.emailOwner,
      ownerPhone: this.state.phoneOwner,
    };
    registerAgency(dataAgency)
      .then((res) => {
        this.setState({
          modalTitle: 'Felicitaciones',
          modalText: res.message,
          modal: true,
        });
      })
      .catch((err) => {
        console.log(err);
        this.setState({
          modalTitle: 'Error',
          modalText: err,
          modal: true,
        });
      });
  }

  render() {
    return (
      <div>
        <RegisterBar onlyLogin history={this.props.history} />
        <div className="container-fluid register-steps">
          <Row>
            <Col md="6" sm="12" xs="12" className="bg">
              <div className="col-md-8 float-right">
                <div className="text-block">
                  <h4 className="title-division-primary">Creá tu cuenta como Concesionario!</h4>
                  <p>Registrate en muy pocos pasos</p>
                </div>

                <div className="steps">
                  <div className="step done">
                    <h6>PASO 1</h6>
                    <h4>Crear tu cuenta</h4>
                    <Button className="btn btn-link-primary" style={{ paddingLeft: 0 }} onClick={() => this.previousS1()} >Modificar datos</Button>
                  </div>

                  <div className="step done">
                    <h6>PASO 2</h6>
                    <h4>Contanos sobre tu Concesionario</h4>
                    <Button className="btn btn-link-primary" style={{ paddingLeft: 0 }} onClick={() => this.previous()} >Modificar datos</Button>
                  </div>

                  <div className={`step ${this.state.pass !=='' ? 'done' : ''}`}>
                    <h6>PASO 3</h6>
                    <h4>Información del responsable de la Concesionario</h4>
                  </div>

                </div>
                <div className="text-block">
                  <p>Tengo cuenta. <a href="/login" className="link">Iniciar sesión</a> <br />
                  Soy un Particular. <a href="/userRegister" className="link">Registrarme</a>
                  </p>
                </div>

              </div>
            </Col>
            <Col md="6" sm="12" xs="12">
              <div className="col-md-9 float-left pb-4">
                <h4 className="title-division">Información del dueño o responsable del Concesionario </h4>
                <AvForm onSubmit={this.submit}>
                <label>Nombre y Apellido</label>
                <AvField
                  type="text"
                  value={this.state.nameOwner}
                  onChange={event => this.setState({ nameOwner: event.target.value })}
                  className="form-control"
                  validate={validate('string')}
                  name="nameOwner"
                  id="nameOwner"
                />
                  <label>DNI</label>
                <AvField
                  type="number"
                  value={this.state.dniOwner}
                  onChange={event => this.setState({ dniOwner: event.target.value })}
                  className="form-control"
                  validate={validate('number')}
                  name="dniOwner"
                  id="dniOwner"
                />
                  <label>Dirección</label>
                <AvField
                  type="text"
                  value={this.state.addressOwner}
                  onChange={event => this.setState({ addressOwner: event.target.value })}
                  validate={validate('text')}
                  name="addressOwner"
                  id="addressOwner"
                />
                  <label>Email</label>
                <AvField
                  type="email"
                  value={this.state.emailOwner}
                  onChange={event => this.setState({ emailOwner: event.target.value })}
                  validate={validate('email')}
                  name="emailOwner"
                  id="emailOwner"
                />
                  <label>Teléfono</label>
                <AvField
                  type="number"
                  value={this.state.phoneOwner}
                  onChange={event => this.setState({ phoneOwner: event.target.value })}
                  validate={validate('number')}
                  name="phoneOwner"
                  id="phoneOwner"
                />
                <div>
                  <div className="underline" />
                  <label>Contraseña</label>
                  <AvField
                    type="password"
                    value={this.state.pass}
                    onChange={event => this.setState({ pass: event.target.value })}
                    placeholder="Mínimo 6 caracteres"
                    validate={validate('password')}
                    name="pass"
                    id="pass"
                  />
                    <label>Repetir contraseña</label>
                  <AvField
                    type="password"
                    repeatPass
                    value={this.state.repeatPass}
                    onChange={event => this.setState({ repeatPass: event.target.value })}
                    placeholder="Mínimo 6 caracteres"
                    validate={{match:{value:'pass'}}}
                    name="repeatPass"
                    id="repeatPass"
                  />
                  <div className="underline" />

                  <Button color="default" onClick={() => this.previous()} className="float-left" >Volver</Button>
                  <Button color="primary" className="float-right" type="submit">Registrarme</Button>
                </div>
                </AvForm>
              </div>
            </Col>
          </Row>
        </div>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>{this.state.modalTitle}</ModalHeader>
          <ModalBody>
            <div className="col-md-6 offset-md-3">
              {this.state.modalText}
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggle} href={`${this.state.modalTitle === 'Error' ? '#' : '/userAdmin'}`} >OK</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default StepThree;

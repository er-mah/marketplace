/* eslint react/jsx-filename-extension: 0 */
/* eslint react/prop-types: 0 */

import React from 'react';
import { Col, Row, Button } from 'reactstrap';
import { stringify, parse } from 'query-string';
import {scroller} from 'react-scroll';
import ReactGA from 'react-ga';
import _ from 'lodash';
import { AvForm, AvGroup, AvField } from 'availity-reactstrap-validation';
import {validate} from '../../../modules/functions';

import RegisterBar from '../../../pages/_old/RegisterBar';

class StepOne extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: parse(this.props.location.search).email ? parse(this.props.location.search).email : '',
      repeatPass: parse(this.props.location.search).repeatPass ? parse(this.props.location.search).repeatPass : '',
      name: parse(this.props.location.search).name ? parse(this.props.location.search).name : '',
      address: parse(this.props.location.search).address ? parse(this.props.location.search).name : '',
      phone: parse(this.props.location.search).phone ? parse(this.props.location.search).phone : '',
    };
    ReactGA.pageview('/REGISTRO-AGENCIA');
    this.next = this.next.bind(this)
  }

  next(event, errors) {
    if (!_.isEmpty(errors)) {
      scroller.scrollTo(errors[0], {
        duration: 600,
        smooth: true,
        offset: -100
      });
      return false;
    } 
    const dataAgency = {
      email: this.state.email,
      repeatPass: this.state.repeatPass,
      name: this.state.name,
      address: this.state.address,
      phone: this.state.phone,
      nameAgency: parse(this.props.location.search).nameAgency ? parse(this.props.location.search).nameAgency : '',
    };
    return this.props.history.push(`/agencyRegisterS2?${stringify(dataAgency)}`);
  }

  render() {
    return (
      <div>
        <RegisterBar onlyLogin history={this.props.history} />
        <div className="container-fluid register-steps">
          <Row>
            <Col md="6" sm="12" xs="12" className="bg">
              <div className="col-md-9 float-right">
                <div className="text-block">
                  <h4 className="title-division-primary">Creá tu cuenta como Concesionario!</h4>
                  <p>Registrate en muy pocos pasos</p>
                </div>

                <div className="steps">
                  <div className="step">
                    <h6>PASO 1</h6>
                    <h4>Crear tu cuenta</h4>
                    <a className="link">Modificar datos</a>
                  </div>

                  <div className="step disable">
                    <h6>PASO 2</h6>
                    <h4>Contanos sobre tu Concesionario</h4>
                    <a className="link">Modificar datos</a>
                  </div>

                  <div className="step disable">
                    <h6>PASO 3</h6>
                    <h4>Información del responsable de la Concesionario</h4>
                    <a className="link">Modificar datos</a>
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
                <h4 className="title-division">Registrarme</h4>
                <AvForm onSubmit={this.next}>
                <label>Email</label>
                <AvField
                  name="email"
                  id="email"
                  validate={validate('email')}
                  value={this.state.email}
                  onChange={event => this.setState({ email: event.target.value })}
                  type="email"
                  className="form-control"
                />
                <label>Nombre del encargado</label>
                <AvField
                  name="name"
                  id="name"
                  validate={validate('string')}                  
                  value={this.state.name}
                  onChange={event => this.setState({ name: event.target.value })}
                  type="text"
                  className="form-control"
                  
                />
                <label>Domicilio del Encargado</label>
                <AvField
                  name="address"
                  id="address"
                  onChange={event => this.setState({ address: event.target.value })}
                  validate={validate('text')}                  
                  type="text"
                  value={this.state.address}
                  className="form-control"                  
                />
                <label>Teléfono del Encargado</label>
                <AvField
                  name="phone"
                  id="phone"
                  type="number"
                  value={this.state.phone}
                  validate={validate('number')}                                    
                  onChange={event => this.setState({ phone: event.target.value })}
                  className="form-control"                  
                />

                <div>
                  <div className="underline" />
                  <Button color="primary" className="float-right" >Siguiente</Button>
                </div>
                </AvForm>
                
              </div>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default StepOne;

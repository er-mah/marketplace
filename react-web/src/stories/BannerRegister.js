import React from 'react';
import { Row, Button } from 'reactstrap';
import { stringify } from 'query-string';
import ReactGA from 'react-ga';

import { AvForm, AvGroup, AvField } from "availity-reactstrap-validation";
import { validate } from "../modules/functions";
import {scroller} from 'react-scroll';
import _ from 'lodash';

import InputOrText from './InputOrText';

/* eslint react/jsx-filename-extension: 0 */

class BannerRegister extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nameAgency: '',
      nameAgencyValidate: true,
      email: '',
      emailValidate: true,
      text: 'Publicá gratis, todos tus datos y creá tu concesionaria online',
    };
    this.start = this.start.bind(this)
  }
  start(event, errors) {
    if (!_.isEmpty(errors)) {
      scroller.scrollTo(errors[0], {
        duration: 600,
        smooth: true,
        offset: -100
      });
      return false;
    } 

    const dataAgency = {
      nameAgency: this.state.nameAgency,
      email: this.state.email,
    };
    ReactGA.event({
      category: 'Agencia Plans',
      action: 'Ir a Registro Agencia',
    });
    this.props.history.push(`/agencyRegisterS1?${stringify(dataAgency)}`);
  }

  render() {
    return (
      <div className="container-fluid">
        <Row className="banner-home" style={{ background: 'url(/assets/images/image-agency.png) no-repeat center center' }}>
          <div className="container">
            <Row className="align-items-center justify-content-between">
              <div className="col-lg-4 col-md-5 col-sm-12 col-xs-12">
                {this.state.isAdmin ?
                  <InputOrText type="h3" text={this.state.text} onChange={text => this.setState({ text })} />
                :
                  <h3>{this.state.text}</h3>
                }
              </div>
              <div className="container-data-input-group col-lg-4 col-md-5 col-sm-12 col-xs-12 float-right" >
                <div className="cont-form">
                  <h5><strong>¡Registrate gratis y empezá a vender ahora!</strong></h5>
                  <AvForm onSubmit={this.start}>
                  <AvField
                    type="text"
                    value={this.state.nameAgency}
                    onChange={event => this.setState({ nameAgency: event.target.value })}
                    placeholder="Nombre de la concesionaria"
                    name="nameAgency"
                    id="nameAgency"
                    validate={validate("text")}
                    className="form-control"
                  />
                  <AvField
                    type="email"
                    value={this.state.email}
                    onChange={event => this.setState({ email: event.target.value })}
                    placeholder="Correo electrónico"
                    name="email"
                    id="email"
                    validate={validate("email")}
                    className="form-control"
                  />

                  <Button color="primary" className="btn-block" type="submit">Comenzar</Button>
                  </AvForm>
                </div>
              </div>
            </Row>
          </div>

        </Row>
      </div>
    );
  }
}

export default BannerRegister;

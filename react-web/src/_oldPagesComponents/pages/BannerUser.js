import React from 'react';
import { Row, Button } from 'reactstrap';
import { stringify } from 'query-string';
import ReactGA from 'react-ga';

import InputOrText from './InputOrText';
import {scroller} from 'react-scroll';
import _ from 'lodash';

import { AvForm, AvGroup, AvField } from "availity-reactstrap-validation";
import { validate } from "../../modules/functions";
/* eslint react/jsx-filename-extension: 0 */

class BannerUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      emailValidate: true,
      text: 'Publicá gratis, crea tu cuenta y comenzá a ganar dinero vendiendo autos!',
    };
    this.start= this.start.bind(this)
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

    const dataUser = {
      email: this.state.email,
    };
    ReactGA.event({
      category: 'Usuario Plans',
      action: 'Ir a Registro Usuario',
    });
    this.props.history.push(`/userRegisterS1?${stringify(dataUser)}`);
  }

  render() {
    return (
      <div className="container-fluid">
        <Row className="banner-home" style={{ background: 'url(/assets/images/image-user.png) no-repeat center center' }}>
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
                  <h5><strong>¡Registrate gratis!</strong></h5>
                  <AvForm onSubmit={this.start}>
                  <AvField
                    type="email"
                    value={this.state.email}
                    onChange={event => this.setState({ email: event.target.value })}
                    validate={validate('email')}
                    name="email"
                    id="email"
                    className="form-group"
                    placeholder="Correo electrónico"
                  />
                  <Button color="primary" className="btn-block" disabled={!this.state.emailValidate}  type="submit" >Comenzar</Button>
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

export default BannerUser;

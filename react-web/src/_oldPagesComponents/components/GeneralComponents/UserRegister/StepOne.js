/* eslint react/jsx-filename-extension: 0 */
/* eslint react/prop-types: 0 */

import React from 'react';
import { Col, Row, Button, Label } from 'reactstrap';
import { stringify, parse } from 'query-string';
import ReactGA from 'react-ga';
import { AvForm, AvGroup, AvField } from "availity-reactstrap-validation";
import { validate } from "../../../modules/functions";
//import FacebookLogin from 'react-facebook-login';
import {scroller} from 'react-scroll';
import _ from 'lodash';

import RegisterBar from '../../../pages/old/RegisterBar';

import { saveState } from '../../../modules/localStorage';
import { loginOrRegisterFacebook } from '../../../modules/fetches';

class StepOne extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: parse(this.props.location.search).email ? parse(this.props.location.search).email : '',
      emailValidate: parse(this.props.location.search).email,
    };
    ReactGA.pageview('/REGISTRO-USUARIO');
    this.next=this.next.bind(this);
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
    const dataUser = {
      email: this.state.email,
    };
    return this.props.history.push(`/userRegisterS2?${stringify(dataUser)}`);
  }

  loginFB() {
    window.FB.getLoginStatus((response) => {
      window.FB.api('/me', { fields: ['email', 'name'] }, (res) => {
        loginOrRegisterFacebook(res)
          .then((resp) => {
            const MAHtoken = resp.message;
            saveState({ login: { MAHtoken } });
            this.setState({
              isNotificationActive: true,
              email: '',
              password: '',
              isUserLogged: true,
            });
            this.props.history.push('/userAdmin')
          })
          .catch(error => console.log(error));
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
              <div className="col-md-9 float-right">
                <div className="text-block">
                  <h4 className="title-division-primary">Creá tu cuenta como Particular!</h4>
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
                    <h4>Contanos sobre tu concessionaria</h4>
                    <a className="link">Modificar datos</a>
                  </div>

                  <div className="step disable">
                    <h6>PASO 3</h6>
                    <h4>Información del responsable de la concessionaria</h4>
                    <a className="link">Modificar datos</a>
                  </div>
                </div>
              </div>
            </Col>
            <Col md="6" sm="12" xs="12" className="mb-4">
            <AvForm onSubmit={this.next}>
              <div className="col-md-9 float-left">
                <h4 className="title-division">Registrarme</h4>
                <FacebookLogin
                  appId="146328269397173"
                  autoLoad
                  callback={() => this.loginFB()}
                  icon="fa-facebook"
                  fields="name,email,picture"
                  textButton="Registrate con facebook"
                  cssClass="btn btn-primary btn-facebook"
                />
                <div className="underline" />

                <h6>O con tu Email</h6>
                <br />
                <Label>Email</Label>
                <AvField
                  type="email"
                  value={this.state.email}
                  onChange={event => this.setState({ email: event.target.value })}
                  validate={validate('email')}
                  name='email'
                  id='email'
                  className='form-group'
                />
                <div>
                  <div className="underline" />
                  <Button color="primary" className="col-6 float-right" type="submit">Siguiente</Button>
                </div>
              </div>
              </AvForm>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default StepOne;

/* eslint react/jsx-filename-extension: 0 */
/* eslint react/prop-types: 0 */

import React, { Component } from 'react';
import { Col, Row, Button, Label, FormGroup } from 'reactstrap';
import { parse, stringify } from 'query-string';
import { scroller } from 'react-scroll';
import _ from 'lodash';
import Select from 'react-select';

import { AvForm, AvGroup, AvField } from 'availity-reactstrap-validation';
import { validate, prepareArraySelect } from '../../../modules/functions';

import FacebookLogin from 'react-facebook-login';
import { saveState } from '../../../modules/localStorage';
import { loginOrRegisterFacebook, getProvinces, getTowns } from '../../../modules/fetches';

import AdminBar from '../../../stories/AdminBar';

import ReactPixel from 'react-facebook-pixel';

const fpOptions = {
	autoConfig: true,
  debug: false, 	
};
ReactPixel.init('549275042176385', null, fpOptions);
ReactPixel.pageView();
class CreatePublication extends React.Component {
  constructor(props) {
    super(props);
    const search = parse(this.props.location.search);
    this.state = {
      emailForRegister: '',
      name: search.DataPerson ? parse(search.DataPerson).name : '',
      phone: search.DataPerson ? parse(search.DataPerson).phone : '',
      email: search.DataPerson ? parse(search.DataPerson).email : '',
      province_id: search.DataPerson ? parse(search.DataPerson).province_id : 0,
      provinceList: [],
      town_id: search.DataPerson ? parse(search.DataPerson).town_id : 0,
      townList: [],
    };
    this.next = this.next.bind(this);
  }

  componentWillMount() {
    getProvinces()
      .then((response) => {
        this.setState({ provinceList: response.data });
      })
      .catch(error => console.log(error));
  }

  onChangeProvince(newProvince) {
    getTowns(newProvince)
      .then((response) => {
        this.setState({
          province_id: newProvince,
          townList: response.data,
        });
      })
      .catch(error => console.log(error));
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
    const dataPerson = search.DataPerson ? { DataPerson: search.DataPerson } : {
      DataPerson: stringify({
        name: this.state.name,
        phone: this.state.phone,
        email: this.state.email,
      }),
    };
    this.props.history.push(`/publicateWithoutRegisterS1?${stringify(dataCar)}&${stringify(dataExtras)}&${stringify(dataPerson)}`);
  }

  next(event, errors) {
    if (!_.isEmpty(errors)) {
      scroller.scrollTo(errors[0], {
        duration: 600,
        smooth: true,
        offset: -100,
      });
      return false;
    }
    const search = parse(this.props.location.search);
    const dataCar = {
      DataCar: stringify(parse(search.DataCar)),
    };
    const dataExtras = {
      Caracteristics: search.Caracteristics,
      TecnicalData: search.TecnicalData,
      Additionals: search.Additionals,
    };
    const dataPerson = {
      DataPerson: stringify({
        name: this.state.name,
        phone: this.state.phone,
        email: this.state.email,
        province_id: this.state.province_id,
        town_id: this.state.town_id,
      }),
    };
    return this.props.history.push(`/publicateWithoutRegisterS3?${stringify(dataCar)}&${stringify(dataPerson)}&${stringify(dataExtras)}`);
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
            this.props.history.push('/userAdmin');
          })
          .catch(error => console.log(error));
      });
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
                    <Button className="btn btn-link-primary" style={{ paddingLeft: 0 }} onClick={() => this.previous()} >Modificar datos</Button>
                  </div>

                  <div className="step">
                    <h6>PASO 2</h6>
                    <h4>Dejá tus datos de contacto para recibir mensajes de los interesados</h4>
                    <a className="link">Modificar datos</a>
                  </div>

                  <div className="step disable">
                    <h6>PASO 3</h6>
                    <h4>Mostralo con fotos</h4>
                    <p className="info">* Mínimo 3 fotos</p>
                  </div>
                </div>

                <div className="text-block disable-mobile">
                  <h4 className="title-division-primary">Para obtener más beneficios, Registrate!</h4>
                  <ul>
                    <li>Publicaciones gratis ilimitadas</li>
                    <li>Tiempo de publicación: 60 días</li>
                    <li>Posibilidad de compra garantizada si transcurridos los 60 días no vendió su auto</li>
                    <li>Panel de Control de autos publicados</li>
                    <li>Chat con los interesados</li>
                    <li>Anuncios destacados ilimitados</li>
                    <li>Publicaciones en redes sociales</li>
                  </ul>
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
                  <p>O con tu email</p>
                  <AvForm>
                    <FormGroup>
                      <Label for="exampleEmail">Email</Label>
                      <AvField validate={validate('email')} type="email" name="email" id="exampleText" value={this.state.emailForRegister} onChange={e => this.setState({ emailForRegister: e.target.value })} />
                    </FormGroup>
                    <Button color="primary" className="float-right" onClick={() => { this.props.history.push(`/userRegisterS1?email=${this.state.emailForRegister}`); }}>Registrarme</Button>
                  </AvForm>
                </div>
              </div>

            </Col>
            <Col md="6" sm="12" xs="12" className="mb-4">
              <AvForm onSubmit={this.next}>
                <div className="col-md-9 float-left">
                  <h4 className="title-division">Los interesados se comunicarán con vos</h4>
                  <label>Nombre y Apellido</label>
                  <AvField
                    type="string"
                    value={this.state.name}
                    onChange={event => this.setState({ name: event.target.value })}
                    name="name"
                    id="name"
                    validate={validate('string')}
                    className="form-control"
                  />
                  <label>Email</label>
                  <AvField
                    type="email"
                    value={this.state.email}
                    onChange={event => this.setState({ email: event.target.value })}
                    name="email"
                    id="email"
                    validate={validate('email')}
                    className="form-control"
                  />
                  <label>Teléfono</label>
                  <AvField
                    type="number"
                    value={this.state.phone}
                    onChange={event => this.setState({ phone: event.target.value })}
                    name="phone"
                    id="phone"
                    validate={validate('number')}
                    className="form-control"
                  />
                  <FormGroup>
                    <label>Provincia</label>
                    <Select
                      id="province-select"
                      ref={(ref) => { this.select = ref; }}
                      onBlurResetsInput={false}
                      onSelectResetsInput={false}
                      options={prepareArraySelect(this.state.provinceList, 'id', 'name')}
                      simpleValue
                      clearable
                      name="selected-state"
                      value={this.state.province_id}
                      placeholder="Selecciona una provincia"
                      onChange={newValue => this.onChangeProvince(newValue)}
                      searchable
                      noResultsText="No se encontraron resultados"
                    />
                  </FormGroup>
                  <FormGroup>
                    <label>Localidad</label>
                    <Select
                      id="city-select"
                      ref={(ref) => { this.select = ref; }}
                      onBlurResetsInput={false}
                      onSelectResetsInput={false}
                      options={prepareArraySelect(this.state.townList, 'id', 'name')}
                      simpleValue
                      clearable
                      name="selected-state"
                      value={this.state.town_id}
                      placeholder="Selecciona una localidad"
                      onChange={town_id => this.setState({ town_id })}
                      searchable
                      noResultsText="No se encontraron resultados"
                      theme={theme => ({
                        ...theme,
                        borderRadius: 4,
                        colors: {
                        ...theme.colors,
                          primary25: '#A0AABF',
                          primary: '#2A3B59',
                        },
                      })
                      }
                    />
                  </FormGroup>
                  <div>
                    <div className="underline" />
                    <Button color="default" className="float-left" onClick={() => this.previous()} >Volver</Button>
                    <Button color="primary" className="float-right"type="submit" >Siguiente</Button>
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


export default CreatePublication;

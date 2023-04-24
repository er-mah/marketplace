/* eslint react/jsx-filename-extension: 0 */
/* eslint react/prop-types: 0 */

import React from 'react';
import { Col, Row, Button, FormGroup } from 'reactstrap';
import { stringify, parse } from 'query-string';
import { AvForm, AvGroup, AvField } from 'availity-reactstrap-validation';
import { scroller } from 'react-scroll';
import _ from 'lodash';
import Select from 'react-select';



import { validate, prepareArraySelect } from '../../../modules/functions';
import { getProvinces, getTowns } from '../../../modules/fetches';
import RegisterBar from '../../../pages/_old/RegisterBar';


class StepTwo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nameAgency: parse(this.props.location.search).nameAgency ? parse(this.props.location.search).nameAgency : '',
      addressAgency: parse(this.props.location.search).addressAgency ? parse(this.props.location.search).addressAgency : '',
      phoneAgency: parse(this.props.location.search).phoneAgency ? parse(this.props.location.search).phoneAgency : '',
      emailAgency: parse(this.props.location.search).emailAgency ? parse(this.props.location.search).emailAgency : '',
      province_id: 0,
      provinceList: [],
      town_id: 0,
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

    const dataAgency = {
      email: search.email,
      pass: search.pass,
      repeatPass: search.repeatPass,
      name: search.name,
      address: search.address,
      phone: search.phone,
    };
    this.props.history.push(`/agencyRegisterS1?${stringify(dataAgency)}}`);
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

    const dataAgency = {
      email: search.email,
      pass: search.pass,
      repeatPass: search.repeatPass,
      name: search.name,
      phone: search.phone,
      address: search.address,
      emailAgency: this.state.emailAgency,
      phoneAgency: this.state.phoneAgency,
      nameAgency: this.state.nameAgency,
      addressAgency: this.state.addressAgency,
      town_id: this.state.town_id,
      province_id: this.state.province_id,
    };
    return this.props.history.push(`/agencyRegisterS3?${stringify(dataAgency)}`);
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
                    <Button className="btn btn-link-primary" style={{ paddingLeft: 0 }} onClick={() => this.previous()} >Modificar datos</Button>
                  </div>

                  <div className="step">
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
              <AvForm onSubmit={this.next}>
                <div className="col-md-9 float-left pb-4">
                  <h4 className="title-division">Información de la agencia </h4>
                  <label htmlFor="nameAgency">Nombre de la Agencia</label>
                  <AvField
                    name="nameAgency"
                    id="nameAgency"
                    validate={validate('string')}
                    type="text"
                    value={this.state.nameAgency}
                    className="form-control"
                    onChange={event => this.setState({ nameAgency: event.target.value })}
                  />
                  <label htmlFor="addressAgency">Dirección de la Agencia</label>
                  <AvField
                    name="addressAgency"
                    id="addressAgency"
                    validate={validate('text')}
                    className="form-control"
                    value={this.state.addressAgency}
                    onChange={event => this.setState({ addressAgency: event.target.value })}
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
                  <FormGroup>
                    <label>Localidad</label>
                    <Select
                      id="city-select"
                      ref={(ref) => {
                        this.select = ref;
                      }}
                      onBlurResetsInput={false}
                      onSelectResetsInput={false}
                      options={prepareArraySelect(
                        this.state.townList,
                        'id',
                        'name',
                      )}
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
                  <label htmlFor="email">Email de la Agencia</label>
                  <AvField
                    name="email"
                    id="email"
                    validate={validate('email')}
                    type="email"
                    value={this.state.emailAgency}
                    onChange={event => this.setState({ emailAgency: event.target.value })}
                    className="form-control"
                  />
                  <label htmlFor="phoneAgency">Teléfono de la Agencia</label>
                  <AvField
                    name="phoneAgency"
                    id="phoneAgency"
                    validate={validate('number')}
                    type="number"
                    value={this.state.phoneAgency}
                    onChange={event => this.setState({ phoneAgency: event.target.value })}
                    className="form-control"
                  />
                  <div>
                    <div className="underline" />
                    <Button color="default" className="float-left" onClick={() => this.previous()}>Volver</Button>
                    <Button color="primary" className="float-right" type="submit">Siguiente</Button>
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

export default StepTwo;

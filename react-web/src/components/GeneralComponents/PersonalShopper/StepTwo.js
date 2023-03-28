/* eslint react/jsx-filename-extension: 0 */
/* eslint react/prop-types: 0 */

import React from 'react';
import { Col, Row, Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { stringify, parse } from 'query-string';
import ReactGA from 'react-ga';
import {scroller} from 'react-scroll';
import _ from 'lodash';


import { AvForm, AvGroup, AvField } from 'availity-reactstrap-validation';
import {validate} from '../../../modules/functions';

import Header from '../../../stories/Header';
import {requestCredit} from '../../../modules/fetches';

class PersonalShopperS2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      nameValidate: false,
      dni: '',
      dniValidate: false,
      address: '',
      addressValidate: false,
      ganancy: '',
      ganancyValidate: false,
      financyAmount: '',
      financyAmountValidate: false,
      job: '',
      jobValidate: false,
      email: '',
      emailValidate: false,
      phone: '',
      phoneValidate: false,
      messagge: '',
      modalTitle:'',
      modalMessage: '',
      success:false,    
    };
    this.register= this.register.bind(this)
  }

  previous() {
    const search = parse(this.props.location.search);

    const dataShopper = {
      kms: search.kms,
      year: search.year,
      price: search.price,
      brand: search.brand,
      group: search.group,
      codia: search.codia,
      observation: search.observation
    };
    this.props.history.push(`/personalShopperS1?${stringify(dataShopper)}}`);
  }

  register(event, errors) {
    if (!_.isEmpty(errors)) {
      scroller.scrollTo(errors[0], {
        duration: 600,
        smooth: true,
        offset: -100
      });
      return false;
    } 
    const {
      nameValidate, dniValidate, addressValidate, ganancyValidate, financyAmountValidate, jobValidate, emailValidate, phoneValidate,
    } = this.state;

    ReactGA.event({
      category: 'Personal Shopper',
      action: 'Solicitar Personal Shopper',
    });

    const search = parse(this.props.location.search);

    const dataUser = {
      kms: search.kms,
      year: search.year,
      price: search.price,
      brand: search.brand,
      group: search.group,
      codia: search.codia,
      observation: search.observation,
      name: this.state.name,
      dni: this.state.dni,
      address: this.state.address,
      ganancy: this.state.ganancy,
      financyAmount: this.state.address,
      job: this.state.job,
      email: this.state.email,
      phone: this.state.phone,
      personalShopper: true,
    };
    requestCredit(dataUser)
    .then(()=>{
      this.setState({
        modalTitle: 'Listo!',
        modalMessage:'Tu consulta ha sido enviado correctamente. Nos contactaremos a la brevedad para brindarte toda la información necesaria.',
        modal:true,
        success:true,
      })
    })
    .catch((e)=>{
      console.log(e)
      this.setState({
        modalTitle: 'Error',
        modalMessage: 'Tu consulta no se pudo realizar, intenta mas tarde. Discula las molestias',
        modal:true,
      })
    })
  }
  toggle() {
    this.setState({
      modal: !this.state.modal,
    });
  }
  render() {
    return (
      <div>
        <Header history={this.props.history} location={this.props.location} />
        <div className="container-fluid register-steps">
          <Row>
            <Col md="6" sm="12" xs="12" className="bg">
              <div className="col-md-8 float-right">
                <div className="text-block">
                  <h4 className="title-division-primary">¿Cansado de buscar?</h4>
                  <p>En simples pasos contanos lo que buscás y nosotros lo buscamos por vos.</p>
                </div>

                <div className="steps">
                  <div className="step done">
                    <h6>PASO 1</h6>
                    <h4>Contanos lo que buscás</h4>
                    <Button className="btn btn-link-primary" style={{ paddingLeft: 0 }} onClick={() => this.previous()} >Modificar datos</Button>
                  </div>

                  <div className="step">
                    <h6>PASO 2</h6>
                    <h4>Dejá tus datos de contacto para recibir mensajes de los interesados</h4>
                    <a className="link">Modificar datos</a>
                  </div>
                </div>
              </div>
            </Col>
            <Col md="6" sm="12" xs="12">
            <AvForm onSubmit={this.register}>
              <div className="col-md-9 float-left pb-4">
                <h4 className="title-division">Datos del interesado</h4>
                <label>Nombre y Apellido</label>
                <AvField
                  type="text"
                  value={this.state.name}
                  onChange={event => this.setState({ name: event.target.value })}
                  name="name"
                  id="name"
                  validate={validate('string')} 
                  className="form-control"
                />
                  <label>Documento de Identidad</label>
                <AvField
                  type="number"
                  value={this.state.dni}
                  onChange={event => this.setState({ dni: event.target.value })}
                  name="dni"
                  id="dni"
                  validate={validate('number')} 
                  className="form-control"
                />
                  <label>Domicilio</label>
                <AvField
                  type="string"
                  value={this.state.address}
                  onChange={event => this.setState({ address: event.target.value })}
                  name="address"
                  id="address"
                  validate={validate('text')} 
                  className="form-control"
                />
                  <label>Ingresos</label>
                <AvField
                  type="money"
                  value={this.state.ganancy}
                  onChange={event => this.setState({ ganancy: event.target.value })}
                  name="ganancy"
                  id="ganancy"
                  validate={validate('number')} 
                  className="form-control"
                />
                  <label>Monto a financiar</label>
                <AvField
                  type="money"
                  value={this.state.financyAmount}
                  onChange={event => this.setState({ financyAmount: event.target.value })}
                   name="financyAmount"
                  id="financyAmount"
                  validate={validate('number')} 
                  className="form-control"
                />
                  <label>Ocupación</label>
                <AvField
                  type="text"
                  value={this.state.job}
                  onChange={event => this.setState({ job: event.target.value })}
                  name="job"
                  id="job"
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
                  <label>Mensaje</label>
                <AvField
                  type="textarea"
                  value={this.state.messagge}
                  onChange={event => this.setState({ messagge: event.target.value })}
                   name="messagge"
                  id="messagge"
                  validate={validate('text')} 
                  className="form-control"
                />
                <div>
                  <div className="underline" />
                  <Button color="default" className="float-left" onClick={() => this.previous()}>Volver</Button>
                  <Button color="primary" className="float-right" type="submit">Consultar</Button>
                </div>
              </div>
              </AvForm>
            </Col>
          </Row>
          <Modal isOpen={this.state.modal} toggle={this.toggle}>
            <ModalHeader toggle={this.toggle}>{this.state.modalTitle}</ModalHeader>
            <ModalBody>
              <div className="col-md-6 offset-md-3">{this.state.modalMessage}</div>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={()=>{this.state.success? this.props.history.push('/') : this.toggle()}} >OK</Button>
            </ModalFooter>
          </Modal>
        </div>
      </div>
    );
  }
}

export default PersonalShopperS2;

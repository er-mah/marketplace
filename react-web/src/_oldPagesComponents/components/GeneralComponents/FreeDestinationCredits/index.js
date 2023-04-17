/* eslint react/jsx-filename-extension: 0 */
/* eslint react/prop-types: 0 */

import React from 'react';
import {
  Col,
  Row,
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
} from 'reactstrap';
// Todo: adapt this
// import { graphql, compose, withApollo } from 'react-apollo';
import ReactGA from 'react-ga';
import _ from 'lodash';


import {scroller} from 'react-scroll';
import { AvForm, AvGroup, AvField } from 'availity-reactstrap-validation';
import {validate} from '../../../modules/functions';

import Header from '../../Header';
import InputOrText from '../../../pages/old/InputOrText';
import { GetTextsQuery } from '../../../graphql/old/TextsQueries';
import { isAdminLogged } from '../../../modules/sessionFunctions';
import { requestCredit } from '../../../modules/fetches';

class FreeDestinationCredits extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      dni: '',
      address: '',
      ganancy: '',
      financyAmount: '',
      creditReason: '',
      email: '',
      phone: '',
      messagge: '',
      modalTitle: '',
      modalMessage: '',
      success: false,
      title1: '',
      text1: '',
    };
    this.toggle = this.toggle.bind(this);
    ReactGA.pageview('/CREDITOS-LIBRE-DESTINO');
    this.requestCredit= this.requestCredit.bind(this)
  }

  toggle() {
    this.setState({
      modal: !this.state.modal,
    });
  }
  requestCredit(event, errors) {
    if (!_.isEmpty(errors)) {
      scroller.scrollTo(errors[0], {
        duration: 600,
        smooth: true,
        offset: -100
      });
      return false;
    } 
    const dataRequest = {
      name: this.state.name,
      dni: this.state.dni,
      address: this.state.address,
      ganancy: this.state.ganancy,
      financyAmount: this.state.financyAmount,
      creditReason: this.state.creditReason,
      email: this.state.email,
      phone: this.state.phone,
      messagge: this.state.messagge,
    };

    ReactGA.event({
      category: 'Créditos Libre Destino',
      action: 'Solicitar Crédito Libre Destino',
    });

    requestCredit(dataRequest)
      .then(() => {
        this.setState({
          modalTitle: 'Listo!',
          modalMessage: 'Tu consulta ha sido enviado correctamente. Nos contactaremos a la brevedad para brindarte toda la información necesaria.',
          modal: true,
          success: true,
        });
      })
      .catch((e) => {
        console.log(e);
        this.setState({
          modalTitle: 'Error',
          modalMessage: 'Tu consulta no se pudo realizar, intenta mas tarde. Discula las molestias',
          modal: true,
        });
      });
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.Texts.loading) {
      const texts = {};
      texts.fetched = true;
      nextProps.Texts.PageTexts.map(row => (texts[row.section] = row.text));
      this.setState({ ...texts });
    }
  }
  render() {
    return (
      <div>
        <Header
          history={this.props.history}
          location={this.props.location}
        />
        <div className="container-fluid register-steps">
          <Row>
            <Col md="6" sm="12" xs="12" className="bg">
              <div className="col-md-8 float-right">
                {isAdminLogged() ? (
                  this.state.fetched && (
                    <div>
                      <InputOrText
                        section="title1"
                        height="70px"
                        route={this.props.location.pathname.slice(1)}
                        type="p"
                        text={this.state.title1}
                        customClass="title-division-primary"
                        onChange={title1 => this.setState({ title1 })}
                      />
                      <InputOrText
                        section="text1"
                        route={this.props.location.pathname.slice(1)}
                        text={this.state.text1}
                        onChange={text1 => this.setState({ text1 })}
                      />
                    </div>
                  )
                ) : (
                  <div className="text-block">
                    <h4 className="title-division-primary">
                      {this.state.title1}
                    </h4>
                    <p>{this.state.text1}</p>
                  </div>
                )}
                <div className="steps">
                  {isAdminLogged() ? (
                    this.state.fetched && (
                      <div className="step">
                        <InputOrText
                          type="h6"
                          text={this.state.title2}
                          section="title2"
                          height="40px"
                          route={this.props.location.pathname.slice(1)}
                          onChange={title2 => this.setState({ title2 })}
                        />
                        <InputOrText
                          section="text2"
                          height="120px"
                          route={this.props.location.pathname.slice(1)}
                          type="h4"
                          text={this.state.text2}
                          onChange={text2 => this.setState({ text2 })}
                        />
                      </div>
                    )
                  ) : (
                    <div className="step">
                      <h6>{this.state.title2}</h6>
                      <h4>{this.state.text2}</h4>
                    </div>
                  )}
                  {isAdminLogged() ? (
                    this.state.fetched && (
                      <div className="step">
                        <InputOrText
                          section="title3"
                          height="40px"
                          route={this.props.location.pathname.slice(1)}
                          type="h6"
                          text={this.state.title3}
                          onChange={title3 => this.setState({ title3 })}
                        />
                        <InputOrText
                          type="h4"
                          section="text2"
                          height="120px"
                          route={this.props.location.pathname.slice(1)}

                          text={this.state.text2}
                          onChange={text2 => this.setState({ text2 })}
                        />
                      </div>
                    )
                  ) : (
                    <div className="step">
                      <h6>{this.state.title3}</h6>
                      <h4>{this.state.text3}</h4>
                    </div>
                  )}
                </div>
              </div>
            </Col>
            <Col md="6" sm="12" xs="12">
            <AvForm onSubmit={this.requestCredit}>
              <div className="col-md-9 float-left pb-4">
                <h4 className="title-division">Solicitá tu crédito!</h4>
                <label>Nombre y Apellido</label>
                <AvField
                  type="text"
                  value={this.state.name}
                  onChange={event =>
                    this.setState({ name: event.target.value })
                  }
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
                  type="alphanumeric"
                  value={this.state.address}
                  onChange={event =>
                    this.setState({ address: event.target.value })
                  }
                  name="address"
                  id="address"
                  validate={validate('string')} 
                  className="form-control"
                />
                <label>Ingresos</label>
                <AvField
                  type="number"
                  value={this.state.ganancy}
                  onChange={event =>
                    this.setState({ ganancy: event.target.value })
                  }
                  name="ganancy"
                  id="ganancy"
                  validate={validate('number')} 
                  className="form-control"
                  
                />
                <label>Monto a financiar</label>
                <AvField
                  type="number"
                  value={this.state.financyAmount}
                  onChange={event =>
                    this.setState({ financyAmount: event.target.value })
                  }
                  name="financyAmount"
                  id="financyAmount"
                  validate={validate('number')} 
                  className="form-control"
                />
                <label>Destino del crédito</label>
                <AvField
                  type="text"
                  value={this.state.creditReason}
                  onChange={event =>
                    this.setState({ creditReason: event.target.value })
                  }
                  name="creditReason"
                  id="creditReason"
                  validate={validate('string')} 
                  className="form-control"
                />
                <label>Email</label>
                <AvField
                  type="email"
                  value={this.state.email}
                  onChange={event =>
                    this.setState({ email: event.target.value })
                  }
                  name="email"
                  id="email"
                  validate={validate('email')} 
                  className="form-control"
                />
                <label>Teléfono</label>
                <AvField
                  type="number"
                  value={this.state.phone}
                  onChange={event =>
                    this.setState({ phone: event.target.value })
                  }
                  name="phone"
                  id="phone"
                  validate={validate('number')} 
                  className="form-control"
                />
                <label>Mensaje</label>
                <AvField
                  type="textarea"
                  value={this.state.messagge}
                  onChange={event =>
                    this.setState({ messagge: event.target.value })
                  }
                  name="messagge"
                  id="messagge"
                  className="form-control"
                />
                <Button color="primary" className="float-right" type="submit" >
                  Solicitar
                </Button>
              </div>
            </AvForm>
            </Col>
          </Row>
          <Modal isOpen={this.state.modal} toggle={this.toggle}>
            <ModalHeader toggle={this.toggle}>
              {this.state.modalTitle}
            </ModalHeader>
            <ModalBody>
              <div className="col-md-6 offset-md-3">
                {this.state.modalMessage}
              </div>
            </ModalBody>
            <ModalFooter>
              <Button
                color="primary"
                onClick={() => { this.state.success ? this.props.history.push('/') : this.toggle(); }}
              >
                OK
              </Button>
            </ModalFooter>
          </Modal>
        </div>
      </div>
    );
  }
}
const withTextsQuery = graphql(GetTextsQuery, {
  options: { variables: { route: 'freeDestinationCredits' } },
  name: 'Texts',
});
const withData = compose(withTextsQuery);

export default withApollo(withData(FreeDestinationCredits));

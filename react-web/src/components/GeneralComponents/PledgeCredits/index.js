/* eslint react/jsx-filename-extension: 0 */
/* eslint react/prop-types: 0 */

import React from "react";
import {
  Col,
  Row,
  Label,
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader
} from "reactstrap";
import Slider from "react-rangeslider";
import _ from "lodash";
import { parse } from "query-string";
import { graphql, compose } from "react-apollo";
import { P } from "glamorous";
import ReactGA from "react-ga";
import {scroller} from 'react-scroll';
import { hotjar } from "react-hotjar";


import { AvForm, AvGroup, AvField } from 'availity-reactstrap-validation';
import {validate} from '../../../modules/functions';

import Header from "../../../stories/Header";
import { thousands } from "../../../modules/functions";
import InputOrText from "../../../stories/InputOrText";
import { GetTextsQuery } from "../../../apolloQueries/TextsQueries";
import { RatesQuery } from "../../../apolloQueries/RatesQuery";
import { isAdminLogged } from "../../../modules/sessionFunctions";
import { requestCredit } from "../../../modules/fetches";

class PledgeCredits extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      time: 12,
      mount: "",
      fee: "",
      name: "",
      dni: "",
      address: "",
      ganancy: "",
      financyAmount: "",
      creditReason: "",
      email: "",
      phone: "",
      messagge: "",
      modal: false,
      modalMessage: "",
      ratesAfter2008: [],
      ratesBefore2008:[],
      afterYearSwitch: false,
      fetched: false,
      success: false
    };
    this.toggle = this.toggle.bind(this);
    this.requestCredit = this.requestCredit.bind(this);
  }
  componentWillMount(){
    hotjar.initialize(916734, 6)
  }
  componentWillReceiveProps(nextProps) {
    ReactGA.pageview("/CREDITOS-PRENDARIOS");
    if (!nextProps.Texts.loading) {
      const texts = {};
      texts.fetched = true;
      nextProps.Texts.PageTexts.map(row => (texts[row.section] = row.text));
      this.setState({ ...texts });
    }
    if (!nextProps.rates.loading) {
      const ratesAfter2008 = [];
      const ratesBefore2008 = [];
      nextProps.rates.AllRates.map((row)=>{
        _.startsWith(row.period, '2008') ? ratesAfter2008.push(row) : ratesBefore2008.push(row);
      })

      this.setState({
        ratesAfter2008,
        ratesBefore2008,
      });
    }
  }
  toggle() {
    this.setState({
      modal: !this.state.modal
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
    const {
      nameValidate,
      dniValidate,
      addressValidate,
      ganancyValidate,
      financyAmountValidate,
      creditReasonValidate,
      emailValidate,
      phoneValidate
    } = this.state;
    ReactGA.event({
      category: "Crédito Prendario",
      action: "Solicitar Crédito Prendario"
    });

    const dataRequest = {
      name: this.state.name,
      dni: this.state.dni,
      address: this.state.address,
      ganancy: this.state.ganancy,
      financyAmount: this.state.financyAmount,
      creditReason: this.state.creditReason,
      email: this.state.email,
      phone: this.state.phone,
      message: this.state.messagge
    };

  requestCredit(dataRequest)
      .then(() => {
        this.setState({
          modalTitle: "Listo!",
          modalMessage:
            "Tu consulta ha sido enviado correctamente. Nos contactaremos a la brevedad para brindarte toda la información necesaria.",
          modal: true,
          success: true
        });
      })
      .catch(e => {
        console.log(e);
        this.setState({
          modalTitle: "Error",
          modalMessage:
            "Tu consulta no se pudo realizar, intenta mas tarde. Discula las molestias",
          modal: true
        });
      });
  }

  updateTime(time,) {
    if(time){
      this.setState({ time });
      this.simulateFee(time, parseFloat(this.state.mount));
    }else{
      this.simulateFee(this.state.time, parseFloat(this.state.mount));
    }
  }

  updateMount(mount) {
    if (mount === 0 || mount === "") {
      this.setState({ mount, mountValidate: false });
    }
    const re = /^\d+$/;
    if (re.test(mount) === true) {
      if (mount > 0) {
        this.setState({ mount, mountValidate: true });
      }
    }
    this.simulateFee(this.state.time, mount);
  }

  simulateFee(time, mount) {
    const getTasa = () =>{
      if (
       ( this.props.location.search !== "" &&
        parse(this.props.location.search).year > 2008)
        || this.state.afterYearSwitch===true
      ) {
        const selectedRate = _.find(this.state.ratesAfter2008, (row)=>row.term === time)
        return selectedRate.rate;
      } else {
        const selectedRate = _.find(this.state.ratesBefore2008, (row)=>row.term === time)
        return selectedRate.rate;
      }
    }
    const preresult = 1 + time * getTasa(time);
    const preresult1 = preresult * parseFloat(mount);
    const fee = preresult1 / time;
    return this.setState({ fee });
  }

  render() {
    const dataPublication =
      this.props.location.search === ""
        ? ""
        : parse(this.props.location.search);
    const labels = {
      12: "12",
      18: "18",
      24: "24",
      36: "36"
    };
    const fillStyle = { backgroundColor: "#e70404" };
    let multipleLines = ["..."];
    if (this.state.fetched) {
      multipleLines = this.state.text5.split(/\n/);
    }
    return (
      <div>
        <Header
          history={this.props.history}
          location={this.props.location}
        />
        <div className="container-fluid register-steps">
          <Row>
            <Col md="6" sm="12" xs="12" className="bg">
              <div className="col-md-12 col-sm-12 col-lg-8 float-right">
                {isAdminLogged() ? (
                  this.state.fetched && (
                    <div>
                      <InputOrText
                        type="p"
                        section="title1"
                        route={this.props.location.pathname.slice(1)}
                        text={this.state.title1}
                        customClass="title-division-primary"
                        onChange={title1 => this.setState({ title1 })}
                      />
                      <InputOrText
                        text={this.state.text1}
                        section="text1"
                        route={this.props.location.pathname.slice(1)}
                        onChange={text1 => this.setState({ text1 })}
                      />
                      <div className="steps">
                        <div className="step">
                          <InputOrText
                            type="h6"
                            section="title2"
                            height="35px"
                            route={this.props.location.pathname.slice(1)}
                            text={this.state.title2}
                            onChange={title2 => this.setState({ title2 })}
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

                        <div className="step">
                          <InputOrText
                            type="h6"
                            section="title3"
                            height="35px"
                            route={this.props.location.pathname.slice(1)}
                            text={this.state.title3}
                            onChange={title3 => this.setState({ title3 })}
                          />
                          <InputOrText
                            type="h4"
                            section="text3"
                            route={this.props.location.pathname.slice(1)}
                            text={this.state.text3}
                            onChange={text3 => this.setState({ text3 })}
                          />
                        </div>
                      </div>
                    </div>
                  )
                ) : (
                  <div>
                    <div className="text-block">
                      <h4 className="title-division-primary">
                        {this.state.title1}
                      </h4>
                    </div>
                    <div className="text-block">
                      <p>{this.state.text1}</p>
                    </div>
                    <div className="steps">
                      <div className="step">
                        <h6>{this.state.title2}</h6>
                        <h4>{this.state.text2}</h4>
                      </div>

                      <div className="step">
                        <h6>{this.state.title3}</h6>
                        <h4>{this.state.text3}</h4>
                      </div>
                    </div>
                  </div>
                )}

                <h6>SIMULÁ TU CUOTA</h6>
                <div className="simulator-container">
                  <Label> Monto a financiar *</Label>
                  <div className="form-group">
                    <input
                      type="number"
                      value={this.state.mount}
                      className="form-control"
                      onChange={event => this.updateMount(event.target.value)}
                      placeholder="De $10.000 a $150.000"
                    />
                  </div>
                  {!this.props.location.search && (
                    <div className="d-flex flex-row align-items-center">
                      <Label>¿Modelo posterior a 2007?</Label>
                      <div class="onoffswitch">
                        <input
                          type="checkbox"
                          name="onoffswitch"
                          className="onoffswitch-checkbox"
                          onChange={(e)=>{
                            this.setState({afterYearSwitch: e.target.checked},()=>{
                              this.updateTime()
                            })
                          }}
                          id="0km"
                        />
                        <label class="onoffswitch-label" id="0km" for="0km">
                          <span class="onoffswitch-inner" />
                          <span class="onoffswitch-switch" />
                        </label>
                      </div>
                    </div>
                  )}
                  <Label for="exampleEmail">Cantidad de cuotas</Label>
                  <Slider
                    min={12}
                    max={36}
                    step={6}
                    labels={labels}
                    value={this.state.time}
                    orientation="horizontal"
                    fillStyle={fillStyle}
                    onChange={time => this.updateTime(time)}
                  />
                  {this.state.mountValidate && (
                    <div className="d-flex flex-column align-items-center price-container">
                      <h2>
                        <b>$ {_.ceil(this.state.fee, 2)}</b>
                      </h2>
                      <h6>TU CUOTA</h6>
                    </div>
                  )}
                </div>

                {isAdminLogged() ? (
                  this.state.fetched && (
                    <small>
                      <InputOrText
                        section="text4"
                        height="80px"
                        route={this.props.location.pathname.slice(1)}
                        type="h6"
                        text={this.state.text4}
                        onChange={text4 => this.setState({ text4 })}
                      />
                      <InputOrText
                        section="text5"
                        height="430px"
                        multiple
                        route={this.props.location.pathname.slice(1)}
                        text={this.state.text5}
                        customClass="small-letter"
                        onChange={text5 => this.setState({ text5 })}
                      />
                    </small>
                  )
                ) : (
                  <small>
                    <h6>{this.state.text4}</h6>
                    {multipleLines.map(row => (
                      <p className="small-letter">{row}</p>
                    ))}
                  </small>
                )}
              </div>
            </Col>
            <Col md="6" sm="12" xs="12">
              <form>
                <div className="col-md-9 float-left pb-4">
                  {dataPublication !== "" && (
                    <div className="d-flex flex-column box-detail-car">
                      <h6>
                        <b>
                          {`${dataPublication.brand} ${dataPublication.group} `}{" "}
                        </b>
                      </h6>
                      <h6>{dataPublication.modelName}</h6>
                      <h5>
                        <b>
                          {dataPublication.price
                            ? `$ ${thousands(
                                dataPublication.price,
                                2,
                                ",",
                                "."
                              )}`
                            : "Consultar"}
                        </b>
                      </h5>
                      <h6>{`${dataPublication.year} - ${thousands(
                        dataPublication.kms,
                        0,
                        ",",
                        "."
                      )} km`}</h6>
                    </div>
                  )}
                  <div className="underline" />

                  <h4 className="title-division">Solicitá tu crédito!</h4>
                  <AvForm onSubmit={this.requestCredit}>
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
                    onChange={event =>
                      this.setState({ dni: event.target.value })
                    }
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
                    validate={validate('text')} 
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
                    type="string"
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
                  <Button
                    color="primary"
                    className="float-right"
                    type="submit"
                  >
                    Solicitar
                  </Button>
                  </AvForm>
                </div>
              </form>
            </Col>
          </Row>
          <Modal isOpen={this.state.modal} toggle={this.toggle}>
            <ModalHeader toggle={this.toggleModal}>
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
                onClick={() => {
                  this.state.success
                    ? this.props.history.push("/")
                    : this.toggle();
                }}
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
  options: { variables: { route: "pledgeCredits" } },
  name: "Texts"
});
const withRatesQuery = graphql(RatesQuery, { name: "rates" });
const withData = compose(withTextsQuery, withRatesQuery);

export default withData(PledgeCredits);

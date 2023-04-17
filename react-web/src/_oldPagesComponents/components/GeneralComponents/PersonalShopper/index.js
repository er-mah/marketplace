/* eslint react/jsx-filename-extension: 0 */
/* eslint react/prop-types: 0 */

import React from "react";
import { Col, Row, FormGroup, Label, Button } from "reactstrap";
// Todo: adapt this
// import { graphql, compose, withApollo } from "react-apollo";
import { stringify, parse } from "query-string";
import _ from "lodash";
import Select from "react-select";
import ReactGA from "react-ga";
import { scroller } from "react-scroll";

import { AvForm, AvGroup, AvField } from "availity-reactstrap-validation";
import { validate } from "../../../modules/functions";

import Header from "../../Header";
import InputOrText from "../../../pages/old/InputOrText";

import { GetTextsQuery } from "../../../graphql/old/TextsQueries";
import {
  AllBrandsQuery,
  GroupsQuery,
  ModelsQuery
} from "../../../graphql/old/TautosQuery";
import {
  prepareArraySelect,
  generateYearArray
} from "../../../modules/functions";
import { isAdminLogged } from "../../../modules/sessionFunctions";

class PersonalShopper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      kms: "0km",
      year: 2018,
      price: "",
      priceValidate: false,
      brand: "",
      group: "",
      codia: "",
      carError: false,
      Groups: [],
      Models: [],
      observation: "",
      title1: "",
      text1: ""
    };
    this.next = this.next.bind(this);
    ReactGA.pageview("/PERSONAL-SHOPPER");
  }
  componentWillReceiveProps(nextProps) {
    if (!nextProps.Texts.loading) {
      const texts = {};
      texts.fetched = true;
      nextProps.Texts.PageTexts.map(row => (texts[row.section] = row.text));
      this.setState({ ...texts });
    }
  }

  onChangeBrand(newBrand) {
    this.setState({
      brand: newBrand,
      group: "",
      codia: "",
      Models: []
    });
    this.props.client
      .query({
        query: GroupsQuery,
        variables: {
          gru_nmarc: newBrand
        }
      })
      .then(response => this.setState({ Groups: response.data.Group }));
  }

  onChangeGroup(newGroup) {
    this.setState({
      group: newGroup
    });
    this.props.client
      .query({
        query: ModelsQuery,
        variables: {
          ta3_nmarc: this.state.brand,
          ta3_cgrup: newGroup
        }
      })
      .then(response => this.setState({ Models: response.data.Models }));
  }

  onChangeModel(newModel) {
    this.setState({ codia: newModel });
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
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
    if (this.state.brand === "") {
      this.setState({carError:true})
      scroller.scrollTo("brand-select", {
        duration: 600,
        smooth: true,
        offset: -100
      });
      return false;
    }
    if (this.state.group === "") {
      this.setState({carError:true})      
      scroller.scrollTo("groups-select", {
        duration: 600,
        smooth: true,
        offset: -100
      });
      return false;
    }
    if (this.state.codia === "") {
      this.setState({carError:true})      
      scroller.scrollTo("models-select", {
        duration: 600,
        smooth: true,
        offset: -100
      });
      return false;
    }

    const { priceValidate, brand, group, codia } = this.state;

    const dataCredit = {
      kms: this.state.kms,
      year: this.state.year,
      price: this.state.price || "No especificado",
      brand: this.state.brand,
      group: this.state.group,
      codia: this.state.codia,
      observation: this.state.observation
    };
    return this.props.history.push(
      `/personalShopperS2?${stringify(dataCredit)}`
    );
  }

  render() {
    const {
      ta3AllBrands: { AllBrands }
    } = this.props;
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
                        height="50px"
                        route={this.props.location.pathname.slice(1)}
                        type="h4"
                        text={this.state.title1}
                        onChange={title1 => this.setState({ title1 })}
                      />
                      <InputOrText
                        section="text1"
                        height="80px"
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
                  <div className="step">
                    <h6>PASO 1</h6>
                    <h4>Contanos lo que buscás</h4>
                    <a className="link">Modificar datos</a>
                  </div>

                  <div className="step disable">
                    <h6>PASO 2</h6>
                    <h4>
                      Dejá tus datos de contacto para recibir mensajes de los
                      interesados
                    </h4>
                    <a className="link">Modificar datos</a>
                  </div>
                </div>
              </div>
            </Col>
            <Col md="6" sm="12" xs="12">
              <div className="col-md-9 float-left pb-4">
                <h4 className="title-division">
                  Datos del auto que comprarías
                </h4>
                <AvForm onSubmit={this.next}>
                  <FormGroup>
                    <Label for="exampleEmail">Cantidad de kilómetros</Label>
                    <Select
                      id="kms-select"
                      ref={ref => {
                        this.select = ref;
                      }}
                      onBlurResetsInput={false}
                      autoFocus
                      clearable={false}
                      onSelectResetsInput={false}
                      options={[
                        { value: "0km", label: "0km" },
                        { value: "1km - 25.000km", label: "1km - 25.000km" },
                        {
                          value: "25.000km - 50.000km",
                          label: "25.000km - 50.000km"
                        },
                        {
                          value: "50.000km - 100.000km",
                          label: "50.000km - 100.000km"
                        },
                        { value: "Más de 100.000km", label: "Más de 100.000km" }
                      ]}
                      simpleValue
                      name="selected-state"
                      value={this.state.kms}
                      onChange={newValue => this.setState({ kms: newValue })}
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
                    <Label for="exampleEmail">Año</Label>
                    <Select
                      id="year-select"
                      ref={ref => {
                        this.select = ref;
                      }}
                      onBlurResetsInput={false}
                      autoFocus
                      clearable={false}
                      onSelectResetsInput={false}
                      options={generateYearArray()}
                      simpleValue
                      name="selected-state"
                      value={this.state.year}
                      onChange={newValue => this.setState({ year: newValue })}
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
                  <label>Precio aproximado</label>
                  <AvField
                    type="money"
                    placeholder="Ingrese un número sin puntos ni comas"
                    value={this.state.price}
                    onChange={event =>
                      this.setState({ price: event.target.value })
                    }
                    name="price"
                    id="price"
                    validate={validate("number")}
                    className="form-control"
                  />
                  <div className="simulator-container" style={{border: this.state.carError ? 'solid 1px red': ''}}>
                    <div>
                    {this.state.carError && <div><div style={{color:'red'}}>Por favor completa estos campos</div><br/></div>}
                      <FormGroup>
                        <Label for="exampleSelect">¿Cuál es la marca?</Label>
                        <Select
                          id="brand-select"
                          name="brand-select"
                          ref={ref => {
                            this.select = ref;
                          }}
                          onBlurResetsInput={false}
                          onSelectResetsInput={false}
                          options={prepareArraySelect(
                            AllBrands,
                            "ta3_nmarc",
                            "ta3_marca"
                          )}
                          simpleValue
                          clearable
                          name="selected-state"
                          value={this.state.brand}
                          placeholder="Selecciona una marca"
                          onChange={newValue => this.onChangeBrand(newValue)}
                          searchable
                          required
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
                        <Label for="exampleSelect">¿Cuál es el modelo?</Label>
                        <Select
                          id="groups-select"
                          name="groups-select"
                          ref={ref => {
                            this.select = ref;
                          }}
                          onBlurResetsInput={false}
                          onSelectResetsInput={false}
                          options={prepareArraySelect(
                            this.state.Groups,
                            "gru_cgrup",
                            "gru_ngrup"
                          )}
                          simpleValue
                          clearable
                          name="selected-state"
                          value={this.state.group}
                          placeholder="Selecciona un modelo"
                          onChange={newValue => this.onChangeGroup(newValue)}
                          searchable
                          required
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
                        <Label for="exampleSelect">¿Cuál es la versión?</Label>
                        <Select
                          id="models-select"
                          name="models-select"
                          ref={ref => {
                            this.select = ref;
                          }}
                          onBlurResetsInput={false}
                          onSelectResetsInput={false}
                          options={prepareArraySelect(
                            this.state.Models,
                            "ta3_codia",
                            "ta3_model"
                          )}
                          simpleValue
                          clearable
                          name="selected-state"
                          value={this.state.codia}
                          placeholder="Selecciona un tipo"
                          onChange={newValue => this.onChangeModel(newValue)}
                          searchable
                          required
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
                    </div>
                    {/* <Button color="secondary"> Añadir otro</Button> */}
                  </div>
                  <label>Descripción</label>
                  <AvField
                    type="textarea"
                    name="observation"
                    id="observation"
                    value={this.state.observation}
                    onChange={event =>
                      this.setState({ observation: event.target.value })
                    }
                  />
                  <Button color="primary" type="submit" className="float-right">
                    {" "}
                    Siguiente
                  </Button>
                </AvForm>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

const WithAllBrands = graphql(AllBrandsQuery, {
  name: "ta3AllBrands"
});
const withTextsQuery = graphql(GetTextsQuery, {
  options: { variables: { route: "personalShopperS1" } },
  name: "Texts"
});

const withData = compose(WithAllBrands, withTextsQuery);

export default withApollo(withData(PersonalShopper));

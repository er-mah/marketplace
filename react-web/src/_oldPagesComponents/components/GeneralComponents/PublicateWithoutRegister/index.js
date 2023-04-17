/* eslint react/jsx-filename-extension: 0 */
/* eslint react/prop-types: 0 */

import React from 'react';
import { Col, Row, FormGroup, Label, Button } from 'reactstrap';
// Todo: adapt this
// import { graphql, compose, withApollo } from 'react-apollo';
import { stringify, parse } from 'query-string';
import { find, isEmpty } from 'lodash';
import Select from 'react-select';
import ReactGA from 'react-ga';
import { scroller } from 'react-scroll';

import AdminBar from '../../../pages/old/AdminBar';

import { AvForm, AvGroup, AvField } from 'availity-reactstrap-validation';
import { validate } from '../../../modules/functions';

import {
  AllBrandsQuery,
  GroupsQuery,
  ModelsQuery,
  YearsQuery,
} from '../../../graphql/old/TautosQuery';
import {
  prepareArraySelect,
  thousands,
  generateYearArray,
} from '../../../modules/functions';
//import ReactPixel from 'react-facebook-pixel';

const fpOptions = {
  autoConfig: true,
  debug: false,
};
ReactPixel.init('549275042176385', null, fpOptions);
ReactPixel.pageView();

class PublicateWithoutRegister extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      carState:
        this.props.location.search === ''
          ? 'Nuevo'
          : parse(this.props.location.search).carState,
      brand:
        this.props.location.search === ''
          ? ''
          : parse(this.props.location.search).brandId,
      group:
        this.props.location.search === ''
          ? ''
          : parse(this.props.location.search).groupId,
      codia:
        this.props.location.search === ''
          ? ''
          : parse(this.props.location.search).codia,
      brandName:
        this.props.location.search === ''
          ? ''
          : parse(this.props.location.search).brand,
      groupName:
        this.props.location.search === ''
          ? ''
          : parse(this.props.location.search).group,
      modelName:
        this.props.location.search === ''
          ? ''
          : parse(this.props.location.search).modelName,
      year:
        this.props.location.search === ''
          ? ''
          : parse(this.props.location.search).year,
      kms:
        this.props.location.search === ''
          ? ''
          : parse(this.props.location.search).kms,
      kmsValidate: !(this.props.location.search === ''),
      price:
        this.props.location.search === ''
          ? ''
          : parse(this.props.location.search).price,
      priceValidate: !(this.props.location.search === ''),
      observation:
        this.props.location.search === ''
          ? ''
          : parse(this.props.location.search).observation,
      Groups: [],
      Models: [],
      Prices: [],
    };
    ReactGA.pageview('/PUBLICACION SIN REGISTRO');
    this.next = this.next.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location.search !== '') {
      this.props.client
        .query({
          query: GroupsQuery,
          variables: {
            gru_nmarc: parse(this.props.location.search).brandId,
          },
        })
        .then(response =>
          this.setState({
            Groups: response.data.Group,
            brandName: find(this.props.ta3AllBrands.AllBrands, [
              'ta3_nmarc',
              parse(this.props.location.search).brandId,
            ]).ta3_marca,
          }));
      this.props.client
        .query({
          query: ModelsQuery,
          variables: {
            ta3_nmarc: parse(this.props.location.search).brandId,
            ta3_cgrup: parse(this.props.location.search).groupId,
          },
        })
        .then(response =>
          this.setState({
            Models: response.data.Models,
            groupName: find(this.state.Groups, [
              'gru_cgrup',
              parse(this.props.location.search).groupId,
            ]).gru_ngrup,
          }));
      this.props.client
        .query({
          query: YearsQuery,
          variables: {
            ta3_codia: parse(this.props.location.search).codia,
          },
        })
        .then(response =>
          this.setState({
            Prices: response.data.Price,
            modelName: find(this.state.Models, [
              'ta3_codia',
              parse(this.props.location.search).codia,
            ]).ta3_model,
          }));
    }
  }
  onChangeBrand(newBrand) {
    this.setState({
      brand: newBrand,
      brandName: newBrand.label,
      group: '',
      codia: '',
      Models: [],
      modelName: '',
      Prices: [],
      year: '',
      priceSuggested: '',
    });
    this.props.client
      .query({
        query: GroupsQuery,
        variables: {
          gru_nmarc: newBrand.value,
        },
      })
      .then(response => this.setState({ Groups: response.data.Group }));
  }

  onChangeGroup(newGroup) {
    this.setState({
      group: newGroup,
      groupName: newGroup.label,
      modelName: '',
      Prices: [],
      year: '',
      priceSuggested: '',
    });
    this.props.client
      .query({
        query: ModelsQuery,
        variables: {
          ta3_nmarc: this.state.brand.value,
          ta3_cgrup: newGroup.value,
        },
      })
      .then(response => this.setState({ Models: response.data.Models }));
  }

  onChangeModel(newModel) {
    this.setState({
      codia: newModel,
      modelName: newModel.label,
    });
    this.props.client
      .query({
        query: YearsQuery,
        variables: {
          ta3_codia: newModel.value,
        },
      })
      .then(response => this.setState({ Prices: response.data.Price }));
  }

  onChangeYear(newYear) {
    this.setState({
      year: newYear,
      priceSuggested: find(this.state.Prices, { anio: newYear.value }) ?
        thousands((find(this.state.Prices, { anio: newYear.value })).precio, 2)
        : 'No encontramos uno para ese año.',
    });
  }

  next(event, errors) {
    if (!isEmpty(errors)) {
      scroller.scrollTo(errors[0], {
        duration: 600,
        smooth: true,
        offset: -100,
      });
      return false;
    }
    if (this.state.carState === '') {
      this.setState({ stateError: true });
      scroller.scrollTo('carState-select', {
        duration: 600,
        smooth: true,
        offset: -100,
      });
      return false;
    }
    if (this.state.codia === '') {
      this.setState({ carError: true });
      scroller.scrollTo('brand-select', {
        duration: 600,
        smooth: true,
        offset: -100,
      });
      return false;
    }
    const {
      brand,
      group,
      codia,
      year,
      kmsValidate,
      priceValidate,
    } = this.state;

    const dataCar = {
      carState: this.state.carState,
      brand: this.state.brandName,
      group: this.state.groupName,
      codia: this.state.codia,
      modelName: this.state.modelName,
      brandId: this.state.brand,
      groupId: this.state.group,
      year: this.state.year,
      kms: this.state.kms,
      price: this.state.price,
      priceSuggested: this.state.priceSuggested,
      observation: this.state.observation,
    };
    this.props.history.push(`/publicateWithoutRegisterS1?${stringify(dataCar)}`);
  }

  render() {
    const {
      ta3AllBrands: { AllBrands },
    } = this.props;
    return (
      <div>
        <AdminBar history={this.props.history} />
        <div className="container-fluid register-steps">
          <Row>
            <Col md="6" sm="12" xs="12" className="bg">
              <div className="col-md-8 float-right">
                <div className="text-block">
                  <h4 className="title-division-primary">Vendé tu auto ya!</h4>
                  <p>En muy simples pasos podés publicar tu auto.</p>
                </div>

                <div className="steps">
                  <div className="step">
                    <h6>PASO 1</h6>
                    <h4>Contanos de tu auto</h4>
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

                  <div className="step disable">
                    <h6>PASO 3</h6>
                    <h4>Mostralo con fotos</h4>
                    <p className="info">* Mínimo 3 fotos</p>
                  </div>
                </div>
              </div>
            </Col>

            <Col md="6" sm="12" xs="12" className="mb-4">
              <AvForm onSubmit={this.next}>
                <div className="col-md-9 float-left">
                  <h4 className="title-division">Describe tu auto</h4>
                  <FormGroup>
                    {this.state.stateError && (
                    <div>
                      <div style={{ color: 'red' }}>
                          Por favor selecciona el tipo de auto.
                      </div>
                      <br />
                    </div>
                    )}
                    <Label for="exampleSelect">
                      ¿Qué tipo de auto quieres vender?
                    </Label>
                    <Select
                      id="carState-select"
                      ref={(ref) => {
                        this.select = ref;
                      }}
                      onBlurResetsInput={false}
                      autoFocus
                      clearable={false}
                      onSelectResetsInput={false}
                      options={[
                        { value: 'Nuevo', label: 'Nuevo' },
                        { value: 'Usado', label: 'Usado' },
                      ]}
                      simpleValue
                      name="selected-state"
                      value={this.state.carState}
                      onChange={newValue =>
                        this.setState({ carState: newValue })
                      }
                      theme={theme => ({
                        ...theme,
                        borderRadius: 4,
                        colors: {
                        ...theme.colors,
                          primary25: '#D2DCD4',
                          primary: '#2A3B59',
                        },
                      })
                      }
                    />
                  </FormGroup>
                  <div
                    className="simulator-container"
                    style={{
                      border: this.state.carError
                        ? 'solid 1px red'
                        : 'display:none',
                    }}
                  >
                    {this.state.carError && (
                      <div>
                        <div style={{ color: 'red' }}>
                          Por favor completa estos campos
                        </div>
                        <br />
                      </div>
                    )}
                    <FormGroup>
                      <Label for="exampleSelect">¿Cuál es la marca?</Label>
                      <Select
                        id="brand-select"
                        ref={(ref) => {
                        this.select = ref;
                      }}
                        onBlurResetsInput={false}
                        onSelectResetsInput={false}
                        options={prepareArraySelect(
                        AllBrands,
                        'ta3_nmarc',
                        'ta3_marca',
                      )}
                        simpleValue
                        clearable
                        name="selected-state"
                        value={this.state.brand}
                        placeholder="Selecciona una marca"
                        onChange={newValue => this.onChangeBrand(newValue)}
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
                      <Label for="exampleSelect">¿Cuál es el modelo?</Label>
                      <Select
                        id="groups-select"
                        ref={(ref) => {
                        this.select = ref;
                      }}
                        onBlurResetsInput={false}
                        onSelectResetsInput={false}
                        options={prepareArraySelect(
                        this.state.Groups,
                        'gru_cgrup',
                        'gru_ngrup',
                      )}
                        simpleValue
                        clearable
                        name="selected-state"
                        value={this.state.group}
                        placeholder="Selecciona un modelo"
                        onChange={newValue => this.onChangeGroup(newValue)}
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
                      <Label for="exampleSelect">¿Cuál es la versión?</Label>
                      <Select
                        id="models-select"
                        ref={(ref) => {
                        this.select = ref;
                      }}
                        onBlurResetsInput={false}
                        onSelectResetsInput={false}
                        options={prepareArraySelect(
                        this.state.Models,
                        'ta3_codia',
                        'ta3_model',
                      )}
                        simpleValue
                        clearable
                        name="selected-state"
                        value={this.state.codia}
                        placeholder="Selecciona un tipo"
                        onChange={newValue => this.onChangeModel(newValue)}
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
                  </div>
                  <FormGroup>
                    <Label for="exampleSelect">¿Cuál es el año?</Label>
                    <Select
                      id="year-select"
                      ref={(ref) => {
                        this.select = ref;
                      }}
                      onBlurResetsInput={false}
                      onSelectResetsInput={false}
                      options={generateYearArray()}
                      simpleValue
                      clearable
                      required
                      name="selected-state"
                      value={this.state.year}
                      placeholder="Selecciona un año"
                      onChange={newValue => this.onChangeYear(newValue)}
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
                  <label>¿Cuántos kilometros tiene? (Opcional)</label>
                  <AvField
                    type="number"
                    value={this.state.kms}
                    onChange={event =>
                      this.setState({ kms: event.target.value })
                    }
                    placeholder="Ingrese un número sin puntos ni comas"
                    name="kms"
                    id="kms"
                    validate={{
                      min: {
                        value: 0,
                        errorMessage: 'El número debe ser mayor a cero',
                      },
                      pattern: {
                        value: '[0-9]+',
                        errorMessage: 'Ingrese solo números.',
                      },
                    }}
                    className="form-control"
                  />
                  <label>¿A qué precio lo querés vender? (Opcional)</label>
                  <AvField
                    type="money"
                    value={this.state.price}
                    onChange={event =>
                      this.setState({ price: event.target.value })
                    }
                    placeholder="Ingrese un número sin puntos ni comas"
                    name="price"
                    id="price"
                    validate={{
                      min: {
                        value: 0,
                        errorMessage: 'El número debe ser mayor a cero',
                      },
                      pattern: {
                        value: '[0-9]+',
                        errorMessage: 'Ingrese solo números.',
                      },
                    }}
                    className="form-control"
                  />
                  <small style={{ position: 'relative', top: '-20px' }}>Si no ingresas un precio, aparecerá "consultar" en su lugar</small><br />
                  {this.state.priceSuggested && (
                    <p>
                      Precio Sugerido: <b>{this.state.priceSuggested}</b>
                    </p>
                  )}
                  <label>Observaciones (Opcional)</label>
                  <AvField
                    type="textarea"
                    style={{ height: '90px !important', lineHeight: '20px !important' }}
                    value={this.state.observation}
                    onChange={event =>
                      this.setState({ observation: event.target.value })
                    }
                    name="observation"
                    id="observation"
                    className="form-control"
                  />
                  <div className="underline" />
                  <p>* Todos los campos son obligatorios</p>
                  <Button
                    color="primary"
                    className="float-right"
                    type="submit"
                  >
                    Siguiente
                  </Button>
                </div>
              </AvForm>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

const WithAllBrands = graphql(AllBrandsQuery, {
  name: 'ta3AllBrands',
});

const withData = compose(WithAllBrands);

export default withApollo(withData(PublicateWithoutRegister));

/* eslint react/jsx-filename-extension: 0 */
/* eslint react/prop-types: 0 */

import React from 'react';
import { Col, Row, FormGroup, Label, Button } from 'reactstrap';
import { scroller } from 'react-scroll';
// Todo: adapt this
// import { graphql, compose, withApollo } from 'react-apollo';
import { stringify, parse } from 'query-string';
import _ from 'lodash';
import Select from 'react-select';
import { branch, renderComponent } from 'recompose';
import ReactGA from 'react-ga';
import { AvForm, AvGroup, AvField } from 'availity-reactstrap-validation';
import { validate } from '../../../modules/functions';

import AdminBar from '../../../pages/_old/AdminBar';

import {
  AllBrandsQuery,
  GroupsQuery,
  ModelsQuery,
  YearsQuery,
} from '../../../graphql/_old/TautosQuery';

import Login from '../../../pages/auth/Login';
import { isUserLogged } from '../../../modules/sessionFunctions';
import {
  thousands,
  generateYearPerModel,
  prepareArraySelect,
} from '../../../modules/functions';

const renderForUnloggedUser = (component, propName = 'data') =>
  branch(props => !isUserLogged(), renderComponent(component));

class CreatePublication extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      carState:
        this.props.location.search === ''
          ? ''
          : { label: parse(this.props.location.search).carState, value: parse(this.props.location.search).carState },
      brand:
        this.props.location.search === ''
          ? ''
          : { label: parse(this.props.location.search).brand, value: parse(this.props.location.search).brandId },
      group:
        this.props.location.search === ''
          ? ''
          : { label: parse(this.props.location.search).group, value: parse(this.props.location.search).groupId },
      codia:
        this.props.location.search === ''
          ? ''
          : { label: parse(this.props.location.search).modelName, value: parse(this.props.location.search).codia },
      brandName:
        this.props.location.search === ''
          ? ''
          : { label: parse(this.props.location.search).brand, value: parse(this.props.location.search).brand },
      groupName:
        this.props.location.search === ''
          ? ''
          : { label: parse(this.props.location.search).group, value: parse(this.props.location.search).group },
      modelName:
        this.props.location.search === ''
          ? ''
          : parse(this.props.location.search).modelName,
      year:
        this.props.location.search === ''
          ? ''
          : { label: parse(this.props.location.search).year, value: parse(this.props.location.search).year },
      kms:
        this.props.location.search === ''
          ? ''
          : parse(this.props.location.search).kms,
      kmsDisabled: false,
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
      carError: false,
      stateError: false,
    };
    ReactGA.pageview('/CREAR-PUBLICACION');
    this.next = this.next.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (!_.isUndefined(parse(nextProps.location.search).brand)) {
      const brandId = parse(nextProps.location.search).brandId !== undefined
        ? parse(nextProps.location.search).brandId
        : _.find(nextProps.ta3AllBrands.AllBrands, ['ta3_marca',
          parse(nextProps.location.search).brand,
        ]).ta3_nmarc;
      this.props.client
        .query({
          query: GroupsQuery,
          variables: {
            gru_nmarc: brandId,
          },
        })
        .then((response) => {
          this.setState({
            Groups: response.data.Group,
            brandName: parse(nextProps.location.search).brand,
            brand: { label: parse(nextProps.location.search).brand, value: brandId },
          });
          const groupId = parse(nextProps.location.search).groupId !== undefined
            ? parse(nextProps.location.search).groupId
            : _.find(response.data.Group, ['gru_ngrup',
              parse(nextProps.location.search).group,
            ]).gru_cgrup;
          nextProps.client
            .query({
              query: ModelsQuery,
              variables: {
                ta3_nmarc: brandId,
                ta3_cgrup: groupId,
              },
            })
            .then((responseGroup) => {
              this.setState({
                Models: responseGroup.data.Models,
                groupName: _.find(this.state.Groups, ['gru_cgrup', groupId]).gru_ngrup,
                group: { label: _.find(this.state.Groups, ['gru_cgrup', groupId]).gru_ngrup, value: groupId },
              });
              nextProps.client
                .query({
                  query: YearsQuery,
                  variables: {
                    ta3_codia: parse(nextProps.location.search).codia,
                  },
                })
                .then(responseModel =>
                  this.setState({
                    Prices: responseModel.data.Price,
                    modelName: _.find(this.state.Models, [
                      'ta3_codia',
                      parse(nextProps.location.search).codia,
                    ]).ta3_model,
                  }));
            });
        });
    }
  }
  onChangeBrand(newBrand) {
    this.setState({
      brand: newBrand,
      brandName:
        newBrand.value !== null
          ? _.find(this.props.ta3AllBrands.AllBrands, ['ta3_nmarc', newBrand.value])
            .ta3_marca
          : '',
      group: '',
      codia: '',
      Models: [],
      modelName: '',
      groupName: '',
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
      groupName:
        newGroup.value !== null
          ? _.find(this.state.Groups, ['gru_cgrup', newGroup.value]).gru_ngrup
          : '',
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
      modelName:
        newModel.value !== null
          ? _.find(this.state.Models, ['ta3_codia', newModel.value]).ta3_model
          : '',
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
      priceSuggested: this.state.Prices[
        this.state.Prices[0].anio - parseInt(newYear.value, 10)
      ]
        ? `$${thousands(
          this.state.Prices[this.state.Prices[0].anio - parseInt(newYear.value, 10)]
            .precio,
          0,
          ',',
          '.',
        )}`
        : 'No encontramos uno para ese año.',
    });
  }
  next(event, errors) {
    if (!_.isEmpty(errors)) {
      if (errors.indexOf('price') >= 0 && this.state.price === '') {
      } else if (errors.indexOf('kms') >= 0 && this.state.kms === '') {
      } else {
        scroller.scrollTo(errors[0], {
          duration: 600,
          smooth: true,
          offset: -100,
        });
        return false;
      }
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

    const dataCar = {
      carState: this.state.carState.label,
      brand: this.state.brandName,
      group: this.state.groupName,
      codia: this.state.codia.value,
      modelName: this.state.modelName,
      brandId: this.state.brand.value,
      groupId: this.state.group.value,
      year: this.state.year.label,
      kms: this.state.kms,
      price: this.state.price,
      priceSuggested: this.state.priceSuggested,
      observation: this.state.observation,
      publication_id: parse(this.props.location.search).publication_id,
    };
    if (parse(this.props.location.search).userId) {
      dataCar.userId = parse(this.props.location.search).userId;
    }
    return this.props.history.push(`/createPublicationS1?${stringify(dataCar)}`);
  }
  carStateChange(newValue) {
    if (newValue === 'Nuevo') {
      this.setState({
        kms: 0,
        carState: newValue,
        kmsDisabled: true,
      });
    } else {
      this.setState({
        carState: newValue,
        kmsDisabled: false,
        kms: '',
      });
    }
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
                    <h4>Mostralo con fotos</h4>
                    <a className="link">Modificar datos</a>
                  </div>
                </div>
              </div>
            </Col>
            <Col md="6" sm="12" xs="12">
              <div className="col-md-9 float-left pb-4">
                <h4 className="title-division">Describe tu auto</h4>
                <AvForm onSubmit={this.next}>
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
                      placeholder="Selecciona un estado"
                      options={[
                        { value: 'Nuevo', label: 'Nuevo' },
                        { value: 'Usado', label: 'Usado' },
                      ]}
                      simpleValue
                      name="selected-state"
                      value={this.state.carState}
                      onChange={newValue => this.carStateChange(newValue)}
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
                  <FormGroup>
                    <Label for="exampleSelect">¿Cuál es el año?</Label>
                    <Select
                      disabled={this.state.codia === ''}
                      id="year-select"
                      ref={(ref) => {
                        this.select = ref;
                      }}
                      onBlurResetsInput={false}
                      onSelectResetsInput={false}
                      options={generateYearPerModel(this.state.Prices)}
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
                  <Label for="kms">¿Cuántos kilometros tiene? (Opcional)</Label>
                  <AvField
                    type="number"
                    value={this.state.kms}
                    onChange={event =>
                      this.setState({ kms: event.target.value })
                    }
                    placeholder="Ingrese un número sin puntos ni comas"
                    disabled={this.state.kmsDisabled}
                    className="form-control"
                    validate={{
                      min: {
                        value: 0,
                        errorMessage: 'El número debe ser mayor a cero',
                      },
                      pattern: {
                        value: '[0-9]*',
                        errorMessage: 'Ingrese solo números.',
                      },
                      required: false,
                    }}
                    name="kms"
                    id="kms"
                  />

                  <Label for="price">¿A qué precio lo querés vender? (Opcional)</Label>
                  <AvField
                    type="number"
                    value={this.state.price}
                    onChange={event =>
                      this.setState({ price: event.target.value })
                    }
                    placeholder="Ingrese un número sin puntos ni comas"
                    className="form-control"
                    validate={{
                      min: {
                        value: 0,
                        errorMessage: 'El número debe ser mayor a cero',
                      },
                      pattern: {
                        value: '[0-9]*',
                        errorMessage: 'Ingrese solo números.',
                      },
                      required: false,
                    }}
                    name="price"
                    id="price"
                  />
                  <small style={{ position: 'relative', top: '-20px' }}> Si no ingresas un precio, aparecerá "consultar" en su lugar</small><br />
                  {this.state.priceSuggested && (
                    <p>
                      Precio Sugerido: <b>{this.state.priceSuggested}</b>
                    </p>
                  )}
                  <Label for="price">Observaciones (Opcional)</Label>
                  <AvField
                    type="textarea"
                    value={this.state.observation}
                    onChange={event =>
                      this.setState({ observation: event.target.value })
                    }
                    className="form-control"
                    name="observation"
                    id="observation"
                  />

                  <div className="underline" />
                  <Button color="primary" className="float-right" type="submit">
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
  name: 'ta3AllBrands',
});

const withData = compose(
  WithAllBrands,
  renderForUnloggedUser(Login, 'userProfile'),
);

export default withApollo(withData(CreatePublication));

/* eslint react/jsx-filename-extension: 0 */
/* eslint react/prop-types: 0 */

import React from 'react';
import { Col, Row, FormGroup, Label } from 'reactstrap';
// Todo: adapt this
// import { graphql, compose, withApollo } from 'react-apollo';
import { branch, renderComponent } from 'recompose';
import Select from 'react-select';

import ReactGA from 'react-ga';
import { find } from 'lodash';
import AdminBar from '../../../pages/_old/AdminBar';
import SuperAdminSideBar from '../../../pages/_old/SuperAdminSideBar';
import { isAdminLogged } from '../../../modules/sessionFunctions';
import { AllBrandsQuery, GroupsQuery, ModelsQuery, YearsQuery } from '../../../graphql/_old/TautosQuery';
import { prepareArraySelect, thousands, generateYearPerModel } from '../../../modules/functions';
import Login from '../../../pages/auth/Login';


const renderForUnloggedUser = (component, propName = 'data') =>
  branch(
    props => !isAdminLogged(),
    renderComponent(component),
  );

class SuperAdminConsult extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      brand: '',
      group: '',
      codia: '',
      year: '',
      Groups: [],
      Models: [],
      Prices: [],

    };
    ReactGA.pageview('/USUARIO-CONSULTA');
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


  render() {
    const { history, location, ta3AllBrands: { AllBrands } } = this.props;
    return (
      <div>
        <AdminBar history={history} />
        <div className="container-fluid">
          <Row>
            <Col lg="3" md="12" sm="12" xs="12">
              <SuperAdminSideBar history={history} location={location} />
            </Col>
            <Col lg="9" md="12" sm="12" className="mt-4">
              <Row>
                <Col lg="6" md="8" sm="12" className="container-data-input-group mv-15">
                  <div className="card p-4" style={{ height: '100%' }}>
                    <FormGroup>
                      <Label for="exampleSelect">¿Cuál es la marca?</Label>
                      <Select
                        id="brand-select"
                        onBlurResetsInput={false}
                        onSelectResetsInput={false}
                        options={prepareArraySelect(AllBrands, 'ta3_nmarc', 'ta3_marca')}
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
                        onBlurResetsInput={false}
                        onSelectResetsInput={false}
                        options={prepareArraySelect(this.state.Groups, 'gru_cgrup', 'gru_ngrup')}
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
                        onBlurResetsInput={false}
                        onSelectResetsInput={false}
                        options={prepareArraySelect(this.state.Models, 'ta3_codia', 'ta3_model')}
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
                        id="year-select"
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
                    <p>Precio Revista: <b>{this.state.priceSuggested}</b></p>
                  </div>
                </Col>
              </Row>
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
  renderForUnloggedUser(Login, 'userConsult'),
);


export default withApollo(withData(SuperAdminConsult));

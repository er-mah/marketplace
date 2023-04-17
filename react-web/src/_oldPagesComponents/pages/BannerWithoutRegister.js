import React from 'react';
import { Row, FormGroup, Button, Label } from 'reactstrap';
// Todo: adapt this
// import { graphql, compose, withApollo } from 'react-apollo';
import { stringify } from 'query-string';
import Select from 'react-select';
import ReactGA from 'react-ga';

import { AllBrandsQuery, GroupsQuery } from '../../graphql/old/TautosQuery';
import { prepareArraySelect } from '../../modules/functions';
import InputOrText from './InputOrText';

/* eslint react/jsx-filename-extension: 0 */
class Banner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      carState: 'Nuevo',
      brand: '',
      group: '',
      text: 'Publicá gratis, sin registro. Vendé ya en Mi Auto Hoy!',
    };
  }

  onChangeBrand(newBrand) {
    this.setState({
      brand: newBrand,
      group: '',
    });
    this.props.client.query({
      query: GroupsQuery,
      variables: {
        gru_nmarc: newBrand,
      },
    })
      .then(response => this.setState({ Groups: response.data.Group }));
  }

  onChangeGroup(newGroup) {
    this.setState({
      group: newGroup,
    });
  }

  start() {
    const dataCar = {
      carState: this.state.carState,
      brandId: this.state.brand,
      groupId: this.state.group,
    };
    ReactGA.event({
      category: 'Publicá ya Plans',
      action: 'Ir a Publicá ya',
    });
    this.props.history.push(`/publicateWithoutRegister?${stringify(dataCar)}`);
  }

  render() {
    const {
      ta3AllBrands: { AllBrands },
    } = this.props;
    return (
      <div className="container-fluid">
        <Row className="banner-home" style={{ background: 'url(/assets/images/image-free.png) no-repeat center center', padding: '2vw' }}>
          <div className="container">
            <Row className="align-items-center justify-content-between">
              <div className="col-lg-4 col-md-5 col-sm-12 col-xs-12">
                {this.state.isAdmin ?
                  <InputOrText type="h3" text={this.state.text} onChange={text => this.setState({ text })} />
                :
                  <h3>{this.state.text}</h3>
                }
              </div>
              <div className="container-data-input-group col-lg-4 col-md-5 col-sm-12 col-xs-12 align-self-end" >
                <div className="cont-form">
                  <h5><strong>¡Publicá gratis ahora!</strong></h5>
                  <FormGroup>
                    <Label for="exampleSelect">¿Qué tipo de auto quieres vender?</Label>
                    <Select
                      id="carState-select"
                      ref={(ref) => { this.select = ref; }}
                      onBlurResetsInput={false}
                      autoFocus
                      clearable={false}
                      onSelectResetsInput={false}
                      options={[{ value: 'Nuevo', label: 'Nuevo' }, { value: 'Usado', label: 'Usado' }]}
                      simpleValue
                      name="selected-state"
                      value={this.state.carState}
                      onChange={newValue => this.setState({ carState: newValue })}
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
                      ref={(ref) => { this.select = ref; }}
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
                      ref={(ref) => { this.select = ref; }}
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
                  <Button color="primary" onClick={() => this.start()} >Comenzar</Button>
                </div>
              </div>
            </Row>
          </div>
        </Row>
      </div>
    );
  }
}


const WithAllBrands = graphql(AllBrandsQuery, {
  name: 'ta3AllBrands',
});


const withData = compose(WithAllBrands);

export default withApollo(withData(Banner));

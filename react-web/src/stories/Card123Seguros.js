import React from 'react';
import { Alert, Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { graphql, compose, withApollo } from 'react-apollo';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import _ from 'lodash';
import Select from 'react-select';
/* eslint react/jsx-filename-extension: 0 */
/* eslint react/prop-types: 0 */

import { get123Provinces, get123Towns, addUserAndCarData, get123Brands, get123Years, get123Family, get123Models } from '../modules/fetches';
import { prepareArraySelect, generateYearPerModel, validate } from '../modules/functions';

class Card123Seguros extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      brand: null,
      name: '',
      secondName: '',
      email: '',
      phone: '',
      codia: null,
      year: null,
      provinceList: [],
      province_id: '',
      townList: [],
      town_id: '',
      showModal: false,
      loading: false,
      loadingText: '',
      error: false,
      allBrands: [],
      allYears: [],
      allFamilies: [],
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.handleQuoting = this.handleQuoting.bind(this);
  }

  componentDidMount() {
    if (this.props.isCarSelected) {
      this.setState({
        brand: this.props.carData.brand,
        group: this.props.carData.group,
        codia: { value: this.props.carData.codia },
        year: { value: this.props.carData.year },
      });
    } else {
      get123Brands()
        .then((res) => {
          this.setState({
            allBrands: res.data,
          });
        });
    }
  }

  onChangeProvince(newProvince) {
    get123Towns(newProvince.value)
      .then((response) => {
        this.setState({
          province_id: newProvince,
          townList: prepareArraySelect(response.data, 'id', 'nombre'),
        });
      })
      .catch(error => console.log(error));
  }

  onChangeBrand(newBrand) {
    this.setState({
      brand: newBrand,
      codia: null,
      year: null,
    });
    get123Years(newBrand.value)
      .then((res) => {
        this.setState({ allYears: res.data });
      });
  }
  onChangeYear(newYear) {
    this.setState({ year: newYear, allFamilies: [], allModels: [] });
    get123Family(this.state.brand.value, newYear.value)
      .then((resp) => {
        this.setState({ allFamilies: resp.data });
      });
  }
  onChangeFamily(newGroup) {
    this.setState({
      family: newGroup,
      codia: null,
      allModels: [],
    });
    get123Models(this.state.brand.value, this.state.year.value, newGroup.value)
      .then((res) => {
        this.setState({ allModels: res.data });
      });
  }
  onChangeModel(newModel) {
    this.setState({
      codia: newModel,
    });
  }

  handleQuoting() {
    this.setState({ loading: true, loadingText: 'Conectandose con 123seguro...' });
    const {
      brand, family, codia, year,
    } = this.state;
    if (brand !== null && family !== null && codia !== null && year !== null) {
      get123Provinces()
        .then((resp) => {
          this.setState({ provinceList: resp.data, showModal: true, loading: false });
        })
        .catch(error => console.log(error));
    }
  }
  toggleModal() {
    this.setState({ showModal: !this.state.showModal });
  }
  viewQuoted() {
    this.setState({ loading: true, loadingText: 'Cargando...' });

    const data = {
      nombre: this.state.name,
      apellido: this.state.secondName,
      mail: this.state.email,
      telefono: this.state.phone,
      localidad_id: this.state.town_id.value,
      anio: this.state.year.value,
      vehiculo_id: this.state.codia.value,
    };
    addUserAndCarData(data)
      .then((response) => {
        this.props.history.push({
          pathname: '/hire123Seguros',
          state: {
            data, response,
          },
        });
      }).catch((e) => {
        console.log(e);
        this.setState({ loading: false, error: e.indexOf('year and vehiculo_id does not match in') > -1 ? 'No se pudo cotizar este auto en 123seguro, el año y el modelo no corresponden.' : 'Ha ocurrido un error con la conexión. Intente nuevamente más tarde.' });
      });
  }

  render() {
    return (
      <div className="container">
        {this.props.isCarSelected && <button className="container-button" onClick={this.handleQuoting} >
          <Col md={10} className="d-flex align-items-start flex-column" >
            <label>¡Cotizá el seguro para este vehículo ya!</label>
            <img src="/assets/images/partners/aseguradoras123/123seguro-logo.svg" alt="" className="logo" />
          </Col>
          <Col md={2}>
            <img src="/assets/utils/icon-arrow-right.svg" alt="Ir al formulario" />
          </Col>
                                     </button>}
        {!this.props.isCarSelected && <div className="container-123">
          <Col lg={12}>
            <label>Cotizá un seguro para tu auto</label>
            <div className="d-flex flex-lg-row flex-column justify-content-md-start justify-content-lg-between align-items-center" >
              <div className="col-lg-3 col-md-6 p-0" >
                <Select
                  id="brand-select"
                  onBlurResetsInput={false}
                  onSelectResetsInput={false}
                  options={prepareArraySelect(this.state.allBrands, 'id', 'nombre')}
                  simpleValue
                  clearable
                  name="selected-state"
                  value={this.state.brand}
                  placeholder="Marca"
                  onChange={newValue => this.onChangeBrand(newValue)}
                  searchable
                  noResultsText="No se encontraron resultados"
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
              </div>
              <div className="col-lg-1 col-md-6 p-0" >
                <Select
                  id="year-select"
                  onBlurResetsInput={false}
                  onSelectResetsInput={false}
                  options={this.state.allYears.map(row => ({ value: row, label: row }))}
                  simpleValue
                  clearable
                  required
                  name="selected-state"
                  value={this.state.year}
                  placeholder="Año"
                  onChange={newValue => this.onChangeYear(newValue)}
                  searchable
                  noResultsText="No se encontraron resultados"
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
              </div>
              <div className="col-lg-3 col-md-6 p-0" >
                <Select
                  id="groups-select"
                  onBlurResetsInput={false}
                  onSelectResetsInput={false}
                  options={prepareArraySelect(this.state.allFamilies, 'id', 'nombre')}
                  simpleValue
                  clearable
                  name="selected-state"
                  value={this.state.family}
                  placeholder="Familia"
                  onChange={newValue => this.onChangeFamily(newValue)}
                  searchable
                  noResultsText="No se encontraron resultados"
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
              </div>
              <div className="col-lg-3 col-md-6 p-0" >
                <Select
                  id="models-select"
                  onBlurResetsInput={false}
                  onSelectResetsInput={false}
                  options={prepareArraySelect(this.state.allModels, 'id', 'nombre')}
                  simpleValue
                  clearable
                  name="selected-state"
                  value={this.state.codia}
                  placeholder="Modelo"
                  onChange={newValue => this.onChangeModel(newValue)}
                  searchable
                  noResultsText="No se encontraron resultados"
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
              </div>
              <Button color="primary" className="btn-block" onClick={this.handleQuoting}>Cotizar</Button>
            </div>
            <div className="d-flex justify-content-end" >
              <img src="/assets/images/partners/aseguradoras123/123seguro-logo.svg" alt="" className="logo" />
            </div>
          </Col>
                                      </div>}
        <Modal isOpen={this.state.loading} size="md">
          <ModalBody className="">
            <div>
              <Row>
                <Col className="text-center">
                  <img
                    style={{ height: '30px', marginTop: '8px' }}
                    src="/logo.png"
                    key={0}
                    alt="Loading..."
                  />
                </Col>
                <Col className="text-center">
                  <img
                    style={{ height: '35px', width: 'auto', paddingTop: '10px' }}
                    src="/assets/utils/connecting.gif"
                    key={0}
                    alt="Loading..."
                  />
                </Col>
                <Col>
                  <img
                    style={{ height: '30px', marginLeft: '15px' }}
                    src="/assets/images/partners/aseguradoras123/123seguro-logo.svg"
                    key={0}
                    alt="Loading..."
                  />
                </Col>
              </Row>
              <Row>
                <Col className="text-center pt-3">
                  <p>{this.state.loadingText}</p>
                </Col>
              </Row>
            </div>
          </ModalBody>
        </Modal>
        <Modal isOpen={this.state.showModal} toggle={this.toggleModal} size="lg">
          <ModalHeader toggle={this.toggleModal}>Completá tus datos, para obtener un precio preciso</ModalHeader>
          <ModalBody>
            {this.state.error &&
            <Alert color="danger">
              <p>{this.state.error}</p>
            </Alert>}
            <AvForm onSubmit={this.next} className="d-flex flex-lg-row flex-md-column" >
              <Col lg={6} md={12}>
                <label>Nombre </label>
                <AvField
                  type="string"
                  value={this.state.name}
                  onChange={event => this.setState({ name: event.target.value })}
                  name="name"
                  id="name"
                  validate={validate('string')}
                  className="form-control"
                />
                <label>Provincia</label>
                <Select
                  id="province-select"
                  onBlurResetsInput={false}
                  onSelectResetsInput={false}
                  options={prepareArraySelect(this.state.provinceList, 'id', 'nombre')}
                  simpleValue
                  className="form-group"
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
                      primary25: '#D2DCD4',
                      primary: '#2A3B59',
                    },
                  })
                  }
                />
                <label>Localidad</label>
                <Select
                  id="city-select"
                  onBlurResetsInput={false}
                  onSelectResetsInput={false}
                  options={this.state.townList}
                  simpleValue
                  className="form-group"
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
                      primary25: '#D2DCD4',
                      primary: '#2A3B59',
                    },
                  })
                  }
                />
              </Col>
              <Col md={6} sm={12}>
                <label>Apellido</label>
                <AvField
                  type="text"
                  value={this.state.secondName}
                  onChange={event => this.setState({ secondName: event.target.value })}
                  name="name"
                  id="name"
                  validate={validate('text')}
                  className="form-control"
                />
                <label>Email</label>
                <AvField
                  type="email"
                  value={this.state.email}
                  onChange={event => this.setState({ email: event.target.value })}
                  name="name"
                  id="name"
                  validate={validate('email')}
                  className="form-control"
                />
                <label>Teléfono de contacto</label>
                <AvField
                  type="number"
                  value={this.state.phone}
                  onChange={event => this.setState({ phone: event.target.value })}
                  name="name"
                  id="name"
                  validate={validate('number')}
                  className="form-control"
                />
              </Col>
            </AvForm>
          </ModalBody>
          <ModalFooter className="d-flex justify-content-end">
            <Button color="default" onClick={() => this.toggleModal()}>Salir</Button>
            <Button color="primary" onClick={() => this.viewQuoted()}>Ver Cotización</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default (Card123Seguros);

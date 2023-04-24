/* eslint react/jsx-filename-extension: 0 */
/* eslint react/prop-types: 0 */

import React from 'react';
import { Col, Row, FormGroup, Input, Label, Button } from 'reactstrap';
import { parse, stringify } from 'query-string';

// Todo: adapt this
// import { withApollo } from 'react-apollo/withApollo';

import AdminBar from '../../../pages/_old/AdminBar';
import { InfoCarQuery } from '../../../graphql/_old/TautosQuery';

//import ReactPixel from 'react-facebook-pixel';

const fpOptions = {
	autoConfig: true,
  debug: false, 	
};
ReactPixel.init('549275042176385', null, fpOptions);
ReactPixel.pageView();
class CreatePublicationS1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    const search = parse(this.props.location.search);

    if (search.Caracteristics) {
      return this.setState({
        Caracteristics: parse(search.Caracteristics),
        TecnicalData: parse(search.TecnicalData),
        Additionals: parse(search.Additionals),
      });
    }
    return this.props.client.query({
      query: InfoCarQuery,
      variables: {
        ext_codia: search.Caracteristics ? parse(search.DataCar).codia : search.codia,
      },
    })
      .then(response => this.setState({
        Caracteristics: response.data.Caracteristics,
        TecnicalData: response.data.TecnicalData,
        Additionals: response.data.Additionals,
      }));
  }

  onChangeCheck(object, name, value) {
    let newObject = {};
    newObject = Object.assign({}, this.state[object]);
    newObject[name] = value;
    switch (object) {
      case 'Caracteristics':
        return this.setState({ Caracteristics: newObject });
      case 'TecnicalData':
        return this.setState({ TecnicalData: newObject });
      default:
        return this.setState({ Additionals: newObject });
    }
  }

  previous() {
    const search = parse(this.props.location.search);
    const sendData = search.Caracteristics ? parse(search.DataCar) : search;
    this.props.history.push(`/publicateWithoutRegister?${(stringify(sendData))}`);
  }

  next() {
    const search = parse(this.props.location.search);
    const dataCar = {
      DataCar: search.Caracteristics ? search.DataCar : stringify(search),
    };
    const dataExtras = {
      Caracteristics: stringify(this.state.Caracteristics),
      TecnicalData: stringify(this.state.TecnicalData),
      Additionals: stringify(this.state.Additionals),
    };
    if (search.DataPerson) {
      return this.props.history.push(`/publicateWithoutRegisterS2?${stringify(dataCar)}&${stringify(dataExtras)}&${stringify({ DataPerson: search.DataPerson })}`);
    }
    return this.props.history.push(`/publicateWithoutRegisterS2?${stringify(dataCar)}&${stringify(dataExtras)}`);
  }

  render() {
    const { Caracteristics, TecnicalData, Additionals } = this.state;
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
                    <h4>Dejá tus datos de contacto para recibir mensajes de los interesados</h4>
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
            <Col md="6" sm="12" xs="12">
              { Caracteristics &&
                <div className="col-md-9 float-left pb-4">
                  <h4 className="title-division">¿Qué extras tiene?</h4>
                  <FormGroup check className="d-flex flex-column" >
                    <Label>Características generales</Label>

                    <Label check>
                      <Input type="checkbox" checked={Caracteristics.Airbag === 'SI'} onChange={() => this.onChangeCheck('Caracteristics', 'Airbag', Caracteristics.Airbag === 'SI' ? 'NO' : 'SI')} />{' '} Airbag
                    </Label>
                    <Label check>
                      <Input type="checkbox" checked={Caracteristics.AireAcondicionado === 'SI'} onChange={() => this.onChangeCheck('Caracteristics', 'AireAcondicionado', Caracteristics.AireAcondicionado === 'SI' ? 'NO' : 'SI')} />{' '} Aire Acondicionado
                    </Label>
                    <Label check>
                      <Input type="checkbox" checked={Caracteristics.FrenosAbs === 'SI'} onChange={() => this.onChangeCheck('Caracteristics', 'FrenosAbs', Caracteristics.FrenosAbs === 'SI' ? 'NO' : 'SI')} />{' '} Frenos ABS
                    </Label>
                  </FormGroup>

                  <FormGroup check className="d-flex flex-column" >
                    <Label>Datos Técnicos</Label>

                    <Label check>
                      <Input type="checkbox" checked={TecnicalData.Climatizador === 'SI'} onChange={() => this.onChangeCheck('TecnicalData', 'Climatizador', TecnicalData.Climatizador === 'SI' ? 'NO' : 'SI')} />{' '} Climatizador
                    </Label>
                    <Label check>
                      <Input type="checkbox" checked={TecnicalData.ControlDeTraccion === 'SI'} onChange={() => this.onChangeCheck('TecnicalData', 'ControlDeTraccion', TecnicalData.ControlDeTraccion === 'SI' ? 'NO' : 'SI')} />{' '} Control de tracción
                    </Label>
                    <Label check>
                      <Input type="checkbox" checked={TecnicalData.ControlDeEstabilidad === 'SI'} onChange={() => this.onChangeCheck('TecnicalData', 'ControlDeEstabilidad', TecnicalData.ControlDeEstabilidad === 'SI' ? 'NO' : 'SI')} />{' '} Control de estabilidad
                    </Label>
                    <Label check>
                      <Input type="checkbox" checked={TecnicalData.FarosAntiniebla === 'SI'} onChange={() => this.onChangeCheck('TecnicalData', 'FarosAntiniebla', TecnicalData.FarosAntiniebla === 'SI' ? 'NO' : 'SI')} />{' '} Faros antiniebla
                    </Label>
                    <Label check>
                      <Input type="checkbox" checked={TecnicalData.SensorEstacionamiento === 'SI'} onChange={() => this.onChangeCheck('TecnicalData', 'SensorEstacionamiento', TecnicalData.SensorEstacionamiento === 'SI' ? 'NO' : 'SI')} />{' '} Sensor de estacionamiento
                    </Label>
                    <Label check>
                      <Input type="checkbox" checked={TecnicalData.TechoCorredizo === 'SI'} onChange={() => this.onChangeCheck('TecnicalData', 'TechoCorredizo', TecnicalData.TechoCorredizo === 'SI' ? 'NO' : 'SI')} />{' '} Techo corredizo
                    </Label>
                  </FormGroup>

                  <FormGroup check className="d-flex flex-column" >
                    <Label>Adicionales</Label>

                    <Label check>
                      <Input type="checkbox" checked={Additionals.TapizadoCuero === 'SI'} onChange={() => this.onChangeCheck('Additionals', 'TapizadoCuero', Additionals.TapizadoCuero === 'SI' ? 'NO' : 'SI')} />{' '} Tapizado de cuero
                    </Label>
                    <Label check>
                      <Input type="checkbox" checked={Additionals.ComputadoraABordo === 'SI'} onChange={() => this.onChangeCheck('Additionals', 'ComputadoraABordo', Additionals.ComputadoraABordo === 'SI' ? 'NO' : 'SI')} />{' '} Computadora a bordo
                    </Label>
                    <Label check>
                      <Input type="checkbox" checked={Additionals.FarosDeXenon === 'SI'} onChange={() => this.onChangeCheck('Additionals', 'FarosDeXenon', Additionals.FarosDeXenon === 'SI' ? 'NO' : 'SI')} />{' '} Faros de xenón
                    </Label>
                    <Label check>
                      <Input type="checkbox" checked={Additionals.SensorDeLluvia === 'SI'} onChange={() => this.onChangeCheck('Additionals', 'SensorDeLluvia', Additionals.SensorDeLluvia === 'SI' ? 'NO' : 'SI')} />{' '} Sensor de lluvia
                    </Label>
                    <Label check>
                      <Input type="checkbox" checked={Additionals.VolanteConLevas === 'SI'} onChange={() => this.onChangeCheck('Additionals', 'VolanteConLevas', Additionals.VolanteConLevas === 'SI' ? 'NO' : 'SI')} />{' '} Volante con levas
                    </Label>
                    <Label check>
                      <Input type="checkbox" checked={Additionals.Bluetooth === 'SI'} onChange={() => this.onChangeCheck('Additionals', 'Bluetooth', Additionals.Bluetooth === 'SI' ? 'NO' : 'SI')} />{' '} Bluetooth
                    </Label>
                    <Label check>
                      <Input type="checkbox" checked={Additionals.AsientosTermicos === 'SI'} onChange={() => this.onChangeCheck('Additionals', 'AsientosTermicos', Additionals.AsientosTermicos === 'SI' ? 'NO' : 'SI')} />{' '} Asientos térmicos
                    </Label>
                  </FormGroup>

                  <div className="underline" />
                  <div className="d-flex justify-content-between align-items-center" >
                    <Button color="default" onClick={() => this.previous()}>Volver</Button>
                    <Button color="primary" onClick={() => this.next()}>Siguiente</Button>
                  </div>
                </div>
              }
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default withApollo(CreatePublicationS1);

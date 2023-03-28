/* eslint react/jsx-filename-extension: 0 */
/* eslint react/prop-types: 0 */

import React from 'react';
import { Col, Row, Button } from 'reactstrap';
import { parse } from 'query-string';

import AdminBar from '../../../stories/AdminBar';


class CreatePublication extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  createPub() {
    const search = parse(this.props.location.search);
    const dataCar = {
      Caracteristics: parse(search.Caracteristics),
      TecnicalData: parse(search.TecnicalData),
      Additionals: parse(search.Additionals),
      DataCar: parse(search.DataCar),
      Image: parse(search.Image),
    };
    // const dataPublication = Object.assign({}, dataCar.Caracteristics, dataCar.TecnicalData, dataCar.Additionals, dataCar.DataCar, dataCar.Image);
  }

  render() {
    return (
      <div>
        <AdminBar />
        <div className="container-fluid register-steps">
          <Row>
            <Col md="6" sm="12" xs="12" className="bg pb-4">
              <div className="col-md-8 float-right">
                <div className="text-block">
                  <h4 className="title-division-primary">Vendé tu auto ya!</h4>
                  <p>En muy simples pasos podés publicar tu auto.</p>
                </div>

                <div className="steps">
                  <div className="step done">
                    <h6>PASO 1</h6>
                    <h4>Contanos de tu auto</h4>
                    <a className="link">Modificar datos</a>
                  </div>

                  <div className="step done">
                    <h6>PASO 2</h6>
                    <h4>Mostralo con fotos</h4>
                    <a className="link">Modificar datos</a>
                  </div>
                </div>

                <Button color="primary" className="float-right" onClick={() => this.createPub()}>PUBLICAR</Button>
              </div>
            </Col>


          </Row>
        </div>
      </div>
    );
  }
}


export default CreatePublication;

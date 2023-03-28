import React from 'react';
import { Col, Row } from 'reactstrap';
import Footer from '../stories/Footer';
import RegisterBar from '../stories/RegisterBar';
/* eslint react/jsx-filename-extension: 0 */

export default ({ location, history }) => (
  <div>
    <RegisterBar location={location} history={history} />
    <Row>
      <Col md={4} />
      <Col md={4} sm={4} xs={12}>
        <div className="header404" />
        <img className="image404" src="/assets/images/institutional/car.svg" alt="_404" />
        <div className="divider1-404" />
        <h2 className="h2-404text">
      Ups! No podemos encontrar la página que estás buscando.
        </h2>
        <div>
          <h4 style={{ textAlign: 'center' }}>Aqui unos links de ayuda:</h4>
          <div className="divider2-404" />
          <Row>
            <Col md={3} />
            <Col md={7}>
              <a className="p-404text" href="/">Inicio</a>
              <a className="p-404text" href="/pledgeCredits">Solicitá tu crédito</a>
              <a className="p-404text" href="/friendlyAgency">Concesionarios </a>
            </Col>
          </Row>
        </div>
      </Col>
      <Col md={4} />
    </Row>
    <Footer history={history} />
  </div>
);

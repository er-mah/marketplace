import React from 'react';
import { Col, Row } from 'reactstrap';
/* eslint react/jsx-filename-extension: 0 */

export default () => (
  <div className="container">
    <Row className="home-posibilities">
      <Col md="4" sm="12" xs="12">
        <Row className="justify-content-between">
          <Col md="4" sm="3" xs="12" className="text-right">
            <img src="/assets/utils/icon-free.svg" alt="banner" />
          </Col>
          <Col md="8" sm="9" xs="12">
            <h5>Publicación gratis</h5>
            <p>Podes crear una publicación rápido y fácil.</p>
          </Col>
        </Row>
      </Col>
      <Col md="4" sm="12" xs="12">
        <Row className="justify-content-between">
          <Col md="4" sm="3" xs="12" className="text-right">
            <img src="/assets/utils/icon-Inmediatly.svg" alt="banner" />
          </Col>
          <Col md="8" sm="9" xs="12">
            <h5>Inmediata</h5>
            <p>Podés publicar tu auto de manera inmediata sin necesidad de registrarte.</p>
          </Col>
        </Row>
      </Col>
      <Col md="4" sm="12" xs="12">
        <Row className="justify-content-between">
          <Col md="4" sm="3" xs="12" className="text-right">
            <img src="/assets/utils/icon-days.svg" alt="banner" />
          </Col>
          <Col md="8" sm="9" xs="12">
            <h5>60 días</h5>
            <p>Tu anuncio estará expuesto durante 60 días. Vende fácil y rápido.</p>
          </Col>
        </Row>
      </Col>
    </Row>
  </div>
);


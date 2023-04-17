import React from 'react';
import { Col, Row } from 'reactstrap';
/* eslint react/jsx-filename-extension: 0 */

export default () => (
  <div className="container">
    <Row className="home-posibilities">
      <Col md="4" sm="12" xs="12">
        <Row className="justify-content-between">
          <Col md="4" sm="3" xs="12" className="text-right">
            <img src="/assets/utils/icon-landing-1.svg" alt="banner" />
          </Col>
          <Col md="8" sm="9" xs="12">
            <h5>Gratis e ilimitado</h5>
            <p>Podes crear todas las publicaciones que desees de manera gratuita y sin limitaciones.</p>
          </Col>
        </Row>
      </Col>
      <Col md="4" sm="12" xs="12">
        <Row className="justify-content-between">
          <Col md="4" sm="3" xs="12" className="text-right">
            <img src="/assets/utils/icon-landing-2.svg" alt="banner" />
          </Col>
          <Col md="8" sm="9" xs="12">
            <h5>Panel administrativo</h5>
            <p>Podés controlar todas tus publicaciones desde un panel de control</p>
          </Col>
        </Row>
      </Col>
      <Col md="4" sm="3" xs="12">
        <Row className="justify-content-between">
          <Col md="4" className="text-right">
            <img src="/assets/utils/icon-chat.svg" alt="banner" />
          </Col>
          <Col md="8" sm="9" xs="12">
            <h5>Chat con interesados</h5>
            <p>Respondé de manera fácil y rápida a tus interesados. Toda la comunicación en un solo lugar.</p>
          </Col>
        </Row>
      </Col>
    </Row>
  </div>
);


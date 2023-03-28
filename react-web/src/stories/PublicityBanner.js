import React from 'react';
import { Col, Row } from 'reactstrap';
import { stringify } from 'query-string';
import ReactGA from 'react-ga';

/* eslint react/jsx-filename-extension: 0 */

export default ({ history, dataPublication }) => (
  <Col md="12">
    <a style={{ cursor: 'pointer' }} onClick={dataPublication ? () => history.push(`/pledgeCredits?${stringify(dataPublication)}`) : () => { ReactGA.event({ category: 'Banner Cars', action: 'Ir a Créditos Prendarios' }); history.push('/pledgeCredits'); }}>
      <Row className="publicityBanner align-items-center">
        <div className="col-10">Comprá tu auto aquí y te financiamos hasta el 60%.</div>
        <div className="col-2"><img src="/assets/utils/icon-arrow-right.svg" alt="Ir al formulario" /></div>
      </Row>
    </a>
  </Col>
);


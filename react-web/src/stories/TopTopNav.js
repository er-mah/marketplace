import React from 'react';
import { Row } from 'reactstrap';
import ReactGA from 'react-ga';

/* eslint react/jsx-filename-extension: 0 */

export default ({ history }) => (
  <div className="container-fluid">
    <Row>
      <div className="TopTopNav" id="myTopnav">
        <a onClick={() => {
          ReactGA.event({
            category: history.location.pathname,
            action: 'Ir a Créditos Libre Destino',
          });
          history.push('/freeDestinationCredits');
        }}>
          Créditos Libre Destino
        </a>
        <a onClick={() => {
          ReactGA.event({
            category: history.location.pathname,
            action: 'Ir a Personal Shopper',
          });
          history.push('/personalShopperS1')
        }}>Personal Shopper</a>
        <a onClick={() => {
          ReactGA.event({
            category: history.location.pathname,
            action: 'Ir a Creditos Prendarios',
          });
          history.push('/pledgeCredits')}}>Creditos Prendarios</a>
      </div>
    </Row>
  </div>
);

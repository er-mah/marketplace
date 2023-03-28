import React from 'react';
import { Row, Button } from 'reactstrap';
import ReactGA from 'react-ga';

export default ({ history }) => (
  <footer className="footer">
    <div className="container">
      <Row>
        <div className="footer-header">
          <img src="/logo.png" alt="Logo" />
          <div className="footer-header-right">
            <a className="btn a-footer" href="mailto:contacto@miautohoy.com">contacto@miautohoy.com</a>
            <a className="btn a-footer" href="tel:02604420324">Tel. (0260) – 4420324</a>
            <a href="https://www.facebook.com/miautohoycom/" className="btn a-footer" target="_blank"><img src="/assets/utils/facebook.svg" alt="Logo" /></a>
            <a href="http://qr.afip.gob.ar/?qr=eCGBIpBl8zeUdl_BL8Pnfw,," target="_F960AFIPInfo"><img style={{ width: '40px' }} alt="Afip" src="http://www.afip.gob.ar/images/f960/DATAWEB.jpg" /></a>
          </div>
        </div>
        <div className="btn-area" >
          <Button className="btn btn-footer" color="link" onClick={() => { ReactGA.event({ category: 'Footer', action: 'Ir a Buscar nuevos' }); history.push('/SearchCars?text=&carState=Nuevo'); }}>Comprar</Button>
          <Button className="btn btn-footer" color="link" onClick={() => { ReactGA.event({ category: 'Footer', action: 'Ir a Buscar usados' }); history.push('/SearchCars?text=&carState=Usado'); }}>Vender</Button>
          <Button className="btn btn-footer" color="link" onClick={() => { ReactGA.event({ category: 'Footer', action: 'Ir a Créditos Prendarios' }); history.push('/pledgeCredits'); }}>Financiación</Button>
          <Button className="btn btn-footer" color="link" onClick={() => { ReactGA.event({ category: 'Footer', action: 'Ir a Concesionarias' }); history.push('/friendlyAgency'); }}>Concesionarias</Button>
          <Button className="btn btn-footer" color="link" onClick={() => { ReactGA.event({ category: 'Footer', action: 'Ir a Registro Agencia' }); history.push('/agencyRegisterS1'); }}>Seguros online</Button>
          <Button className="btn btn-footer" color="link" onClick={() => { ReactGA.event({ category: 'Footer', action: 'Ir a Personal Shopper' }); history.push('/personalShopperS1'); }}>Personal Shopper</Button>
          <Button className="btn btn-footerTerms" color="link" onClick={() => { ReactGA.event({ category: 'Footer', action: 'Ir a Términos y condiciones' }); history.push('/termsAndConditions'); }}>Términos y Condiciones</Button>
        </div>
        <div className="col-md-12 text-center">
          <hr />
          <p>© Copyright 2017/2018 - Todos los derechos reservados.</p>
        </div>
      </Row>
    </div>
  </footer>
);


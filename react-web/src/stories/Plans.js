import React from 'react';
import { Col, Row, Button } from 'reactstrap';
/* eslint react/jsx-filename-extension: 0 */

export default ({ history }) => (
  <Col sm="12" className="bg-100 mb-4 mt-4">
    <div className="container">
      <div className="row">
        <div className="col-12">
          <h3 className="title-division">Planes gratis a tu medida</h3>
        </div>
      </div>
      <Row className="justify-content-around align-items-stretch" >
        <Col lg="4" md="12" sm="12" xs="12" className="mb-4">
          <div className="card card-plans">
            <h4>Básica Particular</h4>
            <ul>
              <li>Una publicación gratis</li>
              <li>Tiempo de la publicación: 60 días</li>
              <li>Inmediata, sin registro</li>
            </ul>
            <Button color="secondary" className="btn-lg align-self-start justify-content-end" onClick={() => history.push('/publicateWithoutRegister')}>Comenzar</Button>
          </div>
        </Col>
        <Col lg="4" md="12" sm="12" xs="12" className="mb-4">
          <div className="card card-plans">
            <h4>Premium Particular</h4>
            <ul>
              <li>Publicaciones gratis ilimitadas</li>
              <li>Tiempo de publicación: 60 días.</li>
              <li>Panel de Control de autos publicados.</li>
              <li>Chat con los interesados</li>
              <li>Anuncios destacados ilimitados</li>
              <li>Publicaciones en redes sociales y fan page de miautohoy.com</li>
            </ul>
            <Button color="secondary" className="btn-lg align-self-start justify-content-end" onClick={() => history.push('/userRegisterS1')}>Comenzar</Button>
          </div>
        </Col>
        <Col lg="4" md="12" sm="12" xs="12" className="mb-4">
          <div className="card card-plans">
            <h4>Premium Concesionaria</h4>
            <ul>
              <li>Publicaciones gratis ilimitadas</li>
              <li>Tiempo de publicación: 60 días.</li>
              <li>Posibilidad de compra garantizada si transcurridos los 60 días no vendió su auto.</li>
              <li>Panel de Control de autos publicados.</li><li>Chat con los interesados</li>
              <li>Anuncios destacados ilimitados</li>
              <li>Minisitio Concesionario</li>
              <li>Publicaciones en redes sociales y fan page de miautohoy.com</li>
            </ul>
            <Button color="secondary" className="btn-lg align-self-start justify-content-end" onClick={() => history.push('/agencyRegisterS1')}>Comenzar</Button>
          </div>
        </Col>
      </Row>
    </div>
  </Col>
);


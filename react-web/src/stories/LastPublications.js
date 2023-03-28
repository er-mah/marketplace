import React from 'react';
import { Col, Row } from 'reactstrap';
/* eslint react/jsx-filename-extension: 0 */


export default ({ children }) => {
  const item = children.map(row =>
    (<Col lg="3" md="6" sm="12" xs="12" className="box-item" >
      {row}
    </Col>
    ));


  return (
    <div className="container">
      <Row className="container-box-item">
        <Col md="12">
          <h3 className="title-division">Últimos Publicados</h3>
        </Col>
      </Row>
      <Row className="container-box-item">
        {item}
      </Row>
    </div>);
};

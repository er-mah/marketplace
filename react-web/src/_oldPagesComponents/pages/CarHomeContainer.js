import React from 'react';
import { Col, Row } from 'reactstrap';
/* eslint react/jsx-filename-extension: 0 */


export default ({ children, mobile }) => {
  const item = mobile
    ? <Col md="12" className="box-item">{children}</Col>
    : children.map((row, index) =>
      (<Col key={index} lg="3" md="6" sm="12" xs="12" className="box-item" >
        {row}
      </Col>));


  return (
    <div className="container">
      <Row className="container-box-item">
        <Col md="12">
          <h3 className="title-division">Destacados</h3>
        </Col>
      </Row>
      <Row className="container-box-item">
        {item}
      </Row>
    </div>);
};

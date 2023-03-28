import React from 'react';
import { Col, Row } from 'reactstrap';
import FlipMove from 'react-flip-move';
/* eslint react/jsx-filename-extension: 0 */

export default ({ children }) => {
  const item = children.map(row =>
    (<Col key={row.id} lg="4" md="4" sm="6" xs="12" className="box-item">
      <FlipMove duration={250} staggerDurationBy={20} enterAnimation="fade" staggerDelayBy={300}>
        {row}
      </FlipMove>
     </Col>
    ));

  return (
    <div className="">
      <Row className="container-box-item">
          {item}
        </Row>
    </div>);
};

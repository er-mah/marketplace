/* eslint react/jsx-filename-extension: 0 */
/* eslint react/prop-types: 0 */

import React from 'react';
import { Col, Row, Modal, ModalHeader, ModalBody, ModalFooter, Button, Label } from 'reactstrap';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

import AdminBar from '../../../stories/AdminBar';


class AgencyAdmin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal,
    });
  }

  render() {
    const data = [
      { name: 'Nov 1', autos: 2 },
      { name: 'Nov 15', autos: 4 },
      { name: 'Dic 1', autos: 3 },
      { name: 'Dic 15', autos: 5 },
      { name: 'Ene 1', autos: 5 },
      { name: 'Ene 15', autos: 7 },
      { name: 'Feb 1', autos: 6 },
    ];

    return (
      <div>
        <AdminBar history={this.props.history} />
        <div className="container-fluid">
          <Row>
            <Col md="3">
              <AdminSideBar history={this.props.history} location={this.props.location} />
            </Col>
            <Col md="9" className="mt-4">
              <Row>
                <Col md="8">
                  <Label for="exampleEmail">Reporte de autos vendidos</Label>
                  <LineChart
                    width={600}
                    height={300}
                    data={data}
                    margin={{
                    top: 5, right: 20, bottom: 5, left: 0,
                    }}
                  >
                    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="autos" stroke="blue" />
                  </LineChart>
                </Col>
                <Col md="4">
                  <div className="data-graph">
                    <a
                      onClick={() => this.props.history.push('/agencyMessage')}
                      color="default"
                    >
                      <div className="row">
                        <div className="col-8">
                          <h2>3</h2>
                          <p>Nuevos Mensajes</p>
                        </div>
                        <div className="col-4">
                          <div className="container-icon">
                            <img src="/assets/utils/icon-comments-white.svg" alt="" />
                          </div>
                        </div>
                      </div>
                    </a>
                  </div>

                  <div className="data-graph">
                    <a
                      onClick={() => this.props.history.push('/agencyPublications')}
                      color="default"
                    >
                      <div className="row">
                        <div className="col-8">
                          <h2>3</h2>
                          <p>Publicaciones activas</p>
                        </div>
                        <div className="col-4">
                          <div className="container-icon">
                            <img src="/assets/utils/icon-car-white.svg" alt="" />
                          </div>
                        </div>
                      </div>
                    </a>
                  </div>


                  <div className="data-graph">
                    <a
                      onClick={() => this.props.history.push('/agencyPublications')}
                      color="default"
                    >
                      <div className="row">
                        <div className="col-8">
                          <h2>3</h2>
                          <p>Destacados</p>
                        </div>
                        <div className="col-4">
                          <div className="container-icon">
                            <img src="/assets/utils/icon-star-white.svg" alt="" />
                          </div>
                        </div>
                      </div>
                    </a>
                  </div>

                </Col>
              </Row>
            </Col>
          </Row>
          <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
            <ModalHeader toggle={this.toggle}>Felicitaciones</ModalHeader>
            <ModalBody>
              <div className="col-md-6 offset-md-3">
              El pedido para destacar su publicación ha sido enviado. A la brevedad nos comunicaremos con usted.
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={() => this.toggle()}>OK</Button>
            </ModalFooter>
          </Modal>
        </div>
      </div>
    );
  }
}

export default AgencyAdmin;

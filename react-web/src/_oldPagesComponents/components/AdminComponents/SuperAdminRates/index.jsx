import React, { Component } from 'react';
import { Col, Row } from 'reactstrap';
// Todo: adapt this
// import { graphql, compose } from 'react-apollo';

import { getUserToken, isAdminLogged } from '../../../modules/sessionFunctions';
import AdminBar from '../../../pages/_old/AdminBar';
import InputRate from '../../../pages/_old/InputRate';
import SuperAdminSideBar from '../../../pages/_old/SuperAdminSideBar';
import { RatesQuery } from '../../../graphql/_old/RatesQuery';

class SuperAdminRates extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modifyActive: false,
    };
    this.update = this.update.bind(this);
  }

  componentWillMount() {
    if (!isAdminLogged()) {
      this.props.history.push('/loginAdmin');
    }
    this.getRates(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.getRates(nextProps);
  }

  getRates(props) {
    if (!props.rates.loading) {
      this.setState({
        rate0: props.rates.AllRates[0].rate,
        rate1: props.rates.AllRates[1].rate,
        rate2: props.rates.AllRates[2].rate,
        rate3: props.rates.AllRates[3].rate,
        rate4: props.rates.AllRates[4].rate,
        rate5: props.rates.AllRates[5].rate,
        rate6: props.rates.AllRates[6].rate,
        rate7: props.rates.AllRates[7].rate,
      });
    }
  }

  update() {
    this.props.ratesUpdate({
      variables: {
        MAHtoken: getUserToken(),
        name: this.state.name,
        address: this.state.address,
        phone: this.state.phone,
      },
      refetchQueries: ['User'],
    }).then(({ data: { modifyUserData: uData } }) => {
      this.setState({
        modal: true,
        name: uData.name,
        address: uData.address,
        phone: uData.phone,
        responseTitle: 'Felicitaciones',
        responseMsg: 'Datos actualizados con éxito',
      });
      this.toggle();
    }).catch(err => console.log(err));
  }

  render() {
    const { location, history, rates } = this.props;
    return (
      <div>
        <AdminBar history={history} />
        <div className="container-fluid">
          <Row>
            <Col lg="3" md="12" >
              <SuperAdminSideBar history={history} location={location} />
            </Col>
            <Col lg="9" md="12" sm="12">
              {!rates.loading &&
              <div className="d-flex flex-md-row flex-sm-column" >
                <Col lg="6" md="6" sm="12" className="container-data-input-group mt-4">
                  <div className="card p-4" style={{ height: '100%' }}>
                    <h6 className="title-division"><b>Tasas 2008 - 0km</b></h6>
                    <div className="data-input-group">
                      <InputRate
                        element={rates.AllRates[0]}
                        label="Plazo 12"
                        text={this.state.rate0}
                        onChange={rate0 => this.setState({ rate0 })}
                      />
                      <InputRate
                        element={rates.AllRates[1]}
                        label="Plazo 18"
                        text={this.state.rate1}
                        onChange={rate1 => this.setState({ rate1 })}
                      />
                      <InputRate
                        element={rates.AllRates[2]}
                        label="Plazo 24"
                        text={this.state.rate2}
                        onChange={rate2 => this.setState({ rate2 })}
                      />
                      <InputRate
                        element={rates.AllRates[3]}
                        label="Plazo 36"
                        text={this.state.rate3}
                        onChange={rate3 => this.setState({ rate3 })}
                      />
                    </div>
                  </div>
                </Col>
                <Col lg="6" md="6" sm="12" className="container-data-input-group mt-4">
                  <div className="card p-4" style={{ height: '100%' }}>
                    <h6 className="title-division"><b>Tasas 2003 - 2007</b></h6>
                    <div className="data-input-group">
                      <InputRate
                        element={rates.AllRates[4]}
                        label="Plazo 12"
                        text={this.state.rate4}
                        onChange={rate4 => this.setState({ rate4 })}
                      />
                      <InputRate
                        element={rates.AllRates[5]}
                        label="Plazo 18"
                        text={this.state.rate5}
                        onChange={rate5 => this.setState({ rate5 })}
                      />
                      <InputRate
                        element={rates.AllRates[6]}
                        label="Plazo 24"
                        text={this.state.rate6}
                        onChange={rate6 => this.setState({ rate6 })}
                      />
                      <InputRate
                        element={rates.AllRates[7]}
                        label="Plazo 36"
                        text={this.state.rate7}
                        onChange={rate7 => this.setState({ rate7 })}
                      />
                    </div>
                  </div>
                </Col>
              </div>}
            </Col>
          </Row>

        </div>
      </div>);
  }
}


const withRatesQuery = graphql(RatesQuery, { name: 'rates' });
const withData = compose(withRatesQuery);

export default withData(SuperAdminRates);

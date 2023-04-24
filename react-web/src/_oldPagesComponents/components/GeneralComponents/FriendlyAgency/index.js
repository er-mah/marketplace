/* eslint react/jsx-filename-extension: 0 */
/* eslint react/prop-types: 0 */

import React, { Component } from 'react';
import { Col, Row, Button, Alert } from 'reactstrap';
// todo: adapt this
//import { graphql, compose } from 'react-apollo';
import _ from 'lodash';
import { Helmet } from 'react-helmet';
import ReactGA from 'react-ga';

import {scroller} from 'react-scroll';
import { AvForm, AvGroup, AvField } from 'availity-reactstrap-validation';
import {validate} from '../../../modules/functions';

import TopTopNav from '../../../pages/_old/TopTopNav';
import Header from '../../Header';
import PublicityBanner from '../../../pages/_old/PublicityBanner';
import CardAgency from '../../../pages/_old/CardAgency';
import Footer from '../../Footer';
import { GetAllAgencies } from '../../../graphql/_old/FriendlyAgencyQueries';

class FriendlyAgency extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nameAgency: '',
      nameAgencyValidate: false,
      email: '',
      emailValidate: false,
    };
    this.redirect = this.redirect.bind(this);
    ReactGA.pageview('/CONCESIONARIAS');
  }

  redirect(event, errors) {
    if (!_.isEmpty(errors)) {
      scroller.scrollTo(errors[0], {
        duration: 600,
        smooth: true,
        offset: -100
      });
      return false;
    } 
    ReactGA.event({
      category: 'Concesionarias',
      action: 'Registrar una agencia',
    });
    this.props.history.push(`/agencyRegisterS1?email=${this.state.email}&nameAgency=${this.state.nameAgency}`);
  }

  render() {
    const { history, location, Agencies } = this.props;
    return (
      <div>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Concesionarios Adheridos</title>
        </Helmet>
        <div>
          <Header
            history={history}
            location={location}
          />
          <div className="container">
            <Row className="mt-4">
              <Col md="8" sm="12" xs="12" />
              <Col lg="4" md="12" sm="12" xs="12">
                <PublicityBanner history={history} />
              </Col>
            </Row>
            <Row>
              <Col md="12" sm="12" xs="12">
                <h3 className="title-division">Concesionarios adheridos</h3>
              </Col>
            </Row>
            <Row>
              <Col lg="8" md="12" sm="12" xs="12" className="container-data-input-group">
                {Agencies.loading ?
                  <img
                    className="loading-gif"
                    style={{ height: '70px' }}
                    src="/assets/utils/loading.gif"
                    key={0}
                    alt="Loading..."
                  /> :
                  _.orderBy(Agencies.GetAllAgencies, ['agencyName', 'asc']).map(agencyData => <CardAgency data={agencyData} history={history} />)
                }
              </Col>
              <Col lg="3" md="12" sm="12" xs="12">
                <h5 className="title-division-primary">Adherí tu compañía, <br /> es muy fácil.</h5>
                <p>Publicaciones gratis ilimitadas.</p>
                <div className="cont-form">
                  <h5><strong>¡Registrate gratis y empezá a vender ahora!</strong></h5>
                  <AvForm onSubmit={this.redirect}>
                  <label>Nombre de la concesionaria</label>
                  <AvField
                    value={this.state.nameAgency}
                    onChange={event => this.setState({ nameAgency: event.target.value })}
                    name="nameAgency"
                    id="nameAgency"
                    validate={validate('text')} 
                    className="form-control"
                  />
                  <label> Email </label>
                  <AvField
                    type="email"
                    value={this.state.email}
                    onChange={event => this.setState({ email: event.target.value })}
                    name="email"
                    id="email"
                    validate={validate('email')} 
                    className="form-control"
                  />
                  <Button color="primary" className="btn-block" type="submit" >Comenzar</Button>
                  </AvForm>
                </div>
              </Col>
            </Row>
          </div>
          <Footer history={history} />
        </div>
      </div>
    );
  }
}
const withAgenciesData = graphql(GetAllAgencies, { name: 'Agencies' });
const withData = compose(withAgenciesData);
export default withData(FriendlyAgency);

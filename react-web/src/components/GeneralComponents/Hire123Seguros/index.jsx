import React, { Component, Fragment } from 'react';
import ReactGA from 'react-ga';
import _ from 'lodash';
import qs from 'query-string';
import ScrollToTop from 'react-scroll-up';
import { scroller } from 'react-scroll';
import ReactHyperResponsiveTable from 'react-hyper-responsive-table';
import { Col, Row, Button } from 'reactstrap';
import { graphql } from 'react-apollo';
import { split } from 'split-object';
import { get123Quotes, assurance123Seguro } from '../../../modules/fetches';

import SearchMutation from '../../../apolloQueries/SearchMutation';
import Footer from '../../../stories/Footer';
import BreadCrum from '../../../stories/BreadCrum';
import PublicityBanner from '../../../stories/PublicityBanner';
import Header from '../../../stories/Header';
import TopTopNav from '../../../stories/TopTopNav';

import { thousands } from '../../../modules/functions';
import { Object } from 'core-js';

const logoCruz = <img src="/assets/utils/icon-cruz.svg" alt="" className="logo" />;


class Hire123Seguros extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDetail: false,
      coverageSelected: '',
      coverages: [
        {
          name: 'allianz',
          loading: true,
        },
        {
          name: 'zurich',
          loading: true,
        },
        {
          name: 'mapfre',
          loading: true,
        },
        {
          name: 'sancor',
          loading: true,
        },
        {
          name: 'meridional',
          loading: true,
        },
        // {
        //   name: 'provincia',
        //   loading: true,
        // },
        // {
        //   name: 'mercantil',
        //   loading: true,
        // },
        // {
        //   name: 'orbis',
        //   loading: true,
        // },
      ],
    };
    this.selectCoverage = this.selectCoverage.bind(this);
    this.handleClickContratar = this.handleClickContratar.bind(this);
    ReactGA.pageview('/Contratar 123seguro');
  }

  componentDidMount() {
    const { response, data } = this.props.location.state;
    response.companias.map((row) => {
      get123Quotes({ company_id: row.id, company: row.name, producto_id: response.data.id }) // 556214
        .then((responseAPI) => {
          if (!_.has(responseAPI.data, 'errors')) {
            const allCoverages = this.state.coverages;
            const fetchedCoverage = allCoverages.find((ec => ec.name === row.name));
            fetchedCoverage.loading = false;
            const coverageUpdated = Object.assign({}, fetchedCoverage, responseAPI.data);
            const remainingCoverages = this.state.coverages.filter(allCov => allCov.name !== row.name);
            const newState = remainingCoverages.map(remai => remai);
            newState.push(coverageUpdated);
            this.setState({
              coverages: newState,
            });
          } else {
            const allCoverages = this.state.coverages;
            const fetchedCoverage = allCoverages.find((ec => ec.name === row.name));
            if (!fetchedCoverage) {
              console.log(row.name);
            } else {
              fetchedCoverage.loading = false;
              const remainingCoverages = this.state.coverages.filter(allCov => allCov.name !== row.name);
              const newState = remainingCoverages.map(remai => remai);
              newState.push(fetchedCoverage);
              this.setState({
                coverages: newState,
              });
            }
          }
        });
    });
  }


  getHigherValue(object) {
    let value = 0;
    split(object).forEach((row) => {
      if (parseInt(row.value, 10) > value) {
        value = row.value;
      }
    });
    return value;
  }

  getCoveragesPrice(coverageObject) {
    const { name, loading } = coverageObject;
    if (loading) {
      return ({ loading: true });
    }
    const prices = [];
    split(coverageObject.prices).forEach((price) => {
      let value = 0;
      let coberturaInterna;
      let detail;
      let prima = {};
      let premio = {};
      const cobertura = price.key;
      split(price.value).forEach((priceRow) => {
        if (priceRow.key === 'cobertura_interna_id') {
          coberturaInterna = priceRow.value;
        }
        if (priceRow.key === 'items') {
          detail = priceRow.value;
        }
        if (priceRow.key === 'premio') {
          premio = priceRow.value;
          if (this.getHigherValue(priceRow.value) > value) {
            value = this.getHigherValue(priceRow.value);
          }
        } else if (priceRow.key === 'prima') {
          prima = priceRow.value;
          if (this.getHigherValue(priceRow.value) > value) {
            value = this.getHigherValue(priceRow.value);
          }
        }
      });
      prices.push({
        value, cobertura, coberturaInterna, detail, name, prima, premio,
      });
    });
    return ({ name, prices });
  }
  getCoverage(coverageObject, coverageID) {
    const { name, prices, loading } = this.getCoveragesPrice(coverageObject);
    if (loading) {
      return (<img
        style={{ height: '85px', paddingTop: '10px' }}
        src="/assets/utils/loading.gif"
        key={0}
        alt="Loading..."
      />);
    }
    const coverageSelected = prices.filter(row => parseInt(row.cobertura, 10) === coverageID)[0];
    if (_.isEmpty(coverageSelected)) {
      return logoCruz;
    }
    return (<Fragment>
      <div className="coverage">
        <span>${thousands(coverageSelected.value)}</span>
        <button onClick={() => this.selectCoverage(coverageSelected)} >Ver detalle</button>
      </div>
      <div className="coverage-mobile">
        <button onClick={() => this.selectCoverage(coverageSelected)} >${thousands(coverageSelected.value)}</button>
      </div>
    </Fragment>
    );
  }

  selectCoverage(coverageSelected) {
    scroller.scrollTo('card-coverage', {
      duration: 600,
      smooth: true,
      offset: -120,
    });
    this.setState({
      showDetail: true,
      coverageSelected,
      imageSelected: coverageSelected.name,
    });
  }
  handleClickContratar() {
    const data = {
      cobertura_id: this.state.coverageSelected.cobertura,
      cobertura_interna_id: split(this.state.coverageSelected.coberturaInterna).map(row => row.value)[0],
      compania_id: this.state.coverageSelected.name,
      prima: split(this.state.coverageSelected.coberturaInterna).map(row => row.key)[0],
      premio: split(this.state.coverageSelected.coberturaInterna).map(row => row.key)[0],
      nombre: this.props.location.state.data.nombre,
      apellido: this.props.location.state.data.apellido,
      mail: this.props.location.state.data.mail,
      telefono: this.props.location.state.data.telefono,
      user_id: this.props.location.state.response.data.usuario_id,
      car_id: this.props.location.state.response.data.id,
    };
    assurance123Seguro(data)
      .then(res => console.log(res))
      .catch(err => console.log(err));
  }

  render() {
    const headers = {};
    this.props.location.state.response.coberturas.forEach((row) => {
      // A, B0, B1, C0, C1, C+, CG, D, DZ
      if (
        row.id === 2 ||
        row.id === 4 ||
        row.id === 6 ||
        row.id === 7 ||
        row.id === 8
      ) { headers[row.id] = [row.descripcion]; }
    });
    headers.image = <img src="/assets/images/partners/aseguradoras123/123seguro-logo.svg" alt="" className="logo" />;

    const rows = this.state.coverages.map(item => ({
      image: <div className="td-image"><img src={`/assets/images/aseguradoras123/${item.name}.png`} alt="" className="logo" /></div>,
      2: this.getCoverage(item, 2),
      4: this.getCoverage(item, 4),
      6: this.getCoverage(item, 6),
      7: this.getCoverage(item, 7),
      8: this.getCoverage(item, 8),
    }));
    // }));
    const keyGetter = row => row.name;
    const {
      text,
    } = qs.parse(this.props.location.search);
    const { history, location } = this.props;
    return (
      <div>
        {/* <TopTopNav history={history} /> */}
        <Header
          text={text}
          history={history}
          location={location}
        />
        <div className="container mb-4 mt-4">
          <Row>
            <Col md="8" sm="12" xs="12">
              <BreadCrum url={window.location.href} history={history} />
            </Col>
            <Col md="4" sm="12" xs="12">
              <PublicityBanner history={history} />
            </Col>
          </Row>
        </div>
        <div className="container">
          <h4 className="title-hire123">Elegí un seguro para tu auto</h4>
          <ReactHyperResponsiveTable
            headers={headers}
            rows={rows}
            keyGetter={keyGetter}
            breakpoint={578}
            tableStyling={({ narrow }) => (narrow ? 'narrowtable' : 'widetable')}
          />
          {this.state.showDetail && <div className="card-coverage" id="card-coverage" >
            <div className="card-coverage-title">
              <img src={`/assets/images/aseguradoras123/${this.state.imageSelected}.png`} alt="" className="logo" />
              <div className="card-coverage-title1" >
                <p>${thousands(this.state.coverageSelected.value)}</p>
                <Button color="primary" onClick={this.handleClickContratar}>CONTRATAR</Button>
              </div>
            </div>
            <ul className="card-coverage-detail">
              <h3>{this.state.coverageSelected.name}</h3>
              {this.state.coverageSelected.detail.map(item => <li>{item}</li>)}
            </ul>
                                    </div>
          }
        </div>
        <Footer history={history} />
        <ScrollToTop showUnder={320}>
          <img style={{ width: '30px' }} src="/assets/utils/icon-arrow-top.svg" alt="Inicio" />
        </ScrollToTop>
      </div>
    );
  }
}


export default graphql(SearchMutation)(Hire123Seguros);


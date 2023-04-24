
/* eslint react/jsx-filename-extension: 0 */
/* eslint react/prop-types: 0 */
import React, { Component } from 'react';
import { Col } from 'reactstrap';
// Todo: adapt this
// import { graphql, compose } from 'react-apollo';
import qs from 'query-string';
import { animateScroll as scroll } from 'react-scroll';
import InfiniteScroll from 'react-infinite-scroller';
import { Helmet } from 'react-helmet';
import ReactGA from 'react-ga';

import SearchMutation from '../../../graphql/_old/SearchMutation';
import { GetAgencyDetail } from '../../../graphql/_old/FriendlyAgencyQueries';

import CarResultContainer from '../../../pages/_old/CarResultContainer';
import CarResult from '../../../pages/_old/CarResult';
import Header from '../../Header';
import TopTopNav from '../../../pages/_old/TopTopNav';
import NumberOfResult from '../../../pages/_old/NumberOfResult';
import HeaderAgency from '../../../pages/_old/HeaderAgency';

import photoGaleryParser from '../../../modules/photoGaleryParser';

class Microsite extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: { searchPublication: '' },
      totalCount: 0,
    };
  }
  componentWillMount() {
    const url = this.props.location.search;
    this.doSearch(url);
    ReactGA.pageview('/MICROSITIO');
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.location.search !== nextProps.location.search) {
      this.doSearch(nextProps.location.search);
    }
    scroll.scrollToTop({ duration: 300 });
  }
  doSearch(url) {
    this.props
      .mutate({
        variables: {
          user_id: qs.parse(url).c_id,
          state: 'Activas'
        },
      })
      .then(({ data }) => {
        this.setState({
          data,
          totalCount: data.searchPublication.totalCount,
        });
      })
      .catch((error) => {
        console.log('there was an error sending the query', error);
      });
  }
  renderData() {
    if (this.state.totalCount === 0) {
      return <p className="m-15">Esta agencia no posee publiciones activas. </p>;
    }
    if (this.state.data.searchPublication === '') {
      return <p className="m-15">Cargando...</p>;
    }
    return (
      <div>
        <div className="offset-lg-3">
          <br />
          <NumberOfResult results={this.state.totalCount} concesionaria />
          <CarResultContainer>
            {this.state.data.searchPublication.Publications.map(row => (
              <CarResult
                photoGalery={photoGaleryParser(row.ImageGroup)}
                data={row}
                {...{ [row.State]: true }}
              />
        ))}
          </CarResultContainer>
        </div>
      </div>
    );
  }

  render() {
    const { text } = qs.parse(this.props.location.search);
    const {
      history, location, AgencyData,
    } = this.props;
    return (
      <div>
         <Helmet>
          <meta charSet="utf-8" />
          <title>{`Concesionaria ${qs.parse(this.props.location.search).concesionaria} - Mi auto Hoy`}</title>
        </Helmet>
        {/* <TopTopNav history={history} /> */}
        <Header
          text={text}
          history={history}
          location={location}
        />
        {AgencyData.loading ?
          <img
            className="loading-gif"
            style={{ height: '250px' }}
            src="/assets/utils/loading.gif"
            key={0}
            alt="Loading..."
          /> :
          <HeaderAgency data={AgencyData.GetAgencyDetail} />
        }
        <Col md={12}>
          <InfiniteScroll
            pageStart={0}
            loadMore={this.doSearch}
            hasMore={this.state.renderedData < this.state.totalCount}
            loader={<img className="loading-gif" src="/assets/utils/loading.gif" key={0} alt="Loading..." />}
          >
            {this.renderData()}
          </InfiniteScroll>
        </Col>
      </div>
    );
  }
}
const options = ({ location }) => ({
  variables: {
    id: qs.parse(location.search).c_id,
  },
});
const withSearchMutation = graphql(SearchMutation);
const withAgencyDetail = graphql(GetAgencyDetail, {
  name: 'AgencyData',
  options,
});

const withData = compose(withAgencyDetail, withSearchMutation);

export default withData(Microsite);

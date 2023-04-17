/* eslint react/jsx-filename-extension: 0 */
/* eslint react/prop-types: 0 */

import React from 'react';
import { Col, Row, Modal, ModalHeader, ModalBody, ModalFooter, Button, Label } from 'reactstrap';
import qs from 'query-string';
// Todo: adapt this
// import { graphql, compose } from 'react-apollo';
import InfiniteScroll from 'react-infinite-scroller';
import _ from 'lodash';
import { animateScroll as scroll } from 'react-scroll';
import { Helmet } from 'react-helmet';
import ScrollToTop from 'react-scroll-up';

import AdminBar from '../../../pages/old/AdminBar';
import SuperAdminFilter from '../../../pages/old/SuperAdminFilter';
import SuperAdminSideBar from '../../../pages/old/SuperAdminSideBar';
import SACardPublication from '../../../pages/old/SACardPublication';
import { isAdminLogged } from '../../../modules/sessionFunctions';
import { SearchUserPublicationQuery } from '../../../graphql/old/UserPublicationsQuery';

class SuperAdminPublications extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      publications: [],
      totalCount: 0,
      hasNextPage: false,
      renderedData: 0,
    };
    
    this.doSearch = this.doSearch.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  componentWillMount() {
    scroll.scrollTo(0, { duration: 2000 });
    if (!isAdminLogged()) {
      this.props.history.push('/loginAdmin');
    }
    return this.props.PubsPerPage()
      .then(({ data: { searchPublication: { hasNextPage, totalCount } }, data: { searchPublication: { Publications } } }) => {
        let existingPubs = this.state.publications;
        Publications.map((pub) => {
          existingPubs.push(pub);
        });
        existingPubs = _.uniqBy(existingPubs, 'id');
        this.setState({
          publications: existingPubs,
          hasNextPage,
          totalCount,
          loading: false,
          renderedData: this.state.renderedData + Publications.length,
        });
      })
      .catch(err => console.log(err));
  }

  componentWillReceiveProps(nextProps) {
    this.setState({});
    if (nextProps.location.search !== this.props.location.search) {
      this.setState({}, () => {
        this.doSearch(1, true, nextProps);
      });
    }
  }

  doSearch(page, newSearch, nextProps) {
    let location;
    if (nextProps) { location = nextProps.location; } else {
      location = this.props.location;
    }
      this.props.PubsPerPage({
      variables: {
        state: qs.parse(location.search).stateName,
        carState: qs.parse(location.search).carState,
        userType: qs.parse(location.search).userType,
        page,
      },
    })
      .then(({ data: { searchPublication: { hasNextPage, totalCount } }, data: { searchPublication: { Publications } } }) => {
        let existingPubs = this.state.publications;
        Publications.map((pub) => {
          existingPubs.push(pub);
        });
        existingPubs = _.uniqBy(existingPubs, 'id');
        if (newSearch) {
          this.setState({
            publications: Publications,
            hasNextPage,
            totalCount,
            loading: false,
            renderedData: this.state.renderedData + Publications.length,
          });
        } else {
          this.setState({
            publications: existingPubs,
            hasNextPage,
            totalCount,
            loading: false,
            renderedData: this.state.renderedData + Publications.length,
          });
        }
      });
  }

  toggle() {
    this.setState({
      modal: !this.state.modal,
    });
  }

  renderData() {
    const {
      hasNextPage,
    } = this.state;

    if (this.state.loading) {
      return <p>Cargando...</p>;
    }
    const {
      publications, totalCount,
    } = this.state;
    if (totalCount === 0) {
      return 'No hay resultados, pruebe con otros filtros';
    }
    const items = [];
    publications.map(pub => (
      items.push(<SACardPublication data={pub} history={this.props.history} key={pub.id} onHighlight={() => this.toggle()} />)));
    if (hasNextPage === false) {
      items.push(<p>No hay más publicaciones que mostrar</p>);
    }
    return items;
  }

  render() {
    return (
      <div style={{ height: '1000px' }}>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Administrador de Mi Auto Hoy</title>
        </Helmet>
        <AdminBar history={this.props.history} />
        <div className="container-fluid">
          <Row>
            <Col lg="3" md="12" >
              <SuperAdminSideBar history={this.props.history} location={this.props.location} />
            </Col>
            <Col lg="9" md="12">
              <SuperAdminFilter history={this.props.history} location={this.props.location} />
              <div className="container-box-item">
                <div className="col-12">
                  <InfiniteScroll
                    pageStart={0}
                    initialLoad={false}
                    loadMore={this.doSearch}
                    hasMore={this.state.renderedData < this.state.totalCount}
                    loader={<img className="loading-gif" src="/assets/utils/loading.gif" key={0} alt="Loading..." />}
                  >
                    {this.renderData()}
                  </InfiniteScroll>
                </div>
              </div>
            </Col>
            <ScrollToTop showUnder={320} >
              <img style={{ width: '30px' }} src="/assets/utils/icon-arrow-top.svg" alt="Inicio" />
            </ScrollToTop>
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

const options = ({ location }) => ({
  variables: {
    state: qs.parse(location.search).stateName,
    carState: qs.parse(location.search).carState,
    page: 1,
  },
});
const withPublicationsPerPage = graphql(SearchUserPublicationQuery, {
  name: 'PubsPerPage',
  options,
});
const withData = compose(withPublicationsPerPage);

export default withData(SuperAdminPublications);

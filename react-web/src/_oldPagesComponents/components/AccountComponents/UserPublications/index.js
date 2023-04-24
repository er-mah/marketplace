/* eslint react/jsx-filename-extension: 0 */
/* eslint react/prop-types: 0 */

import React from 'react';
import { Col, Row, Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import qs from 'query-string';
// Todo: adapt this
// import { graphql, compose } from 'react-apollo';
import InfiniteScroll from 'react-infinite-scroller';
import FlipMove from 'react-flip-move';
import ScrollToTop from 'react-scroll-up';
import { branch, renderComponent } from 'recompose';
import { animateScroll as scroll } from 'react-scroll';
import _ from 'lodash';
import ReactGA from 'react-ga';


import AdminBar from '../../../pages/_old/AdminBar';
import UserSideBar from '../../../pages/_old/UserSideBar';
import AdminFilter from '../../../pages/_old/AdminFilter';
import CardPublication from '../../../pages/_old/CardPublication';
import NumberOfResult from '../../../pages/_old/NumberOfResult';
import { isUserLogged, getUserDataFromToken } from '../../../modules/sessionFunctions';
import { SearchUserPublicationQuery } from '../../../graphql/_old/UserPublicationsQuery';

import Login from '../../../pages/auth/Login';


const renderUnloggedUser = (component, propName = 'data') =>
  branch(
    () => !isUserLogged(),
    renderComponent(component),
  );

class UserPublications extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      publications: [],
      totalCount: 0,
      hasNextPage: false,
      renderedData: 0,
      modal: false,
      modalTitle: '',
      modalMessage: '',
    };

    this.doSearch = this.doSearch.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  componentWillMount() {
    ReactGA.pageview('/USUARIO-PUBLICACIONES');
    this.props.PubsPerPage()
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
    scroll.scrollTo(100, { duration: 1000 });
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
        user_id: getUserDataFromToken().id,
        state: qs.parse(location.search).stateName,
        carState: qs.parse(location.search).carState,
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
      modalTitle: 'Felicitaciones',
      modalMessage: 'El pedido para destacar su publicación ha sido enviado. A la brevedad nos comunicaremos con usted',
      modal: !this.state.modal,
    });
  }
  renderData() {
    const {
      hasNextPage,
    } = this.state;

    if (this.state.loading) {
      return <p className="m-15">Cargando...</p>;
    }
    const {
      publications, totalCount,
    } = this.state;
    const items = publications.map(pub => (
      (<CardPublication history={this.props.history} data={pub} key={pub.id} onHighlight={() => this.toggle()} />)));
    if (totalCount === 0 && hasNextPage === false) {
      items.push(<p className="m-15">No se encontraron publicaciones.</p>);
    }
    if (hasNextPage === false && totalCount !== 0) {
      items.push(<p className="m-15">No hay más publicaciones que mostrar</p>);
    }
    return items;
  }
  render() {
    const {
      history, location,
    } = this.props;
    return (
      <div style={{ height: '1000px' }}>
        <AdminBar history={history} />
        <div className="container">
          <Row>
            <Col lg="3" md="12" sm="12" xs="12">
              <UserSideBar history={history} location={location} />
            </Col>
            <Col lg="9" md="12" sm="12" xs="12" className="mt-4">
              {this.state.totalCount === 0
                ? <p className="m-15" >No se encontraron publicaciones.</p>
                : <div>
                  <NumberOfResult results={this.state.totalCount} />
                  <AdminFilter history={history} location={location} />
                  <div className="container-box-item">
                    <div className="col-12">
                      <FlipMove duration={1000} appearAnimation="fade">
                        <InfiniteScroll
                          initialLoad
                          pageStart={0}
                          loadMore={this.doSearch}
                          hasMore={this.state.hasNextPage}
                          loader={<img src="/assets/utils/loading.gif" key={0} alt="Loading..." />}
                        >
                          {this.renderData()}
                        </InfiniteScroll>
                      </FlipMove>
                    </div>
                  </div>
                  </div>
              }
            </Col>
            <ScrollToTop showUnder={320} >
              <img style={{ width: '30px' }} src="/assets/utils/icon-arrow-top.svg" alt="Inicio" />
            </ScrollToTop>
          </Row>
          <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
            <ModalHeader toggle={this.toggle}>{this.state.modalTitle}</ModalHeader>
            <ModalBody>
              <div className="col-md-6 offset-md-3">
                {this.state.modalMessage}
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
    user_id: getUserDataFromToken().id,
    state: qs.parse(location.search).stateName,
    carState: qs.parse(location.search).carState,
  },
});
const withPublicationsPerPage = graphql(SearchUserPublicationQuery, {
  name: 'PubsPerPage',
  options,
});
const withData = compose(
  withPublicationsPerPage,
  renderUnloggedUser(Login, 'PubsPerPage'),
);

export default withData(UserPublications);

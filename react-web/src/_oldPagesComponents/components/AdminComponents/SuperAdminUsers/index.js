/* eslint react/jsx-filename-extension: 0 */
/* eslint react/prop-types: 0 */

import React from 'react';
import { Col, Row } from 'reactstrap';
// Todo: adapt this
// import { withApollo } from 'react-apollo';
import InfiniteScroll from 'react-infinite-scroller';
import ScrollToTop from 'react-scroll-up';
import { parse } from 'query-string';
import _ from 'lodash';

import AdminBar from '../../../pages/old/AdminBar';
import SuperAdminFilterUser from '../../../pages/old/SuperAdminFilterUser';
import SuperAdminSideBar from '../../../pages/old/SuperAdminSideBar';
import SACardUser from '../../../pages/old/SACardUser';
import { AllUsersQuery } from '../../../graphql/old/UserQuery';
import { isAdminLogged } from '../../../modules/sessionFunctions';

class SuperAdminUsers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      totalCount: 0,
      hasNextPage: true,
      renderedData: 0,
      searchDone: false,
    };

    this.doSearch = this.doSearch.bind(this);
    this.toggle = this.toggle.bind(this);
    this.searchHasBeenMade = this.searchHasBeenMade.bind(this);
  }

  componentWillMount() {
    if (!isAdminLogged()) {
      this.props.history.push('/loginAdmin');
    }
    this.props.client.query({
      query: AllUsersQuery,
      variables: {
        page: 1,
      },
    })
      .then(response => this.setState({
        users: response.data.AllUsersResume.Users,
        totalCount: response.data.AllUsersResume.totalCount,
        renderedData: this.state.renderedData + response.data.AllUsersResume.Users.length,
      }));
  }


  doSearch(page) {
    this.props.client.query({
      query: AllUsersQuery,
        variables:{
          page
        }  
    })
      .then(({ data: { AllUsersResume: { totalCount } }, data: { AllUsersResume: { Users } }, data: { AllUsersResume: { hasNextPage } } }) => {
        let existingUser = [];

        if(this.state.users){
          existingUser = JSON.parse(JSON.stringify(this.state.users));
          existingUser = _.uniqBy(existingUser, 'id');
        }
        Users.map(user => existingUser.push(user));
        this.setState({
          users: existingUser,
          hasNextPage,
          totalCount,
          loading: false,
          renderedData: this.state.renderedData + Users.length,
        });
      });
  }

  toggle() {
    this.setState({
      modal: !this.state.modal,
    });
  }

  searchHasBeenMade(searchResult) {
    this.setState({ searchDone: true, searchUsers: searchResult });
  }
  renderSearchResults() {
    const items = [];
    if (this.state.searchUsers.totalCount === 0) {
      return 'No hay resultados, pruebe con otros filtros';
    }
    this.state.searchUsers.Users.map(user => (
      items.push(<SACardUser data={user} key={user.id} history={this.props.history} onHighlight={() => this.toggle()} />)));
    return items;
  }
  renderData() {
    if (this.state.loading) {
      return <p className="m-15">Cargando...</p>;
    }
    const {
      users, totalCount,
    } = this.state;
    if (totalCount === 0) {
      return <p className="m-15">No hay resultados, pruebe con otros filtros.</p>;
    }
    const items = [];
    users.map(user => (
      items.push(<SACardUser data={user} history={this.props.history} key={user.id} onHighlight={() => this.toggle()} />)));
    return items;
  }

  render() {
    return (
      <div>
        <AdminBar history={this.props.history} />
        <div className="container-fluid">
          <Row>
            <Col lg="3" md="12" >
              <SuperAdminSideBar history={this.props.history} location={this.props.location} />
            </Col>
            <Col lg="9" md="12" >
              <SuperAdminFilterUser history={this.props.history} location={this.props.location} searchResults={this.searchHasBeenMade} />
              <div className="container-box-item">
                <div className="col-12">
                  {this.state.searchDone ?
                    <Row>
                      {this.renderSearchResults()}
                    </Row>
                 :
                    <InfiniteScroll
                      pageStart={0}
                      loadMore={this.doSearch}
                      hasMore={this.state.hasNextPage}
                      loader={<img src="/assets/utils/loading.gif" className="loading-gif" key={0} alt="Loading..." />}
                    >
                      <Row>
                        {this.renderData()}
                      </Row>
                    </InfiniteScroll>
                  }
                </div>
              </div>
              <ScrollToTop showUnder={320} >
                <img style={{ width: '30px' }} src="/assets/utils/icon-arrow-top.svg" alt="Inicio" />
              </ScrollToTop>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default withApollo(SuperAdminUsers);

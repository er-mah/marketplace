import React, { Component } from 'react';
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Col, Row, Button } from 'reactstrap';
import { parse, stringify } from 'query-string';
// Todo: adapt this
// import { graphql, compose } from 'react-apollo';
import { branch, renderComponent } from 'recompose';

import { searchUserMutation } from '../../graphql/old/SuperAdminUsersQuery';

/* eslint react/jsx-filename-extension: 0 */

class SuperAdminFilterUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tipoUserDropdown: false,
      search: '',
      dropDownTipoUserValue: 'Tipo de Cliente',
      loading: false,
    };
    this.toggleTipoUserDropdown = this.toggleTipoUserDropdown.bind(this);
    this.changeTipoUserValue = this.changeTipoUserValue.bind(this);
  }

  searchWithParam(property, value) {
    let searchObj = {};
    const { location, history, location: { pathname } } = this.props;
    searchObj = (parse(location.search));
    searchObj[property] = value;
    history.push(`${pathname}?${stringify(searchObj)}`);
  }

  toggleTipoUserDropdown() {
    this.setState({
      tipoUserDropdown: !this.state.tipoUserDropdown,
    });
  }
  changeTipoUserValue(e) {
    this.searchWithParam('userType', e.currentTarget.textContent);
    this.setState({ dropDownTipoUserValue: e.currentTarget.textContent });
    this.submitSearch(e.currentTarget.textContent)
  }

  submitSearch(userType) {
    this.setState({loading:true})
    const variables = {}
    variables.text = this.state.search;
    if(userType){variables.userType=userType}

    this.props.searchUser({
      variables,
    })
      .then(({ data: { searchUser } }) => {
    this.setState({loading:false})        
        this.props.searchResults(searchUser);
      });
  }

  render() {
    return (
      <Row className="header-filters align-items-center">
        <Col md="12" sm="12">
          <Row className="align-items-center">
            <div className="m-15" >
              <p>Filtrar por</p>
            </div>
            <div className="col-md-3 col-sm-6 mv-15">
              <Dropdown size="sm" isOpen={this.state.tipoUserDropdown} toggle={this.toggleTipoUserDropdown}>
                <DropdownToggle caret className="btn-select btn-default">
                  {this.state.dropDownTipoUserValue}
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem header>Elije una</DropdownItem>
                  <DropdownItem onClick={e => this.changeTipoUserValue(e)}>Usuario</DropdownItem>
                  <DropdownItem onClick={e => this.changeTipoUserValue(e)}>Agencia</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>

            <div className="col-lg-6 col-md-6 col-sm-12 text-right m-15" >
              <div className="row" >
                <input
                  type="text"
                  value={this.state.search}
                  placeholder="Buscar..."
                  onChange={event => this.setState({ search: event.target.value })}
                />
                <Button
                  color="primary"
                  style={{ cursor: 'pointer' }}
                  className="icon is-small btn-icon"
                  disabled={this.state.search===''}
                  onClick={() => {
                    this.submitSearch();
                  }}
                >
                  <img src="/assets/utils/icon-search.svg" alt="" />
                </Button>
                <Button
                  color="primary"
                  style={{ cursor: 'pointer', marginLeft:'20px' }}
                  className="icon is-small btn-icon"
                  onClick={() => {
                    window.location.reload()
                  }}
                >
                  Todos
                </Button>
                {this.state.loading && <img
                    style={{ height: '60px' }}
                    src="/assets/utils/loading.gif"
                    key={0}
                    alt="Loading..."
                  />}
              </div>
            </div>
          </Row>
        </Col>
      </Row>
    );
  }
}
const withSearhMutation = graphql(searchUserMutation, { name: 'searchUser' });


const withData = compose(withSearhMutation);
export default withData(SuperAdminFilterUser);

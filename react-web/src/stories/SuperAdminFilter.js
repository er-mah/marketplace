import React, { Component } from 'react';
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Col, Row, Button } from 'reactstrap';
import { parse, stringify } from 'query-string';
/* eslint react/jsx-filename-extension: 0 */
import { graphql, compose } from 'react-apollo';

import { searchPubMutation } from '../apolloQueries/SuperAdminPubQuery';

class SuperAdminFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tipoDropdown: false,
      stateDropdown: false,

      dropDownTipoValue: parse(props.location.search).carState || 'Tipo',
      dropDownTipoUserValue: parse(props.location.search).userType || 'Tipo de Cliente',
      dropDownPublicationStateValue: parse(props.location.search).stateName || 'Estado de Publicación',
    };
    this.toggleTipoDropdown = this.toggleTipoDropdown.bind(this);
    this.toggleTipoUserDropdown = this.toggleTipoUserDropdown.bind(this);
    this.toggleStateDropdown = this.toggleStateDropdown.bind(this);

    this.changeTipoValue = this.changeTipoValue.bind(this);
    this.changeTipoUserValue = this.changeTipoUserValue.bind(this);
    this.changeStateValue = this.changeStateValue.bind(this);
  }

  searchWithParam(property, value) {
    let searchObj = {};
    const { location, history, location: { pathname } } = this.props;
    searchObj = (parse(location.search));
    searchObj[property] = value;
    history.push(`${pathname}?${stringify(searchObj)}`);
  }

  toggleTipoDropdown() {
    this.setState({
      tipoDropdown: !this.state.tipoDropdown,
    });
  }
  changeTipoValue(e) {
    this.searchWithParam('carState', e.currentTarget.textContent);
    this.setState({ dropDownTipoValue: e.currentTarget.textContent });
  }
  toggleTipoUserDropdown() {
    this.setState({
      tipoUserDropdown: !this.state.tipoUserDropdown,
    });
  }
  changeTipoUserValue(e) {
    this.searchWithParam('userType', e.currentTarget.textContent);
    this.setState({ dropDownTipoUserValue: e.currentTarget.textContent });
  }

  toggleStateDropdown() {
    this.setState({
      stateDropdown: !this.state.stateDropdown,
    });
  }
  changeStateValue(e) {
    this.searchWithParam('stateName', e.currentTarget.textContent);
    this.setState({ dropDownPublicationStateValue: e.currentTarget.textContent });
  }

  submitSearch(userType) {
    this.setState({ loading: true });
    const variables = {};
    variables.text = this.state.search;
    if (userType) { variables.userType = userType; }

    this.props.searchPub({
      variables,
    })
      .then(({ data: { searchPub } }) => {
        this.setState({ loading: false });
        this.props.searchResults(searchPub);
      });
  }

  render() {
    return (
      <Row className="header-filters align-items-center">
        <Col md="12" sm="12">
          <Row className="align-items-center">
            <div className="col-md-7 col-sm-12 d-flex flex-row align-items-center justify-content-start" >
              <div>
                <p>Filtrar por</p>
              </div>
              <div className="mv-15 size-user">
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

              <div className="mv-15 size-car" >
                <Dropdown size="sm" isOpen={this.state.tipoDropdown} toggle={this.toggleTipoDropdown}>
                  <DropdownToggle caret className="btn-select btn-default">
                    {this.state.dropDownTipoValue}
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem header>Elije una</DropdownItem>
                    <DropdownItem onClick={e => this.changeTipoValue(e)}>Usado</DropdownItem>
                    <DropdownItem onClick={e => this.changeTipoValue(e)}>Nuevo</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>
            </div>
            <div className="col-md-5 col-sm-12 mv-15 d-flex flex-row align-items-center justify-content-lg-end justify-content-sm-start">
              <div className="mv-15">
                <p>Ordenar por</p>
              </div>
              <div className="mv-15 size-publication" >
                <Dropdown size="md" isOpen={this.state.stateDropdown} toggle={this.toggleStateDropdown}>
                  <DropdownToggle caret className="btn-select btn-default">
                    {this.state.dropDownPublicationStateValue}
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem header>Elije una</DropdownItem>
                    <DropdownItem onClick={(e) => { this.changeStateValue(e); }}>Pendiente</DropdownItem >
                    <DropdownItem onClick={(e) => { this.changeStateValue(e); }} >Publicada</DropdownItem >
                    <DropdownItem onClick={(e) => { this.changeStateValue(e); }} >Destacada</DropdownItem >
                    <DropdownItem onClick={(e) => { this.changeStateValue(e); }} >Suspendida</DropdownItem >
                    <DropdownItem onClick={(e) => { this.changeStateValue(e); }} >Vendida</DropdownItem >
                    <DropdownItem onClick={(e) => { this.changeStateValue(e); }} >Archivada</DropdownItem >
                    <DropdownItem onClick={(e) => { this.changeStateValue(e); }} >Eliminada</DropdownItem >
                    <DropdownItem onClick={(e) => { this.changeStateValue(e); }} >Vencida</DropdownItem >
                    <DropdownItem onClick={(e) => { this.changeStateValue(e); }} >Apto para garantía</DropdownItem >
                  </DropdownMenu>
                </Dropdown>
              </div>
            </div>
          </Row>
          <Row>
            <Col md="8" sm="12" className="d-flex flex-row row-search" >
              <input
                type="text"
                className="form-control"
                value={this.state.search}
                placeholder="Buscar..."
                onChange={event => this.setState({ search: event.target.value })}
              />
              <Button
                color="primary"
                style={{ cursor: 'pointer' }}
                className="icon is-small btn-icon"
                disabled={this.state.search === ''}
                onClick={() => {
                  this.submitSearch();
                }}
              >
                <img src="/assets/utils/icon-search.svg" alt="" />
              </Button>
              <Button
                color="primary"
                style={{ cursor: 'pointer', marginLeft: '20px' }}
                className="icon is-small btn-icon"
                onClick={() => {
                    window.location.reload();
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
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }
}

const withSearhMutation = graphql(searchPubMutation, { name: 'searchPub' });


const withData = compose(withSearhMutation);
export default withData(SuperAdminFilter);

import React, { Component } from 'react';
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Col, Row } from 'reactstrap';
import { parse, stringify } from 'query-string';
/* eslint react/jsx-filename-extension: 0 */

class AdminFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tipoDropdown: false,
      stateDropdown: false,

      dropDownTipoValue: parse(props.location.search).carState || 'Tipo',
      dropDownPublicationStateValue: parse(props.location.search).stateName || 'Estado de Publicación',
    };
    this.toggleTipoDropdown = this.toggleTipoDropdown.bind(this);
    this.toggleStateDropdown = this.toggleStateDropdown.bind(this);

    this.changeTipoValue = this.changeTipoValue.bind(this);
    this.changeStateValue = this.changeStateValue.bind(this);
  }

  searchWithParam(property, value) {
    let searchObj = {};
    const { location, history, location: { pathname } } = this.props;
    searchObj = (parse(location.search));
    searchObj[property] = value;
    if (value === 'Todas') {
      delete searchObj.stateName;
      history.push(`${pathname}?${stringify(searchObj)}`);
    }
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

  toggleStateDropdown() {
    this.setState({
      stateDropdown: !this.state.stateDropdown,
    });
  }
  changeStateValue(e) {
    this.searchWithParam('stateName', e.currentTarget.textContent);
    this.setState({ dropDownPublicationStateValue: e.currentTarget.textContent });
  }

  render() {
    return (
      <Row className="header-filters align-items-center">
        <Col md="12" sm="12">
          <Row className="align-items-center">
            <div className="m-15" >
              <p>Filtrar por</p>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-6 col-xs-6 mv-15">
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
            <div className="col-lg-2 col-md-2 col-sm-4 col-xs-4 mv-15 text-right">
              <p>Estado </p>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6 col-xs-6">
              <Dropdown size="sm" isOpen={this.state.stateDropdown} toggle={this.toggleStateDropdown}>
                <DropdownToggle caret className="btn-select btn-default">
                  {this.state.dropDownPublicationStateValue}
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem header>Elije una</DropdownItem>
                  <DropdownItem onClick={(e) => { this.changeStateValue(e); }}>Todas</DropdownItem >
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
          </Row>
        </Col>
      </Row>
    );
  }
}

export default AdminFilter;

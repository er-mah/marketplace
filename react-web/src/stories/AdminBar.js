import React from 'react';
import { Col, Row, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { animateScroll as scroll } from 'react-scroll';
import { getUserDataFromToken, clearSession, isAdminLogged, isUserLogged } from '../modules/sessionFunctions';

/* eslint react/jsx-filename-extension: 0 */

export default class AdminBar extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownUser: false,
    };
    scroll.scrollToTop({ duration: 300 });
  }

  toggle() {
    this.setState({
      dropdownUser: !this.state.dropdownUser,
    });
  }

  render() {
    return (
      <div className="container-fluid " style={{ marginBottom: '90px' }}>
        <div className="header" style={{ top: 0 }} >
          <div className="container">
            <Row className="justify-content-between">
              <Col md="3">
                <Row>
                  <a className="brand__admin ml-0" onClick={() => this.props.history.push('/')} >
                    <img style={{ width: '150px' }} src="/logo.png" alt="Logo" />
                  </a>
                </Row>
              </Col>
              <Col md="3" sm="3" xs="6" className="text-right">
                {isUserLogged() &&
                <div>
                  <ButtonDropdown
                    isOpen={this.state.dropdownUser}
                    toggle={this.toggle}
                    style={{ width: 'auto' }}
                  >
                    <DropdownToggle caret className="btn-link-active btn-block">{getUserDataFromToken().name}</DropdownToggle>
                    <DropdownMenu>
                      {isAdminLogged() &&
                      <DropdownItem
                        value="myAccount"
                        onClick={() => (this.props.history.push('/admin'))}
                      >Administrador
                      </DropdownItem>}
                      <DropdownItem value="closeSession" onClick={() => { clearSession(); this.setState({ isUserLogged: false }); this.props.history.push('/'); }}>Cerrar Sesión</DropdownItem>
                    </DropdownMenu>
                  </ButtonDropdown>
                </div>
            }
              </Col>
            </Row>
          </div>
        </div>
      </div>

    );
  }
}

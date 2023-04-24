import React from 'react';
import { Col, Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label } from 'reactstrap';
import Select from 'react-select';
/* eslint react/jsx-filename-extension: 0 */
// todo: adapt this
//import { graphql, compose } from 'react-apollo';
import { branch, renderComponent } from 'recompose';
import { AllUsersMailsQuery } from '../../graphql/_old/UserQuery';
import Login from '../auth/Login';
import { isUserLogged } from '../../modules/sessionFunctions';


const renderForUnloggedUser = (component, propName = 'data') =>
  branch(props => !isUserLogged(), renderComponent(component));

class SuperAdminSideBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      selectedUser: '',
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal,
    });
  }

  render() {
    const { history, location, userMails: { loading } } = this.props;
    const data = [];
    if (!loading) {
      const { Users } = this.props.userMails.AllUsersMails;
      Users.map((usr) => {
        if (!usr.isAdmin) {
          data.push({ value: usr.id, label: usr.email });
        }
      });
    }
    return (
      <Col md="12" className="sidebar-user" >
        <ul>
          <li>
            <Button style={{ cursor: 'pointer' }} color="default" className={location.pathname === '/superAdminPublications' ? 'active' : ''} onClick={() => history.push('/superAdminPublications')} >Publicaciones</Button>
          </li>
          <li>
            <Button style={{ cursor: 'pointer' }} color="default" className={location.pathname === '/superAdminAllMessages' ? 'active' : ''} onClick={() => history.push('/superAdminAllMessages')} >Todos los mensajes</Button>
          </li>
          <li>
            <Button style={{ cursor: 'pointer' }} color="default" className={location.pathname === '/superAdminUsers' ? 'active' : ''} onClick={() => history.push('/superAdminUsers')} >Usuarios</Button>
          </li>
          <li>
            <Button style={{ cursor: 'pointer' }} color="default" className={location.pathname === '/superAdminConsult' ? 'active' : ''} onClick={() => history.push('/superAdminConsult')} >Consultar Precio</Button>
          </li>
          <li>
            <Button style={{ cursor: 'pointer' }} color="default" className={location.pathname === '/superAdminRates' ? 'active' : ''} onClick={() => history.push('/superAdminRates')} >Tasas</Button>
          </li>
          <li>
            <Button style={{ cursor: 'pointer' }} color="default" className={location.pathname === '/superAdminSliders' ? 'active' : ''} onClick={() => history.push('/superAdminSliders')} >Sliders</Button>
          </li>
          <Button style={{ cursor: 'pointer' }} color="primary" className={location.pathname === '/createPublication' ? 'active' : ''} onClick={this.toggle} >Crear publicación</Button>
        </ul>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Crear una publicación para</ModalHeader>
          <ModalBody>
            <Col>
              <FormGroup>
                <Label for="exampleEmail">Mail de Usuario</Label>
                {loading ?
                  <img
                    className="loading-gif"
                    style={{ height: '250px' }}
                    src="/assets/utils/loading.gif"
                    key={0}
                    alt="Loading..."
                  /> :
                  <Select
                    id="carState-select"
                    ref={(ref) => { this.select = ref; }}
                    onBlurResetsInput={false}
                    autoFocus
                    clearable={false}
                    onSelectResetsInput={false}
                    placeholder="Selecciona un usuario"
                    options={data}
                    simpleValue
                    name="selected-state"
                    value={this.state.selectedUser}
                    onChange={newValue => this.setState({ selectedUser: newValue })}
                    theme={theme => ({
                      ...theme,
                      borderRadius: 4,
                      colors: {
                      ...theme.colors,
                        primary25: '#A0AABF',
                        primary: '#2A3B59',
                      },
                    })
                    }
                  />
              }
              </FormGroup>
            </Col>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={() => this.toggle()}>Salir</Button>
            <Button color="primary" onClick={() => history.push(`/createPublication?userId=${this.state.selectedUser}`)}>Ir a Crear</Button>
          </ModalFooter>
        </Modal>
      </Col>
    );
  }
}

const withData = compose(
  graphql(AllUsersMailsQuery, { name: 'userMails' }),
  renderForUnloggedUser(Login, 'userMails')
)
export default withData(SuperAdminSideBar);

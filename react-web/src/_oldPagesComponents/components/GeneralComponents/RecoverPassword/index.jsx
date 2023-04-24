import React, { Component } from 'react';
import { FormGroup, Label, Button, Input } from 'reactstrap';
import { parse } from 'query-string';
// Todo: adapt this
// import { graphql, compose } from 'react-apollo';
import ReactGA from 'react-ga';
import { ResetPasswordMutation } from '../../../graphql/_old/UserProfileQuery';

import NotificationModal from '../../../pages/_old/NotificationModal';

class RecoverPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      modalTitle: '',
      modalMessage: '',
      password: '',
      repeatPassword: '',
    };
    ReactGA.pageview('/RECUPERAR CONTRASEÑA');
  }
  resetPassword() {
    this.props.resetPassword({
      variables: {
        oldPassword: parse(this.props.location.search).hash,
        newPassword: this.state.password,
      },
    }).then(() => {
      this.setState({
        showModal: true,
        password: '',
        repeatPassword: '',
        modalTitle: 'Felicitaciones',
        modalMessage: 'Contraseña actualizada con éxito',
      });
    }).catch(({ graphQLErrors, networkError }) => {
      if (graphQLErrors) {
        graphQLErrors.map(({ message }) =>
          this.setState({
            modalTitle: 'Error',
            modalMessage: message,
            showModal: true,
          }));
      }
      if (networkError) {
        this.setState({
          modalTitle: 'Error',
          modalMessage: networkError,
          showModal: true,
        });
      }
    });
  }
  render() {
    return (
      <div style={{ top: '20px', position: 'relative' }}>
        <h4
          className="offset-md-3 primary"
          style={{
            font: '300 20px/35px "Lato",sans-serif',
          }}
        > Ingresa tu nueva contraseña
        </h4>
        <div
          className="col-md-6 offset-md-3"
          style={{ border: 'solid lightgray 1px' }}
        >
          <div className="col-md-6 offset-md-3">
            <div className="underline" />
            <FormGroup>
              <Label for="password">Contraseña</Label>
              <Input
                type="password"
                name="password"
                value={this.state.password}
                onChange={e => this.setState({ password: e.target.value })}

              />
            </FormGroup>
            <FormGroup>
              <Label for="repeatPassword">Repita contraseña </Label>
              <Input
                type="password"
                name="repeatPassword"
                value={this.state.repeatPassword}
                onChange={e => this.setState({ repeatPassword: e.target.value })}

              />
            </FormGroup>
          </div>
          <div className="row">
            <div className="col-md-6 col-sm-4 float-left offset-2">
              <Button
                disabled={this.state.repeatPassword === ''}
                onClick={() => { this.resetPassword(); }}
                color="primary"
                className="alternative"
              >
                Cambiar Contraseña
              </Button>
            </div>
            <div className="col-3 float-right">
              <Button
                onClick={() => window.location.assign('/')}
                color="default"
                className="alternative"
              >
                Salir
              </Button>
            </div>
          </div>
        </div>
        <NotificationModal
          primaryText={this.state.modalTitle}
          secondaryText={this.state.modalMessage}
          buttonName="Aceptar"
          showNotificationModal={this.state.showModal}
          handleClose={() => this.setState({ showModal: false })}
        />
      </div>

    );
  }
}
const withPasswordMutation = graphql(ResetPasswordMutation, { name: 'resetPassword' });
const withData = compose(withPasswordMutation);

export default withData(RecoverPassword);

import React, { Component } from 'react';
import { Row, Col, Button } from 'reactstrap';
import { updateTextMutation } from '../apolloQueries/TextsQueries';
import { graphql, compose } from 'react-apollo';
import { branch, renderComponent } from 'recompose';
import { Alert, Input } from 'reactstrap';

import { getUserToken } from '../modules/sessionFunctions';
/* eslint react/jsx-filename-extension: 0 */

class InputOrText extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputShow: false,
      originalText: props.text || '',
      text: props.text || '',
      notiMessage: '',
      showNoti: false,
      height: '50px',
    };
  }

  componentWillMount() {
    this.setState({ originalText: this.props.text, text: this.props.text, height: this.props.height });
  }

  cancel() {
    this.setState({ text: this.state.originalText, inputShow: false });
  }

  save() {
    const { section, route } = this.props;
    const { text } = this.state;
    this.props.updateText({
      variables: {
        section,
        route,
        text,
        MAHtoken: getUserToken(),
      },
      refetchQueries: ['GetTextsQuery'],
    })
      .then(() => {
        this.props.onChange(this.state.text);
        this.setState({ inputShow: false, notiMessage: 'Cambios guardados.', showNoti: true });
      })
      .catch(({ graphQLErrors, networkError }) => {
        if (graphQLErrors) {
          graphQLErrors.map(({ message }) =>
            this.setState({
              notiMessage: message,
              showNoti: true,
            }));
        }
        if (networkError) {
          this.setState({
            notiMessage: networkError,
            showNoti: true,
          });
        }
      });
  }

  renderText() {
    switch (this.props.type) {
      case 'h3':
        return <h3 className={this.props.customClass}>{this.props.text}</h3>;
      case 'h4':
        return <h4 className={this.props.customClass}>{this.props.text}</h4>;
      case 'h5':
        return <h5 className={this.props.customClass}>{this.props.text}</h5>;
      case 'h6':
        return <h6 className={this.props.customClass}>{this.props.text}</h6>;
      default:
        if (this.props.multiple) {
          const multipleLines = this.props.text.split(/\n/);
          return multipleLines.map(row => <p className={this.props.customClass}>{row}</p>);
        }
        return <p className={this.props.customClass}>{this.props.text}</p>;
    }
  }

  render() {
    const container = {
      marginTop: this.state.inputShow ? 30 : 0,
      alignItems: this.state.inputShow ? 'flex-start' : 'center',
      justifyContent: 'space-between',
    };
    return (
      <div>
        <Row style={this.props.style || container} >
          <Col sm="9">
            { this.state.inputShow ?
              <Input
                formGroup={false}
                type="textarea"
                style={{ height: this.state.height }}
                value={this.state.text}
                onChange={event => this.setState({ text: event.target.value })}
              />
          :
              <div className="text-block">
                {this.renderText()}
              </div>
          }
          </Col>
          <Col sm="3">
            { this.state.inputShow ?
              <div className="d-flex flex-row" >
                <Button type="primary" className="btn-link-primary" style={{ marginRight: 5, padding: 2 }} onClick={() => this.save()} >
                OK
                </Button>
                <Button type="primary" className="btn-link-primary" style={{ margin: 0, padding: 2 }} onClick={() => this.cancel()} >
                  <img src="/assets/utils/icon-close.svg" alt="" style={{ width: 10, height: 10 }} />
                </Button>
              </div>
          :
              <Button type="primary" className="btn-link-primary" onClick={() => this.setState({ inputShow: true })} >
                <img src="/assets/utils/icon-edit-red.svg" alt="" />
              </Button>
          }
          </Col>
        </Row>
        <Alert color="secondary" isOpen={this.state.showNoti} toggle={() => { this.setState({ showNoti: false }); }}>
          {this.state.notiMessage}
        </Alert>
      </div>
    );
  }
}

const withUpdateTextMutation = graphql(updateTextMutation, {
  name: 'updateText',
});
const withData = compose(withUpdateTextMutation);

export default withData(InputOrText);


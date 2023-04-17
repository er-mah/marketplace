import React, { Component } from 'react';
import { Row, Col, Button, Alert, Input } from 'reactstrap';
// Todo: adapt this
// import { graphql, compose } from 'react-apollo';

import { RatesMutation } from '../../graphql/old/RatesQuery';
import { getUserToken } from '../../modules/sessionFunctions';
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
    };
  }

  componentWillMount() {
    this.setState({ originalText: this.props.text, text: this.props.text });
  }

  cancel() {
    this.setState({ text: this.state.originalText, inputShow: false });
  }

  save() {
    const { element } = this.props;
    const { text } = this.state;
    this.props.updateRate({
      variables: {
        period: element.period,
        term: element.term,
        rate: text,
        MAHtoken: getUserToken(),
      },
      refetchQueries: ['RatesQuery'],
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

  render() {
    const container = {
      marginTop: this.state.inputShow ? 0 : -10,
      alignItems: this.state.inputShow ? 'flex-start' : 'center',
      justifyContent: 'space-between',
      marginBottom: 15,
    };
    return (
      <div>
        <label>Plazo 12</label>
        <Row style={container} >
          <Col sm="9">
            { this.state.inputShow ?
              <Input
                formGroup={false}
                type="textarea"
                style={{ height: 35 }}
                value={this.state.text}
                onChange={event => this.setState({ text: event.target.value })}
              />
          :
              <div className="text-block">
                <p>{this.state.text}</p>
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

const withRatesMutation = graphql(RatesMutation, {
  name: 'updateRate',
});
const withData = compose(withRatesMutation);

export default withData(InputOrText);


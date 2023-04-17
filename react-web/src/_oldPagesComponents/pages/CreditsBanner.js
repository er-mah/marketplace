import React from 'react';
import { Col, Row, Button } from 'reactstrap';
import ReactGA from 'react-ga';

/* eslint react/jsx-filename-extension: 0 */
import InputOrText from './InputOrText';
import { isAdminLogged } from '../../modules/sessionFunctions';

class CreditsBanner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title2: 'Créditos Prendarios ',
      text2: 'Créditos a tu medida, a las tazas más bajas y hasta con 60 meses de plazo.',
      title3: 'Personal Shopper ',
      text3: '¿Cansado de buscar? Te ayudamos a buscar un auto a tu medida asesorándote en cada proceso.',
      title4: 'Créditos de libre destino ',
      text4: 'Hacé con tu préstamo lo que desees y lo que siempre soñaste.',
    };
    this.pledgeCredits = this.pledgeCredits.bind(this);
    this.personalShopperS1 = this.personalShopperS1.bind(this);
    this.freeDestinationCredits = this.freeDestinationCredits.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if (!nextProps.Texts.loading) {
      const texts = {};
      texts.fetched = true;
      nextProps.Texts.PageTexts.map(row => texts[row.section] = row.text);
      this.setState({ ...texts });
    }
  }

  pledgeCredits() {
    ReactGA.event({
      category: 'Home Banner',
      action: 'Ir a Créditos Prendarios',
    });
    return this.props.history.push('/pledgeCredits');
  }

  freeDestinationCredits() {
    ReactGA.event({
      category: 'Home Banner',
      action: 'Ir a Créditos Libre Destino',
    });
    return this.props.history.push('/freeDestinationCredits');
  }

  personalShopperS1() {
    ReactGA.event({
      category: 'Home Banner',
      action: 'Ir a Personal Shopper',
    });
    return this.props.history.push('/personalShopperS1');
  }

  render() {
    return (
      <div className="container-fluid">
        <Row className="home-posibilities">
          <Col md="4" sm="12" xs="12">
            <Row className="justify-content-between" style={{ height: '100%' }}>
              <Col md="4" sm="3" xs="12" className="text-right">
                <img src="/assets/utils/icon-home-1.png" srcSet="/assets/utils/icon-home-1@2x.svg" alt="banner" />
              </Col>
              <Col md="8" sm="9" xs="12" className="helper-align-flexs">
                {isAdminLogged() ?
                  <div>
                    <InputOrText type="h5" section="title2" route="home" text={this.state.title2} onChange={title2 => this.setState({ title2 })} />
                    <InputOrText type="p" section="text2" height="120px" route="home" text={this.state.text2} onChange={text2 => this.setState({ text2 })} />
                  </div>
                :
                  <div>
                    <h5>{this.state.title2}</h5>
                    <p>{this.state.text2}</p>
                  </div>
                }
                <Button color="primary" onClick={this.pledgeCredits} className="align-self-end"> Consultá</Button>
              </Col>
            </Row>
          </Col>
          <Col md="4" sm="12" xs="12">
            <Row className="justify-content-between" style={{ height: '100%' }}>
              <Col md="4" sm="3" xs="12" className="text-right">
                <img src="/assets/utils/icon-home-2.png" srcSet="/assets/utils/icon-home-2@2x.svg" alt="banner" />
              </Col>
              <Col md="8" sm="9" xs="12" className="helper-align-flexs">
                {isAdminLogged() ?
                  <div>
                    <InputOrText type="h5" section="title3" route="home" text={this.state.title3} onChange={title3 => this.setState({ title3 })} />
                    <InputOrText type="p" section="text3" height="120px" route="home" text={this.state.text3} onChange={text3 => this.setState({ text3 })} />
                  </div>
                :
                  <div>
                    <h5>{this.state.title3}</h5>
                    <p>{this.state.text3}</p>
                  </div>
                }
                <Button color="primary" onClick={this.personalShopperS1} className="align-self-end"> Consultá</Button>
              </Col>
            </Row>
          </Col>
          <Col md="4" sm="12" xs="12">
            <Row className="justify-content-between" style={{ height: '100%' }}>
              <Col md="4" sm="3" xs="12" className="text-right">
                <img src="/assets/utils/icon-home-3.png" srcSet="/assets/utils/icon-home-3@2x.svg" alt="banner" />
              </Col>
              <Col md="8" sm="9" xs="12" className="helper-align-flexs">
                {isAdminLogged() ?
                  <div>
                    <InputOrText type="h5" section="title4" route="home" text={this.state.title4} onChange={title4 => this.setState({ title4 })} />
                    <InputOrText type="p" section="text4" height="120px" route="home" text={this.state.text4} onChange={text4 => this.setState({ text4 })} />
                  </div>
                :
                  <div>
                    <h5>{this.state.title4}</h5>
                    <p>{this.state.text4}</p>
                  </div>
                }
                <Button color="primary" onClick={this.freeDestinationCredits} className="align-self-end"> Consultá</Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}

export default CreditsBanner;

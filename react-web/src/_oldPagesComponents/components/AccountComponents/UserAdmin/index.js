/* eslint react/jsx-filename-extension: 0 */
/* eslint react/prop-types: 0 */

import React from 'react';
import {
  Col,
  Row,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Label,
} from 'reactstrap';
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from 'recharts';
// todo: adapt this
//import { graphql, compose } from 'react-apollo';
import { split } from 'split-object';
import { branch, renderComponent } from 'recompose';
import { Helmet } from 'react-helmet';
import ReactGA from 'react-ga';

import AdminBar from '../../../pages/old/AdminBar';
import UserSideBar from '../../../pages/old/UserSideBar';

import LoadingComponent from '../../../pages/old/LoadingComponent';
import {
  CountUnreadMessagesQuery,
  CountActivePublications,
  CountHighLighPublications,
} from '../../../graphql/old/admin/AdminHomeQuery';
import {
  getUserToken,
  getUserDataFromToken,
  isUserLogged,
} from '../../../modules/sessionFunctions';
import { getSoldPublications } from '../../../modules/fetches';
import Login from '../../../pages/auth/Login';


const renderWhileLoading = (component, propName = 'data') =>
branch(
  props => props[propName] && props[propName].loading,
  renderComponent(component),
);
const renderForUnloggedUser = (component, propName = 'data') =>
branch(
  props => !isUserLogged(),
  renderComponent(component),
);

class UserAdmin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      graphData: [],
    };
    
    this.toggle = this.toggle.bind(this);
  }
  componentWillMount() {
    ReactGA.pageview('/USUARIO-HOME');
    this.getGraphData();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.unreadMessages.loading === false) {
      this.getGraphData();
    }
    return true;
  }
  getGraphData() {
    getSoldPublications().then((resp) => {
      const data = [];
      split(resp.data).map((obj) => {
        data.push({
          date: obj.key,
          ventas: obj.value,
        });
      });
      this.setState({ graphData: data });
    });
  }

  toggle() {
    this.setState({
      modal: !this.state.modal,
    });
  }

  render() {
    const {
      history, location, unreadMessages, activePub, highLightPub,
    } = this.props;
    const { CountUnreadMessages } = unreadMessages;
    const { CountActivePublications } = activePub;
    const { CountHighLighPublications } = highLightPub;
    const data = [
      { date: 'Ene 1', ventas: 5 },
      { date: 'Ene 15', ventas: 7 },
      { date: 'Feb 1', ventas: 6 },
      { date: 'Feb 15', ventas: 4 },
      { date: 'Marzo 1', ventas: 8 },
      { date: 'Marzo 15', ventas: 5 },
    ];
    return (
      <div>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Tu Perfil</title>
        </Helmet>
        <AdminBar history={history} />
        <div className="container">
          <Row>
            <Col lg="3" md="12" sm="12" xs="12">
              <UserSideBar history={history} location={location} />
            </Col>
            <Col lg="9" md="12" sm="12" xs="12">
              <Row>
                <Col md="12">
                  <h1 className="title-division-primary">
                    ¡Hola {getUserDataFromToken().name}!
                  </h1>
                </Col>
                <Col lg="8" md="12" sm="12" xs="12">
                  <Label for="exampleEmail">Reporte de autos vendidos</Label>
                  { this.state.graphData.length === 0
                  ? <img
                    src="/assets/images/institutional/ES-publications.png"
                    alt="No hay publicaciones"
                  />
                  : <LineChart
                    width={600}
                    height={300}
                    data={this.state.graphData}
                    margin={{
                        top: 5,
                        right: 20,
                        bottom: 5,
                        left: 0,
                      }}
                  >
                    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="ventas" stroke="blue" />
                    </LineChart>}
                </Col>
                <Col lg="4" md="12" sm="12" xs="12">
                  <div className="data-graph col-sm-12 col-xs-12">
                    <a
                      onClick={() => history.push('/userInbox')}
                      color="default"
                    >
                      <div className="row">
                        {unreadMessages.loading ? (
                          <img
                            className="loading-gif"
                            style={{ height: '70px' }}
                            src="/assets/utils/loading.gif"
                            key={0}
                            alt="Loading..."
                          />
                        ) : (
                          <div className="col-8">
                            <h2>{CountUnreadMessages[0]}</h2>
                            <p>Mensajes sin leer</p>
                          </div>
                        )}
                        <div className="col-4">
                          <div className="container-icon">
                            <img
                              src="/assets/utils/icon-comments-white.svg"
                              alt=""
                            />
                          </div>
                        </div>
                      </div>
                    </a>
                  </div>

                  <div className="data-graph col-sm-12 col-xs-12">
                    <a
                      onClick={() => history.push('/userPublications')}
                      color="default"
                    >
                      <div className="row">
                        {activePub.loading ? (
                          <img
                            className="loading-gif"
                            src="/assets/utils/loading.gif"
                            key={0}
                            alt="Loading..."
                          />
                      ) : (
                        <div className="col-8">
                          <h2>{CountActivePublications}</h2>
                          <p>Publicaciones activas</p>
                        </div>
                      )}
                        <div className="col-4">
                          <div className="container-icon">
                            <img src="/assets/utils/icon-car-white.svg" alt="" />
                          </div>
                        </div>
                      </div>
                    </a>
                  </div>

                  <div className="data-graph col-sm-12 col-xs-12">
                    <a
                      onClick={() => history.push('/userPublications')}
                      color="default"
                    >
                      <div className="row">
                        {activePub.loading ? (
                          <img
                            className="loading-gif"
                            src="/assets/utils/loading.gif"
                            key={0}
                            alt="Loading..."
                          />
                      ) : (
                        <div className="col-8">
                          <h2>

                            { CountHighLighPublications }

                          </h2>
                          <p>Destacados</p>
                        </div>
                      )}
                        <div className="col-4">
                          <div className="container-icon">
                            <img
                              src="/assets/utils/icon-star-white.svg"
                              alt=""
                            />
                          </div>
                        </div>
                      </div>
                    </a>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
          <Modal
            isOpen={this.state.modal}
            toggle={this.toggle}
            className={this.props.className}
          >
            <ModalHeader toggle={this.toggle}>Felicitaciones</ModalHeader>
            <ModalBody>
              <div className="col-md-6 offset-md-3">
              El pedido para destacar su publicación ha sido enviado. A la
              brevedad nos comunicaremos con usted.
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={() => this.toggle()}>
                OK
              </Button>
            </ModalFooter>
          </Modal>
        </div>
      </div>
    );
  }
}

const options = () => ({
  variables: {
    MAHtoken: getUserToken(),
    state: 'Activas',
  },
});

const withUnreadMessagesData = graphql(CountUnreadMessagesQuery, {
  name: 'unreadMessages',
  options,
});
const withActivePublicationsCount = graphql(CountActivePublications, {
  name: 'activePub',
  options,
});
const withHighLighPublications = graphql(CountHighLighPublications, {
  name: 'highLightPub',
  options,
});
const withData = compose(
  withUnreadMessagesData,
  renderForUnloggedUser(Login, 'unreadMessages'),
  withActivePublicationsCount,
  withHighLighPublications,
  renderWhileLoading(LoadingComponent, 'highLightPub'),
);

export default withData(UserAdmin);

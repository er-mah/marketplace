/* eslint react/jsx-filename-extension: 0 */
/* eslint react/prop-types: 0 */

import React, { Component } from 'react';
import { Col, Row } from 'reactstrap';
// Todo: adapt this
// import { graphql, compose } from 'react-apollo';
import _ from 'lodash';
import { parse } from 'query-string';

import AdminBar from '../../../pages/_old/AdminBar';
import SuperAdminSideBar from '../../../pages/_old/SuperAdminSideBar';
import CardMessagge from '../../../pages/_old/CardMessagge';
import NumberOfUnreads from '../../../pages/_old/NumberOfUnreads';
import NotificationModal from '../../../pages/_old/NotificationModal';

import { AdminAllCommentThreads } from '../../../graphql/_old/SuperAdminAllMessages';
import { getUserToken, isAdminLogged } from '../../../modules/sessionFunctions';

class SuperAdminAllMessages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notiTitle: '',
      notiMessage: '',
      showNotiModal: false,
    };
  }
  componentWillMount() {
    if (!isAdminLogged()) {
      this.props.history.push('/loginAdmin');
    }
    if (parse(this.props.location.search).rsl === 'scs') {
      this.setState({
        notiTitle: 'Hecho',
        notiMessage: parse(this.props.location.search).msg,
        showNotiModal: true,
      });
    }
  }
  render() {
    const {
      history,
      location,
      commentThreadData: { AdminCommentThread: Threads, loading: loadingComments },
    } = this.props;
    let sortedThreads = [];
    sortedThreads = (_.sortBy(Threads, th => th.messages.map(ms => (ms.read !== null))));
    return (
      <div>
        <AdminBar history={history} />
        <div className="container-fluid">
          <Row>
            <Col lg="3" md="12" >
              <SuperAdminSideBar history={history} location={location} />
            </Col>
            <Col lg="9" md="12" className="mt-4">
              {loadingComments ? (
                <img
                  className="loading-gif"
                  style={{ height: '400px' }}
                  src="/assets/utils/loading.gif"
                  key={0}
                  alt="Loading..."
                />
              ) : (
                <div className="cont-list-messages m-15">
                  {!loadingComments && (
                  <NumberOfUnreads
                    totalMsg={Threads.length}
                    admin
                  />
                  )}
                  {sortedThreads.map(thr => <CardMessagge data={thr} history={history} admin />)}
                </div>
              )}
            </Col>
          </Row>
        </div>
        <NotificationModal
          primaryText={this.state.notiTitle}
          secondaryText={this.state.notiMessage}
          buttonName="Aceptar"
          showNotificationModal={this.state.showNotiModal}
          handleClose={() => this.setState({ showNotiModal: false })}
        />
      </div>
    );
  }
}

const options = () => ({
  variables: {
    MAHtoken: getUserToken(),
  },
});

const withCommentThread = graphql(AdminAllCommentThreads, {
  name: 'commentThreadData',
  options,
});

const withData = compose(withCommentThread);

export default withData(SuperAdminAllMessages);

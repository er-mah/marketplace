/* eslint react/jsx-filename-extension: 0 */
/* eslint react/prop-types: 0 */

import React, { Component } from 'react';
import { Col, Row } from 'reactstrap';
// Todo: adapt this
// import { graphql, compose } from 'react-apollo';
import _ from 'lodash';
import { branch, renderComponent } from 'recompose';
import ReactGA from 'react-ga';

import AdminBar from '../../../pages/old/AdminBar';
import UserSideBar from '../../../pages/old/UserSideBar';
import CardMessagge from '../../../pages/old/CardMessagge';
import NumberOfUnreads from '../../../pages/old/NumberOfUnreads';

import {
  CommentThreadQuery,
  CountUnreadMessagesQuery,
  CommentThreadSubscription,
} from '../../../graphql/old/UserInboxQuery';
import { getUserToken, isUserLogged } from '../../../modules/sessionFunctions';
import Login from '../../../pages/auth/Login';


const renderForUnloggedUser = (component, propName = 'data') =>
branch(
  props => !isUserLogged(),
  renderComponent(component),
);

class UserInbox extends Component {
  componentWillMount() {
    this.props.subscribeToNewThreads({
      MAHtoken: getUserToken(),
    });
    ReactGA.pageview('/USUARIO-INBOX');
  }
  render() {
    const {
      history,
      location,
      unreadMessagesData: { loading, CountUnreadMessages },
      commentThreadData: { CommentThread: Threads, loading: loadingComments },
    } = this.props;
    let sortedThreads = [];
    /* sortedThreads = _.orderBy(Threads, ['updatedAt'], ['desc']); */
    /* (_.sortBy(Threads, th => th.messages.map(ms => (ms.read !== null)))); */
    const partition = _.partition(Threads, th => th.messages.map(ms => (ms.read === null))[0]);
    sortedThreads = _.concat(partition[0], partition[1]);
    sortedThreads = _.orderBy(sortedThreads, ['id'], ['desc']);
    return (
      <div style={{ height: '1000px' }}>
        <AdminBar history={history} />
        <div className="container">
          <Row>
            <Col lg="3" md="12" sm="12" xs="12">
              <UserSideBar history={history} location={location} />
            </Col>
            <Col md="9" sm="12" xs="12" className="mt-4">
              {loadingComments ? (
                <img
                  style={{ height: '400px' }}
                  src="/assets/utils/loading.gif"
                  key={0}
                  alt="Loading..."
                />
              ) : (
                <div className="cont-list-messages">
                  {!loading && (
                    <NumberOfUnreads
                      results={CountUnreadMessages[0]}
                      totalMsg={Threads.length}
                    />
                  )}
                  {sortedThreads.map(thr => <CardMessagge data={thr} history={history} />)}
                </div>
              )}
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

const options = () => ({
  variables: {
    MAHtoken: getUserToken(),
    MAHtokenP2: getUserToken(),
  },
});

const withUnreadMessagesQuantity = graphql(CountUnreadMessagesQuery, {
  name: 'unreadMessagesData',
  options,
});
const withCommentThread = graphql(CommentThreadQuery, {
  name: 'commentThreadData',
  options,
});
const withThreadSubscription = graphql(CommentThreadQuery, {
  name: 'threadSubscriptions',
  options,
  props: props => ({
    subscribeToNewThreads: params =>
      props.threadSubscriptions.subscribeToMore({
        document: CommentThreadSubscription,
        variables: {
          MAHtoken: params.MAHtoken,
        },
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) {
            return prev;
          }
          const newFeedItem = subscriptionData.data.threadAdded;
          return Object.assign({}, prev, {
            CommentThread: [...prev.CommentThread, newFeedItem],
          });
        },
      }),
  }),
});

const withData = compose(
  withUnreadMessagesQuantity, withCommentThread, renderForUnloggedUser(Login, 'commentThreadData'),
  withThreadSubscription,
);

export default withData(UserInbox);
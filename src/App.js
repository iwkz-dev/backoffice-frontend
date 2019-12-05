import React from 'react';
import PropTypes from 'prop-types';
import { connect, Provider } from 'react-redux';
import history from 'shared/utils/history';
import { ConnectedRouter } from 'connected-react-router';

// components
import Layout from 'shared/components/Layout';
import Routes from 'shared/routing';

// TODO: check auth and getting scope (user / admin)
// parse to props
const App = ({
  store,
  authData,
}) => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Layout currentUserData={authData.data}>
        <Routes currentUserData={authData.data} />
      </Layout>
    </ConnectedRouter>
  </Provider>
);

App.propTypes = {
  store: PropTypes.shape().isRequired,
  authData: PropTypes.shape().isRequired,
};

const mapStateToProps = ({
  auth: {
    users: { single },
  },
}) => ({
  authData: single,
});

const mapDispatchToProps = {};


export default connect(mapStateToProps, mapDispatchToProps)(App);

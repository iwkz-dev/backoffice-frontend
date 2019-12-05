import React from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';

import { Switch, Redirect, Route } from 'react-router-dom';
import { DASHBOARD_ROOT_PATH } from 'Dashboard/routes/constants';
import { LOGIN_ROOT_PATH } from 'Auth/routes/constants';

import { routes as AuthRoutes } from 'Auth/routes';
import PageRouter from './PageRouter';

const routes = ({
  currentUserData,
}) => {
  const redirectRoute = () => {
    if (!isEmpty(currentUserData)) {
      return <Redirect to={DASHBOARD_ROOT_PATH} />;
    }

    return <Redirect to={LOGIN_ROOT_PATH} />;
  };

  return (
    <Switch>
      <Route path="/">
        <AuthRoutes />
        <PageRouter />
        {redirectRoute()}
      </Route>
    </Switch>
  );
};

routes.propTypes = {
  currentUserData: PropTypes.shape(),
};

routes.defaultProps = {
  currentUserData: null,
};

export default routes;

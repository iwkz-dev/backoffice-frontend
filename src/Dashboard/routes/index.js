import React from 'react';
import { Route } from 'react-router-dom';

// Components
import Dashboard from 'Dashboard/containers/Dashboard';

import {
  DASHBOARD_ROOT_PATH,
} from './constants';

export const Routes = () => (
  <>
    <Route exact path={DASHBOARD_ROOT_PATH} component={Dashboard} />
  </>
);

export const SettingsRoutes = () => {};

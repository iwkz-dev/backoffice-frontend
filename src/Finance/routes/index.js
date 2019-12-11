import React from 'react';
import { Route } from 'react-router-dom';

import SettingTypes from 'Finance/containers/SettingTypes';
import Incomes from 'Finance/containers/Incomes';
import Bills from 'Finance/containers/Bills';

import {
  FINANCE_INCOME_PATH,
  FINANCE_BILL_PATH,
  FINANCE_SETTING_PATH,
} from './constants';

export const Routes = () => (
  <>
    <Route exact path={FINANCE_INCOME_PATH} component={Incomes} />
    <Route exact path={FINANCE_BILL_PATH} component={Bills} />
    <Route exact path={FINANCE_SETTING_PATH} component={SettingTypes} />
  </>
);

export const SettingsRoutes = () => {};

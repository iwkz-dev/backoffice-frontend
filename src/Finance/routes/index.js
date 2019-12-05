import React from 'react';
import { Route } from 'react-router-dom';

import {
  FINANCE_INCOME_PATH,
  FINANCE_BILL_PATH,
  FINANCE_SETTING_PATH,
} from './constants';

export const Routes = () => (
  <>
    <Route exact path={FINANCE_INCOME_PATH} component={() => (<p>pemasukan</p>)} />
    <Route exact path={FINANCE_BILL_PATH} component={() => (<p>pengeluaran</p>)} />
    <Route exact path={FINANCE_SETTING_PATH} component={() => (<p>setting</p>)} />
  </>
);

export const SettingsRoutes = () => {};

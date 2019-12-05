import React from 'react';

import { Routes as DashboardRoutes } from 'Dashboard/routes';
import { Routes as FinanceRoutes } from 'Finance/routes';

const PageRouter = () => (
  <>
    <DashboardRoutes />
    <FinanceRoutes />
  </>
);

export default PageRouter;

import React from 'react';

// components
import DashboardNav from 'Dashboard/routes/nav';
import FinanceNav from 'Finance/routes/nav';

// styles
import { ToolbarSection, CustomList } from './styled.components';

const Navigations = () => (
  <>
    <ToolbarSection />

    {/* App Navigations */}
    <CustomList>
      <DashboardNav />
      <FinanceNav />
    </CustomList>
  </>
);

export default Navigations;

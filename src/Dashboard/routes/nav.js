import React from 'react';

import { NavItem } from 'shared/components/Layout/Navigations/helpers';
import HomeIcon from '@material-ui/icons/Home';
import { DASHBOARD_ROOT_PATH } from './constants';

const DashboardNav = () => (
  <NavItem
    to={DASHBOARD_ROOT_PATH}
    text="Home"
    icon={<HomeIcon />} />
);

export default DashboardNav;

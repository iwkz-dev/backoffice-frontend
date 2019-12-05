import React from 'react';

// components
import Divider from '@material-ui/core/Divider';
import AppNavigations from './AppNavigations';

// styles
import { ToolbarSection } from './styled.components';

const Navigations = () => (
  <>
    <ToolbarSection />
    <AppNavigations />
    <Divider />
  </>
);

export default Navigations;

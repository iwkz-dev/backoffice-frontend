import React from 'react';
import PropTypes from 'prop-types';

// components
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';

// styles
import { Header } from './styled.components';

const AppHeader = ({
  handleDrawerToggle,
  onLogout,
}) => (
  <Header position="fixed">
    <Toolbar>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        onClick={handleDrawerToggle}
        className="navButton">
        <MenuIcon />
      </IconButton>
      <Typography
        variant="h5"
        color="inherit"
        className="headerTitle">
        Backoffice
      </Typography>
      <IconButton
        aria-controls="menu-appbar"
        onClick={onLogout}
        color="inherit">
        Logout
      </IconButton>
    </Toolbar>
  </Header>
);

AppHeader.propTypes = {
  handleDrawerToggle: PropTypes.func,
  onLogout: PropTypes.func,
};

AppHeader.defaultProps = {
  handleDrawerToggle: null,
  onLogout: null,
};

export default AppHeader;

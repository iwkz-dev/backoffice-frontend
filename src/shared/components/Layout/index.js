import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';
import { ThemeProvider } from 'styled-components';
import { push } from 'connected-react-router';

// actions
import { logout as logoutAction } from 'Auth/state/actions/users/single';

// components
import {
  makeStyles,
  useTheme,
  createMuiTheme,
  StylesProvider,
} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import Hidden from '@material-ui/core/Hidden';

import Header from './Header';
import Navigations from './Navigations';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

const Layout = ({
  children,
  currentUserData,
  logoutAction,
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const onLogout = () => {
    logoutAction();
    push('/');
  };

  return (
    <StylesProvider injectFirst>
      <ThemeProvider theme={createMuiTheme()}>
        <CssBaseline />
        {/* if no user data found, redirect to auth page */}
        { isEmpty(currentUserData) && children}

        { !isEmpty(currentUserData) && (
          <div className={classes.root}>
            <Header
              handleDrawerToggle={handleDrawerToggle}
              onLogout={onLogout} />
            <nav className={classes.drawer} aria-label="mailbox folders">
              <Hidden smUp implementation="css">
                <Drawer
                  variant="temporary"
                  anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                  open={mobileOpen}
                  onClose={handleDrawerToggle}
                  classes={{
                    paper: classes.drawerPaper,
                  }}
                  ModalProps={{
                    keepMounted: true,
                  }}>
                  <Navigations />
                </Drawer>
              </Hidden>
              <Hidden xsDown implementation="css">
                <Drawer
                  classes={{
                    paper: classes.drawerPaper,
                  }}
                  variant="permanent"
                  open>
                  <Navigations />
                </Drawer>
              </Hidden>
            </nav>
            <main className={classes.content}>
              <div className={classes.toolbar} />
              {children}
            </main>
          </div>
        )}
      </ThemeProvider>
    </StylesProvider>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  currentUserData: PropTypes.shape(),

  logoutAction: PropTypes.func.isRequired,
};

Layout.defaultProps = {
  currentUserData: null,
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {
  logoutAction,
};


export default connect(mapStateToProps, mapDispatchToProps)(Layout);

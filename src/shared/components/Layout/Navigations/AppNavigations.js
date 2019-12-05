import React from 'react';
import { Link } from 'react-router-dom';

// constants
import {
  DASHBOARD_ROOT_PATH,
} from 'Dashboard/routes/constants';

// components

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

const NavItem = ({ to, icon, text }) => (
  <ListItem
    button
    component={props => (<Link to={to} {...props} />)}>
    <ListItemIcon>{icon}</ListItemIcon>
    <ListItemText primary={text} />
  </ListItem>
);

const AppNavigations = () => (
  <List>
    <NavItem
      to={DASHBOARD_ROOT_PATH}
      icon={(<InboxIcon />)}
      text="Home" />

    <NavItem
      to={DASHBOARD_ROOT_PATH}
      icon={(<MailIcon />)}
      text="Income" />
  </List>
);

export default AppNavigations;

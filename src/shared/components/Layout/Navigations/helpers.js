import React from 'react';
import { Link } from 'react-router-dom';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

export const NavItem = ({ to, icon, text, open, ...other }) => (
  <ListItem
    button
    component={to ? (props) => (<Link to={to} {...props} />) : null}
    {...other}>
    { icon && <ListItemIcon>{icon}</ListItemIcon>}
    <ListItemText primary={text} />
    {
      // eslint-disable-next-line no-nested-ternary
      open != null
        ? (open ? <ExpandLess /> : <ExpandMore />)
        : null
    }
  </ListItem>
);

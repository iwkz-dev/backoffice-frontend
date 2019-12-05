import React, { useState } from 'react';

import { NavItem } from 'shared/components/Layout/Navigations/helpers';
import List from '@material-ui/core/List';
import Collapse from '@material-ui/core/Collapse';
import EuroIcon from '@material-ui/icons/Euro';
import {
  FINANCE_INCOME_PATH,
  FINANCE_BILL_PATH,
  FINANCE_SETTING_PATH,
} from './constants';

const FinanceNav = () => {
  const [open, setOpen] = useState(false);
  const onClick = () => setOpen((prevOpen) => !prevOpen);

  return (
    <>
      <NavItem
        text="Keuangan"
        open={open}
        icon={<EuroIcon />}
        onClick={onClick} />
      <Collapse component="li" in={open} timeout="auto" unmountOnExit>
        <List disablePadding>
          <NavItem
            text="Pemasukan"
            to={FINANCE_INCOME_PATH} />
          <NavItem
            text="Pengeluaran"
            to={FINANCE_BILL_PATH} />
          <NavItem
            text="Setting Keuangan"
            to={FINANCE_SETTING_PATH} />
        </List>
      </Collapse>
    </>
  );
};

export default FinanceNav;

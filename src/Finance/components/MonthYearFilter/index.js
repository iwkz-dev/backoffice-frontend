import React, { useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import MomentUtils from '@date-io/moment';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import Button from '@material-ui/core/Button';
import { FilterSection } from './styled.components';

moment.locale('id');

const MonthYearFilter = ({ onFilterChange }) => {
  const [selectedDate, onDateChange] = useState(new Date());

  const onClickFilter = () => onFilterChange(selectedDate);

  return (
    <FilterSection>
      <MuiPickersUtilsProvider
        libInstance={moment}
        locale="id"
        utils={MomentUtils}>
        <KeyboardDatePicker
          views={['year', 'month']}
          label="Bulan dan Tahun"
          minDate={new Date('2019-12-01')}
          value={selectedDate}
          onChange={onDateChange} />
      </MuiPickersUtilsProvider>

      <Button
        variant="contained"
        color="primary"
        onClick={onClickFilter}>
        Ubah Data
      </Button>
    </FilterSection>
  );
};

MonthYearFilter.propTypes = {
  onFilterChange: PropTypes.func,
};

MonthYearFilter.defaultProps = {
  onFilterChange: null,
};

export default MonthYearFilter;

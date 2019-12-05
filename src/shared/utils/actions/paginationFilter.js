import { isArray, omit } from 'lodash';
import { convertArrayForGetRequest } from 'shared/utils/apiHelpers';
import { ALL_ENTRIES_PAGINATION } from './constants';

export const generateFilters = (filters = {}, { config } = {}) => Object.keys(filters)
  .reduce((acc, key) => {
    const filterValue = filters[key];
    const keepEmptyArrayFilter = !!((config || {}).keepEmptyArrayFilter || [])
      .find((filter) => key === filter) || false;

    if (isArray(filterValue)) {
      return { ...acc, [key]: convertArrayForGetRequest(filterValue, { keepEmptyArrayFilter }) };
    }

    return { ...acc, [key]: filterValue };
  }, {});

export const generatePaginationAndFilters = (passedProps = {}) => ({
  ...omit(passedProps, 'filters', 'config'),

  ...(passedProps.filters && generateFilters(
    passedProps.filters,
    { config: (passedProps.config || {}).filters },
  )),

  page: typeof passedProps.page === 'number'
    ? passedProps.page
    : ALL_ENTRIES_PAGINATION.page,

  pageSize: typeof passedProps.pageSize === 'number'
    ? passedProps.pageSize
    : ALL_ENTRIES_PAGINATION.pageSize,
});

export default {
  generatePaginationAndFilters,
};

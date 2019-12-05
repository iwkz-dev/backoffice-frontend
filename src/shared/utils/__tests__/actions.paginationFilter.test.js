import { ALL_ENTRIES_PAGINATION } from '../actions/constants';
import { generateFilters, generatePaginationAndFilters } from '../actions/paginationFilter';

describe('Test Actions paginationFilter', () => {
  const mocks = {
    filters: {
      positions: 'Manager',
      location: ['Berlin', 'Hamburg'],
    },
    page: 1,
    pageSize: 20,
  };

  it('generateFilters withFilter shouldReturnFilter', () => {
    const expectedResult = {
      positions: 'Manager',
      location: '[Berlin,Hamburg]',
    };
    const result = generateFilters(mocks.filters);

    expect(result).toEqual(expectedResult);
  });

  it('generateFilters withNoFilter shouldReturnNothing', () => {
    const result = generateFilters();

    expect(result).toEqual({});
  });

  it('generatePaginationAndFilters withFilterAndPagination shouldReturnSeparatePaginationAndFilter', () => {
    const expectedResult = {
      positions: 'Manager',
      location: '[Berlin,Hamburg]',
      page: 1,
      pageSize: 20,
    };

    const result = generatePaginationAndFilters(mocks);

    expect(result).toEqual(expectedResult);
  });

  it('generatePaginationAndFilters withPagination shouldReturnPagination', () => {
    const expectedResult = {
      page: 1,
      pageSize: 20,
    };

    const { page, pageSize } = mocks;
    const result = generatePaginationAndFilters({ page, pageSize });

    expect(result).toEqual(expectedResult);
  });

  it('generatePaginationAndFilters withFilter shouldReturnFilterAndDefaultPagination', () => {
    const expectedResult = {
      positions: 'Manager',
      location: '[Berlin,Hamburg]',
      ...ALL_ENTRIES_PAGINATION,
    };

    const { filters } = mocks;
    const result = generatePaginationAndFilters({ filters });

    expect(result).toEqual(expectedResult);
  });
});

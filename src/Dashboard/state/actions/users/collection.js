import { IWKZ_API } from 'shared/middleware/api';
import { METHOD_GET } from 'shared/constants/httpMethod';
import { generatePaginationAndFilters } from 'shared/utils/actions/paginationFilter';
import {
  COLLECTION_FETCH,
  COLLECTION_FETCH_SUCCESS,
  COLLECTION_FETCH_FAILURE,
} from './types';

const fetch = ({
  componentId,
  paginationAndFiltering = {},
} = {}) => ({
  [IWKZ_API]: {
    types: [
      COLLECTION_FETCH,
      COLLECTION_FETCH_SUCCESS,
      COLLECTION_FETCH_FAILURE,
    ],
    endpoint: 'api/users',
    method: METHOD_GET,
    params: { ...generatePaginationAndFilters(paginationAndFiltering) },
    actionParams: { componentId },
  },
});

export { fetch };

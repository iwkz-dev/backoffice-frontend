import { IWKZ_API } from 'shared/middleware/api';
import { METHOD_GET } from 'shared/constants/httpMethod';
import {
  COLLECTION_FETCH,
  COLLECTION_FETCH_SUCCESS,
  COLLECTION_FETCH_FAILURE,
} from './types';

const fetch = ({
  componentId,
} = {}) => ({
  [IWKZ_API]: {
    types: [
      COLLECTION_FETCH,
      COLLECTION_FETCH_SUCCESS,
      COLLECTION_FETCH_FAILURE,
    ],
    endpoint: 'api/bill/types',
    method: METHOD_GET,
    params: {},
    actionParams: { componentId },
  },
});

export { fetch };

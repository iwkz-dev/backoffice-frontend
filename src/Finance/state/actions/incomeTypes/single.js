import { IWKZ_API } from 'shared/middleware/api';
import { METHOD_POST, METHOD_PUT } from 'shared/constants/httpMethod';
import {
  SINGLE_ADD,
  SINGLE_ADD_SUCCESS,
  SINGLE_ADD_FAILURE,

  SINGLE_UPDATE,
  SINGLE_UPDATE_SUCCESS,
  SINGLE_UPDATE_FAILURE,
} from './types';

export const add = ({
  componentId,
  data = {},
} = {}) => ({
  [IWKZ_API]: {
    types: [
      SINGLE_ADD,
      SINGLE_ADD_SUCCESS,
      SINGLE_ADD_FAILURE,
    ],
    endpoint: 'api/income/type',
    method: METHOD_POST,
    params: data,
    actionParams: { componentId },
  },
});

export const update = ({
  componentId,
  id,
  data = {},
} = {}) => ({
  [IWKZ_API]: {
    types: [
      SINGLE_UPDATE,
      SINGLE_UPDATE_SUCCESS,
      SINGLE_UPDATE_FAILURE,
    ],
    endpoint: `api/income/type/${id}`,
    method: METHOD_PUT,
    params: data,
    actionParams: { componentId },
  },
});

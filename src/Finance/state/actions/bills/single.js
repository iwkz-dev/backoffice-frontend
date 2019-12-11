import { IWKZ_API } from 'shared/middleware/api';
import { METHOD_POST, METHOD_PUT, METHOD_DELETE } from 'shared/constants/httpMethod';
import {
  SINGLE_ADD,
  SINGLE_ADD_SUCCESS,
  SINGLE_ADD_FAILURE,

  SINGLE_UPDATE,
  SINGLE_UPDATE_SUCCESS,
  SINGLE_UPDATE_FAILURE,

  SINGLE_DELETE,
  SINGLE_DELETE_SUCCESS,
  SINGLE_DELETE_FAILURE,
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
    endpoint: 'api/bill',
    method: METHOD_POST,
    params: data,
    actionParams: { componentId },
  },
});

export const update = ({
  id,
  data = {},
} = {}) => ({
  [IWKZ_API]: {
    types: [
      SINGLE_UPDATE,
      SINGLE_UPDATE_SUCCESS,
      SINGLE_UPDATE_FAILURE,
    ],
    endpoint: `api/bill/${id}`,
    method: METHOD_PUT,
    params: data,
    actionParams: { componentId: id },
  },
});

export const remove = ({
  id,
} = {}) => ({
  [IWKZ_API]: {
    types: [
      SINGLE_DELETE,
      SINGLE_DELETE_SUCCESS,
      SINGLE_DELETE_FAILURE,
    ],
    endpoint: `api/bill/${id}`,
    method: METHOD_DELETE,
    params: {},
    actionParams: { componentId: id },
  },
});

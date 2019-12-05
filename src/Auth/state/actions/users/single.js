import { IWKZ_API } from 'shared/middleware/api';
import { METHOD_POST } from 'shared/constants/httpMethod';
import {
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,

  PERFORM_LOGOUT,
} from './types';

export const login = ({ username, password }) => ({
  [IWKZ_API]: {
    types: [
      LOGIN,
      LOGIN_SUCCESS,
      LOGIN_FAILURE,
    ],
    endpoint: 'api/auth/login',
    method: METHOD_POST,
    params: { username, password },
    actionParams: {},
  },
});

export const logout = () => ({ type: PERFORM_LOGOUT });

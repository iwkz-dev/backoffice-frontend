import {
  LOGIN_SUCCESS,
  PERFORM_LOGOUT,
} from 'Auth/state/actions/users/types';
import {
  setAuthToken,
  setCurrentUser,
  clearAll,
} from './helpers';

export default () => (next) => (action) => {
  const { type, payload } = action;

  switch (type) {
    case LOGIN_SUCCESS:

      setAuthToken(payload.body.token);
      setCurrentUser({ username: payload.body.username });
      break;

    case PERFORM_LOGOUT:
      clearAll();
      break;

    default: break;
  }

  next(action);
};

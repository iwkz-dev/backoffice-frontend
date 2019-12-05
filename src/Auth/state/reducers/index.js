import reducer from 'shared/utils/reducers';

// Users:
import {
  INITIAL_STATE as USERS_STATE,
  HANDLERS as USERS_HANDLERS,
} from './users';

export const initialState = {
  ...USERS_STATE,
};

export default (state = initialState, action) => reducer(state, action, {
  ...USERS_HANDLERS,
});

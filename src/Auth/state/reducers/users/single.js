import { getCurrentUser } from 'shared/middleware/webStorage/helpers';
import {
  generateEmptyErrors,
  handleApiErrors,
} from 'shared/utils/reducers/errorsHelpers';
import {
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,

  PERFORM_LOGOUT,
} from 'Auth/state/actions/users/types';
import { ROOT, SINGLE as IDENTIFIER } from './constants';

export const generateEntryData = () => ({
  isCreated: false,
  fetching: false,
  data: getCurrentUser() || {},
  errors: generateEmptyErrors(),
});

export const INITIAL_STATE = {
  [IDENTIFIER]: generateEntryData(),
};

export const HANDLERS = {
  // login:
  [LOGIN]: (state, action) => {
    let theState = state[ROOT][IDENTIFIER];

    if (!theState) {
      theState = generateEntryData();
    }

    theState.fetching = true;
    theState.errors = generateEmptyErrors();

    return {
      ...state,
      [ROOT]: {
        ...state[ROOT],
        [IDENTIFIER]: {
          ...theState,
        },
      },
    };
  },

  [LOGIN_SUCCESS]: (state, action) => {
    let theState = state[ROOT][IDENTIFIER];
    const { token, username } = action.payload.body;

    if (!theState) {
      theState = generateEntryData();
    }

    theState.fetching = false;
    theState.data = { token, username };

    return {
      ...state,
      [ROOT]: {
        ...state[ROOT],
        [IDENTIFIER]: {
          ...theState,
        },
      },
    };
  },

  [LOGIN_FAILURE]: (state, action) => {
    let theState = state[ROOT][IDENTIFIER];

    if (!theState) {
      theState = generateEntryData();
    }

    theState.fetching = false;
    theState.errors = handleApiErrors(action.payload);

    return {
      ...state,
      [ROOT]: {
        ...state[ROOT],
        [IDENTIFIER]: {
          ...theState,
        },
      },
    };
  },

  // logout
  [PERFORM_LOGOUT]: (state, action) => {
    let theState = state[ROOT][IDENTIFIER];

    if (!theState) {
      theState = generateEntryData();
    }

    theState.isCreated = false;
    theState.data = {};

    return {
      ...state,
      [ROOT]: {
        ...state[ROOT],
        [IDENTIFIER]: {
          ...theState,
        },
      },
    };
  },
};

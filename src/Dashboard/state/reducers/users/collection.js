import { cloneDeep } from 'lodash';
import {
  generateEmptyErrors,
  handleApiErrors,
} from 'shared/utils/reducers/errorsHelpers';
import {
  COLLECTION_FETCH,
  COLLECTION_FETCH_SUCCESS,
  COLLECTION_FETCH_FAILURE,
} from 'Dashboard/state/actions/users/types';
import { ROOT, COLLECTION as IDENTIFIER } from './constants';

export const generateEntryData = () => ({
  fetching: false,
  data: [],
  errors: generateEmptyErrors(),
});

export const INITIAL_STATE = {
  [IDENTIFIER]: {},
};

export const HANDLERS = {
  [COLLECTION_FETCH]: (state, action) => {
    const { componentId: entityId } = action.params;
    const theState = state[ROOT][IDENTIFIER];

    if (!theState[entityId]) {
      theState[entityId] = generateEntryData();
    }

    const theEntity = cloneDeep(theState[entityId]);

    theEntity.fetching = true;
    theEntity.errors = generateEmptyErrors();

    return {
      ...state,
      [ROOT]: {
        ...state[ROOT],
        [IDENTIFIER]: {
          ...theState,
          [entityId]: theEntity,
        },
      },
    };
  },

  [COLLECTION_FETCH_SUCCESS]: (state, action) => {
    const { componentId: entityId } = action.params;
    const theState = state[ROOT][IDENTIFIER];

    if (!theState[entityId]) {
      theState[entityId] = generateEntryData();
    }

    const theEntity = cloneDeep(theState[entityId]);

    theEntity.fetching = false;
    theEntity.data = action.payload.body.data;

    return {
      ...state,
      [ROOT]: {
        ...state[ROOT],
        [IDENTIFIER]: {
          ...theState,
          [entityId]: theEntity,
        },
      },
    };
  },

  [COLLECTION_FETCH_FAILURE]: (state, action) => {
    const { componentId: entityId } = action.params;
    const theState = state[ROOT][IDENTIFIER];

    if (!theState[entityId]) {
      theState[entityId] = generateEntryData();
    }

    const theEntity = cloneDeep(theState[entityId]);

    theEntity.fetching = false;
    theEntity.errors = handleApiErrors(action.payload);

    return {
      ...state,
      [ROOT]: {
        ...state[ROOT],
        [IDENTIFIER]: {
          ...theState,
          [entityId]: theEntity,
        },
      },
    };
  },
};

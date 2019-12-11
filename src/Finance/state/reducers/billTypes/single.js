import { cloneDeep } from 'lodash';
import {
  generateEmptyErrors,
  handleApiErrors,
} from 'shared/utils/reducers/errorsHelpers';
import {
  SINGLE_ADD,
  SINGLE_ADD_SUCCESS,
  SINGLE_ADD_FAILURE,

  SINGLE_UPDATE,
  SINGLE_UPDATE_SUCCESS,
  SINGLE_UPDATE_FAILURE,
} from 'Finance/state/actions/billTypes/types';
import { ROOT, SINGLE as IDENTIFIER } from './constants';

export const generateEntryData = () => ({
  isAdded: false,
  isUpdated: false,
  fetching: false,
  data: {},
  errors: generateEmptyErrors(),
});

export const INITIAL_STATE = {
  [IDENTIFIER]: {},
};

export const HANDLERS = {
  // add
  [SINGLE_ADD]: (state, action) => {
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

  [SINGLE_ADD_SUCCESS]: (state, action) => {
    const { componentId: entityId } = action.params;
    const theState = state[ROOT][IDENTIFIER];

    if (!theState[entityId]) {
      theState[entityId] = generateEntryData();
    }

    const theEntity = cloneDeep(theState[entityId]);

    theEntity.fetching = false;
    theEntity.isAdded = true;

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

  [SINGLE_ADD_FAILURE]: (state, action) => {
    const { componentId: entityId } = action.params;
    const theState = state[ROOT][IDENTIFIER];

    if (!theState[entityId]) {
      theState[entityId] = generateEntryData();
    }

    const theEntity = cloneDeep(theState[entityId]);

    theEntity.fetching = false;
    theEntity.isAdded = false;
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

  // update
  [SINGLE_UPDATE]: (state, action) => {
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

  [SINGLE_UPDATE_SUCCESS]: (state, action) => {
    const { componentId: entityId } = action.params;
    const theState = state[ROOT][IDENTIFIER];

    if (!theState[entityId]) {
      theState[entityId] = generateEntryData();
    }

    const theEntity = cloneDeep(theState[entityId]);

    theEntity.fetching = false;
    theEntity.isUpdated = true;

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

  [SINGLE_UPDATE_FAILURE]: (state, action) => {
    const { componentId: entityId } = action.params;
    const theState = state[ROOT][IDENTIFIER];

    if (!theState[entityId]) {
      theState[entityId] = generateEntryData();
    }

    const theEntity = cloneDeep(theState[entityId]);

    theEntity.fetching = false;
    theEntity.isUpdated = false;
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

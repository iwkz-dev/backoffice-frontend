import { isEqual } from 'lodash';
import { generateEmptyErrors } from './errorsHelpers';

export const entryIsErroneous = (entry) => entry.errors
  && !isEqual(entry.errors, generateEmptyErrors());

export const entryIsLoading = (entry) => entry.fetching;

export default (state, action, actionHandlers) => {
  if (actionHandlers[action.type]) {
    return typeof actionHandlers[action.type] === 'function'
      ? actionHandlers[action.type](state, action)
      : actionHandlers[action.type];
  }
  return state;
};

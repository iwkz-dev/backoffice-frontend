import { uniqueId } from 'lodash';

export const DISMISS_ERROR = 'DISMISS_ERROR';
export const CREATE_ERROR = 'CREATE_ERROR';

export const dismissError = (errorID) => ({
  type: DISMISS_ERROR,
  payload: {
    errorID,
  },
});

export const createError = (message) => ({
  type: CREATE_ERROR,
  payload: {
    id: uniqueId('error_'),
    message,
    occurrenceTimestamp: new Date().getTime(),
  },
});

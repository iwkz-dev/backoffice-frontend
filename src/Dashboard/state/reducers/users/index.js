import { ROOT } from './constants';
import {
  INITIAL_STATE as STATE_FOR_COLLECTION,
  HANDLERS as HANDLERS_FOR_COLLECTION,
} from './collection';

export const INITIAL_STATE = {
  [ROOT]: {
    ...STATE_FOR_COLLECTION,
  },
};

export const HANDLERS = {
  ...HANDLERS_FOR_COLLECTION,
};

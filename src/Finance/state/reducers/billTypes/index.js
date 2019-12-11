import { ROOT } from './constants';
import {
  INITIAL_STATE as STATE_FOR_COLLECTION,
  HANDLERS as HANDLERS_FOR_COLLECTION,
} from './collection';

import {
  INITIAL_STATE as STATE_FOR_SINGLE,
  HANDLERS as HANDLERS_FOR_SINGLE,
} from './single';

export const INITIAL_STATE = {
  [ROOT]: {
    ...STATE_FOR_COLLECTION,
    ...STATE_FOR_SINGLE,
  },
};

export const HANDLERS = {
  ...HANDLERS_FOR_COLLECTION,
  ...HANDLERS_FOR_SINGLE,
};

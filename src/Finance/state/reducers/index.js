import reducer from 'shared/utils/reducers';

// incomes
import {
  INITIAL_STATE as INCOMES_STATE,
  HANDLERS as INCOMES_HANDLERS,
} from './incomes';

// incomeTypes
import {
  INITIAL_STATE as INCOME_TYPES_STATE,
  HANDLERS as INCOME_TYPES_HANDLERS,
} from './incomeTypes';

// billTypes
import {
  INITIAL_STATE as BILL_TYPES_STATE,
  HANDLERS as BILL_TYPES_HANDLERS,
} from './billTypes';

// bills
import {
  INITIAL_STATE as BILL_STATE,
  HANDLERS as BILL_HANDLERS,
} from './bills';

export const initialState = {
  ...INCOMES_STATE,
  ...INCOME_TYPES_STATE,
  ...BILL_TYPES_STATE,
  ...BILL_STATE,
};

export default (state = initialState, action) => reducer(state, action, {
  ...INCOMES_HANDLERS,
  ...INCOME_TYPES_HANDLERS,
  ...BILL_TYPES_HANDLERS,
  ...BILL_HANDLERS,
});

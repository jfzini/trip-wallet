import { GET_CURRENCIES, SAVE_EXPENSES, CALC_SUBTOTAL, DELETE_EXPENSE, DELETE_SUBTOTAL } from '../actions';

const INITIAL_STATE = {
  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  subtotals: [],
  // total: 0,
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
};

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_CURRENCIES:
    return {
      ...state,
      currencies: action.payload,
    };
  case SAVE_EXPENSES:
    return {
      ...state,
      expenses: [...state.expenses, ...action.payload],
    };
  case CALC_SUBTOTAL:
    return {
      ...state,
      subtotals: [...state.subtotals, ...action.payload],
    };
  case DELETE_EXPENSE:
    return {
      ...state,
      expenses: action.payload,
    }
  case DELETE_SUBTOTAL:
    return {
      ...state,
      subtotals: action.payload,
    }
  default:
    return state;
  }
};

export default walletReducer;

import {
  GET_CURRENCIES,
  SAVE_EXPENSES,
  CALC_SUBTOTAL,
  DELETE_EXPENSE,
  EDIT_INDEX,
  EDIT_EXPENSE,
} from '../actions';

const INITIAL_STATE = {
  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  subtotals: {}, // objeto com todos os subtotais de gastos
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
      subtotals: action.payload,
    };
  case DELETE_EXPENSE:
    return {
      ...state,
      expenses: action.payload,
    };
  case EDIT_INDEX:
    return {
      ...state,
      idToEdit: action.payload,
      editor: true,
    };
  case EDIT_EXPENSE:
    return {
      ...state,
      expenses: action.payload,
      editor: false,
    };
  default:
    return state;
  }
};

export default walletReducer;

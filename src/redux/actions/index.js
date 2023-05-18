export const SUBMIT_LOGIN = 'SUBMIT_LOGIN';
export const GET_CURRENCIES = 'GET_CURRENCIES';
export const SAVE_EXPENSES = 'SAVE_EXPENSES';
export const CALC_SUBTOTAL = 'CALC_SUBTOTAL';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';
export const DELETE_SUBTOTAL = 'DELETE_SUBTOTAL';
export const EDIT_INDEX = 'EDIT_INDEX';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';
export const EDIT_DATA = 'EDIT_DATA';

export const actionSubmitLogin = (state) => ({
  type: SUBMIT_LOGIN,
  payload: state,
});

const loadCurrencies = (currencies) => ({
  type: GET_CURRENCIES,
  payload: currencies,
});

export const actionSaveExpense = (localState, id, exchangeRates) => ({
  type: SAVE_EXPENSES,
  payload: [
    {
      ...localState,
      id,
      exchangeRates,
    },
  ],
});

export const actionDeleteExpense = (id, expenses) => {
  const filteredExpenses = expenses.filter((expense) => expense.id !== id);
  return {
    type: DELETE_EXPENSE,
    payload: filteredExpenses,
  };
};

export const actionCalcSubtotal = (currencyData, value, id, subtotals = []) => ({
  type: CALC_SUBTOTAL,
  payload: { ...subtotals, [id]: (currencyData.ask * Number(value)).toFixed(2) },
});

export const actionDeleteSubtotal = (id, subtotals) => {
  delete subtotals[id];
  return {
    type: CALC_SUBTOTAL,
    payload: subtotals,
  };
};

export const actionGetCurrencies = () => async (dispatch) => {
  try {
    const fetchCurrencies = await fetch('https://economia.awesomeapi.com.br/json/all');
    const JSONCurrencies = await fetchCurrencies.json();
    const currenciesArray = Object.keys(JSONCurrencies).filter((key) => key !== 'USDT');
    dispatch(loadCurrencies(currenciesArray));
  } catch (error) {
    throw new Error(error);
  }
};

export const actionGetIndexToEdit = (index) => ({
  type: EDIT_INDEX,
  payload: index,
});

export const actionEditExpense = (expenses) => ({
  type: EDIT_EXPENSE,
  payload: expenses,
});

export const actionPreloadEditData = ({ value, currency, method, tag, description }) => ({
  type: EDIT_DATA,
  payload: { value, currency, method, tag, description }
})

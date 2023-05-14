export const SUBMIT_LOGIN = 'SUBMIT_LOGIN';
export const GET_CURRENCIES = 'GET_CURRENCIES';
export const SAVE_EXPENSES = 'SAVE_EXPENSES';
export const CALC_SUBTOTAL = 'CALC_SUBTOTAL';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';
export const DELETE_SUBTOTAL = 'DELETE_SUBTOTAL';
export const EDIT_INDEX = 'EDIT_INDEX';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';

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

export const actionAddSubtotal = (currencyData, value, id, subtotals = []) =>
  // if (subtotals.length > 0) {
  //   const indexes = subtotals.map(el => Object.keys(el)[0]);
  //   const editingIndex = indexes.indexOf(id);
  //   console.log(indexes);
  //   if (editingIndex !== -1) {
  //     subtotals[editingIndex] = { [id]: (currencyData.ask * Number(value)).toFixed(2) }
  //     return {
  //       type: CALC_SUBTOTAL,
  //       payload: subtotals,
  //     }
  //   }
  // }
  ({
    type: CALC_SUBTOTAL,
    payload: { ...subtotals, [id]: (currencyData.ask * Number(value)).toFixed(2) },
  });
export const actionDeleteSubtotal = (id, subtotals) => {
  delete subtotals[id];
  // const filteredSubtotals = subtotals
  //   .filter((subtotal) => Number(Object.keys(subtotal)[0]) !== id);
  return {
    type: DELETE_SUBTOTAL,
    payload: subtotals,
  };
};

export const actionGetCurrencies = () => async (dispatch) => {
  const fetchCurrencies = await fetch('https://economia.awesomeapi.com.br/json/all');
  const JSONCurrencies = await fetchCurrencies.json();
  const currenciesArray = Object.keys(JSONCurrencies).filter((key) => key !== 'USDT');
  dispatch(loadCurrencies(currenciesArray));
};

export const actionGetIndexToEdit = (index) => ({
  type: EDIT_INDEX,
  payload: index,
});

export const actionEditExpense = (expenses) => ({
  type: EDIT_EXPENSE,
  payload: expenses,
});

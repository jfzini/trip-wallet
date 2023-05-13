export const SUBMIT_LOGIN = 'SUBMIT_LOGIN';
export const GET_CURRENCIES = 'GET_CURRENCIES';
export const SAVE_EXPENSES = 'SAVE_EXPENSES';

export const actionSubmitLogin = (state) => ({
  type: SUBMIT_LOGIN,
  payload: state,
});

const loadCurrencies = (currencies) => ({
  type: GET_CURRENCIES,
  payload: currencies,
});

export const actionSaveExpense = (localState, id, exchangeRate) => ({
  type: SAVE_EXPENSES,
  payload: [
    {
      ...localState,
      id,
      exchangeRate,
      subtotal: (localState.value * exchangeRate).toFixed(2),
    },
  ],
});

// export const actionCalcTotal = (expenses) => ({
//   type: 'CALC_TOTAL',
//   payload: expenses.map(el => Number(el.subtotal)).reduce((a, b) => a + b, 0),
// })

export const actionGetCurrencies = () => async (dispatch) => {
  const fetchCurrencies = await fetch('https://economia.awesomeapi.com.br/json/all');
  const JSONCurrencies = await fetchCurrencies.json();
  const currenciesArray = Object.keys(JSONCurrencies).filter((key) => key !== 'USDT');
  dispatch(loadCurrencies(currenciesArray));
};

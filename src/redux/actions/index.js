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

export const actionSaveExpense = (localState, id, exchangeRates) => ({
  type: SAVE_EXPENSES,
  payload: [
    {
      ...localState,
      id,
      exchangeRates,
      // subtotal: (localState.value * exchangeRates).toFixed(2),
    },
  ],
});

export const actionCalcSubtotal = (currencies, currency, value) => {
  const allCurrenciesData = Object.values(currencies);
  const currencyData = allCurrenciesData.find(({ code }) => code === currency);
  return {
    type: 'CALC_SUBTOTAL',
    payload: [(currencyData.ask * Number(value)).toFixed(2)],
  };
};

export const actionGetCurrencies = () => async (dispatch) => {
  const fetchCurrencies = await fetch('https://economia.awesomeapi.com.br/json/all');
  const JSONCurrencies = await fetchCurrencies.json();
  const currenciesArray = Object.keys(JSONCurrencies).filter((key) => key !== 'USDT');
  dispatch(loadCurrencies(currenciesArray));
};

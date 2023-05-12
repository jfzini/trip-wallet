export const SUBMIT_LOGIN = 'SUBMIT_LOGIN';
export const GET_CURRENCIES = 'GET_CURRENCIES';

export const actionSubmitLogin = (state) => ({
  type: SUBMIT_LOGIN,
  payload: state,
});

const loadCurrencies = (currencies) => ({
  type: GET_CURRENCIES,
  payload: currencies,
});

export const actionGetCurrencies = () => async (dispatch) => {
  const fetchCurrencies = await fetch('https://economia.awesomeapi.com.br/json/all');
  const JSONCurrencies = await fetchCurrencies.json();
  const currenciesArray = Object.keys(JSONCurrencies).filter((key) => key !== 'USDT');
  dispatch(loadCurrencies(currenciesArray));
};

export const getExchangeRate = async () => {
  const fetchCurrencies = await fetch('https://economia.awesomeapi.com.br/json/all');
  const JSONCurrencies = await fetchCurrencies.json();
  return JSONCurrencies;
};

export const getCurrencyData = (currencies, currency) => {
  const allCurrenciesData = Object.values(currencies);
  const currencyData = allCurrenciesData.find(({ code }) => code === currency);
  return currencyData;
};

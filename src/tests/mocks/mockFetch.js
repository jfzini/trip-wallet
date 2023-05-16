import mockData from './mockData';

export const mockFetch = () => {
  return Promise.resolve({
    json: () => Promise.resolve(mockData.wallet.expenses[0].exchangeRates),
  });
};

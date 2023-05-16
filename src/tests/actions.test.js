import { actionAddSubtotal, actionGetCurrencies } from '../redux/actions';
import mockData from './mocks/mockData';

describe('All the actionCreators that have branches should work correctly', () => {
  test('actionAddSubtotal should be working correctly with default parameter', () => {
    const currencyData = mockData.wallet.expenses[0].exchangeRates.USD;
    const value = 50;
    const id = 1;
    const subtotals = [];
    const expectedReturn = {
      type: 'CALC_SUBTOTAL',
      payload: {
        1: '245.66',
      },
    };

    expect(actionAddSubtotal(currencyData, value, id, subtotals)).toEqual(expectedReturn);
    expect(actionAddSubtotal(currencyData, value, id)).toEqual(expectedReturn);
  });

  test('actionGetCurrencies should be throwing error if the fetch is rejected', () => {
    jest.spyOn(global, 'fetch').mockRejectedValueOnce('erro');
    expect(actionGetCurrencies()).rejects.toThrow();
  });
});

import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import { mockFetch } from './mocks/mockFetch';
import App from '../App';
import mockData from './mocks/mockData';

describe('Tests if the Wallet page is working as intended', () => {
  beforeEach(() => jest.spyOn(global, 'fetch').mockImplementation(mockFetch));
  afterEach(jest.clearAllMocks);

  const totalFieldID = 'total-field';
  const valueInputID = 'value-input';
  const descriptionInputID = 'description-input';
  const currencyInputID = 'currency-input';
  const methodInputID = 'method-input';
  const tagInputID = 'tag-input';

  it('should render a correct landing page after loging in', async () => {
    const { history } = renderWithRouterAndRedux(<App />);

    // Filling login form
    const email = screen.getByTestId('email-input');
    const password = screen.getByTestId('password-input');
    const btn = screen.getByRole('button', { name: /^entrar$/i });

    userEvent.type(email, 'teste@teste.com');
    userEvent.type(password, '123456');
    await waitFor(() => { expect(btn).toBeEnabled(); });
    userEvent.click(btn);

    const { pathname } = history.location;
    expect(pathname).toBe('/carteira');

    // Rendering wallet page
    const totalField = screen.getByTestId(totalFieldID);
    const valueInput = screen.getByTestId(valueInputID);
    const descriptionInput = screen.getByTestId(descriptionInputID);
    const currencyInput = screen.getByTestId(currencyInputID);
    const methodInput = screen.getByTestId(methodInputID);
    const tagInput = screen.getByTestId(tagInputID);
    const addBtn = screen.getByRole('button', { name: /adicionar despesa/i });
    const table = screen.getByRole('table');

    expect(totalField).toHaveTextContent('0.00');
    expect(valueInput).toHaveTextContent('');
    expect(descriptionInput).toHaveTextContent('');
    await waitFor(() => { expect(currencyInput.value).toEqual('USD'); });
    await waitFor(() => { expect(methodInput.value).toEqual('Dinheiro'); });
    await waitFor(() => { expect(tagInput.value).toEqual('Alimentação'); });
    expect(addBtn).toBeVisible();
    expect(table).toBeVisible();
  });

  it('should render a predetermined expense passed as initial global state', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'], initialState: mockData });

    expect(screen.getByRole('cell', { name: /despesa de teste/i })).toBeVisible();
    expect(screen.getByRole('cell', { name: /lazer/i })).toBeVisible();
    expect(screen.getByRole('cell', { name: /cartão de crédito/i })).toBeVisible();
    expect(screen.getByRole('cell', { name: /10\.00/i })).toBeVisible();
    expect(screen.getByRole('cell', { name: /dólar canadense\/real brasileiro/i }))
      .toBeVisible();
    expect(screen.getByRole('cell', { name: /3\.65/i })).toBeVisible();
    expect(screen.getByRole('cell', { name: /36\.50/i })).toBeVisible();
    expect(screen.getByRole('img', { name: /delete-expense/i })).toBeVisible();
    expect(screen.getByRole('img', { name: /edit-expense/i })).toBeVisible();
  });

  it('should render an aditional expense and save in the global state', async () => {
    const { store } = renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'], initialState: mockData });

    const valueInput = screen.getByTestId(valueInputID);
    const descriptionInput = screen.getByTestId(descriptionInputID);
    const currencyInput = screen.getByTestId(currencyInputID);
    const methodInput = screen.getByTestId(methodInputID);
    const tagInput = screen.getByTestId(tagInputID);

    userEvent.type(valueInput, '20');
    userEvent.type(descriptionInput, 'Teste de adição de descrição');
    userEvent.selectOptions(currencyInput, 'USD');
    userEvent.selectOptions(methodInput, 'Dinheiro');
    userEvent.selectOptions(tagInput, 'Transporte');
    userEvent.click(screen.getByRole('button', { name: /adicionar despesa/i }));

    await waitFor(() => {
      expect(screen.getAllByRole('img', { name: /delete-expense/i })).toHaveLength(2);
      expect(screen.getByRole('cell', { name: /Teste de adição de descrição/i }))
        .toBeVisible();
      expect(screen.getByRole('cell', { name: /transporte/i })).toBeVisible();
      expect(screen.getByRole('cell', { name: /dinheiro/i })).toBeVisible();
      expect(screen.getByRole('cell', { name: /20\.00/i })).toBeVisible();
      expect(screen.getByRole('cell', { name: /dólar americano\/real brasileiro/i }))
        .toBeVisible();
      expect(screen.getByRole('cell', { name: /4\.91/i })).toBeVisible();
      expect(screen.getByRole('cell', { name: /98\.26/i })).toBeVisible();
      expect(screen.getByTestId('total-field')).toHaveTextContent(/134\.76/);
    });

    expect(store.getState().wallet.subtotals).toEqual({ 0: '36.50', 1: '98.26' });
  });

  it('should edit an expense correctly', async () => {
    const { store } = renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'], initialState: mockData });

    const valueInput = screen.getByTestId(valueInputID);
    const descriptionInput = screen.getByTestId(descriptionInputID);
    const currencyInput = screen.getByTestId(currencyInputID);
    const methodInput = screen.getByTestId(methodInputID);
    const tagInput = screen.getByTestId(tagInputID);

    userEvent.click(screen.getByRole('img', { name: /edit-expense/i }));
    expect(screen.queryByRole('button', { name: /\bsalvar\b/i })).toBeVisible();

    userEvent.clear(valueInput);
    userEvent.type(valueInput, '15');
    userEvent.clear(descriptionInput);
    userEvent.type(descriptionInput, 'Teste de alteração de descrição');
    userEvent.selectOptions(currencyInput, 'USD');
    userEvent.selectOptions(methodInput, 'Dinheiro');
    userEvent.selectOptions(tagInput, 'Alimentação');
    userEvent.click(screen.queryByRole('button', { name: /\bsalvar\b/i }));

    await waitFor(() => {
      expect(screen.getByRole('cell', { name: /Teste de alteração de descrição/i }))
        .toBeVisible();
      expect(screen.getByRole('cell', { name: /alimentação/i })).toBeVisible();
      expect(screen.getByRole('cell', { name: /dinheiro/i })).toBeVisible();
      expect(screen.getByRole('cell', { name: /15\.00/i })).toBeVisible();
      expect(screen.getByRole('cell', { name: /dólar americano\/real brasileiro/i }))
        .toBeVisible();
      expect(screen.getByRole('cell', { name: /4\.91/i })).toBeVisible();
      expect(screen.getByRole('cell', { name: /73\.70/i })).toBeVisible();
      expect(screen.getByRole('img', { name: /delete-expense/i })).toBeVisible();
      expect(screen.getByRole('img', { name: /edit-expense/i })).toBeVisible();
      expect(screen.queryByRole('button', { name: /\bsalvar\b/i }))
        .not.toBeInTheDocument();
    });

    expect(store.getState().wallet.subtotals).toEqual({ 0: '73.70' });
  });

  it('should delete an expense correctly', async () => {
    const { store } = renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'], initialState: mockData });

    expect(screen.getByRole('cell', { name: /Teste de alteração de descrição/i }))
      .toBeVisible();
    expect(screen.getByRole('cell', { name: /alimentação/i })).toBeVisible();
    expect(screen.getByRole('cell', { name: /dinheiro/i })).toBeVisible();
    expect(screen.getByRole('cell', { name: /15\.00/i })).toBeVisible();
    expect(screen.getByRole('cell', { name: /dólar americano\/real brasileiro/i }))
      .toBeVisible();
    expect(screen.getByRole('cell', { name: /4\.91/i })).toBeVisible();
    expect(screen.getByRole('cell', { name: /73\.70/i })).toBeVisible();
    expect(screen.getByRole('img', { name: /delete-expense/i })).toBeVisible();
    expect(screen.getByRole('img', { name: /edit-expense/i })).toBeVisible();

    userEvent.click(screen.getByRole('img', { name: /delete-expense/i }));

    await waitFor(() => {
      expect(screen.queryByRole('cell', { name: /Teste de alteração de descrição/i }))
        .not.toBeInTheDocument();
      expect(screen.queryByRole('cell', { name: /alimentação/i })).not.toBeInTheDocument();
      expect(screen.queryByRole('cell', { name: /dinheiro/i })).not.toBeInTheDocument();
      expect(screen.queryByRole('cell', { name: /15\.00/i })).not.toBeInTheDocument();
      expect(screen.queryByRole('cell', { name: /dólar americano\/real brasileiro/i }))
        .not.toBeInTheDocument();
      expect(screen.queryByRole('cell', { name: /4\.91/i })).not.toBeInTheDocument();
      expect(screen.queryByRole('cell', { name: /73\.70/i })).not.toBeInTheDocument();
      expect(screen.queryByRole('button', { name: /excluir/i })).not.toBeInTheDocument();
      expect(screen.queryByRole('button', { name: /\beditar\b/i })).not.toBeInTheDocument();
      expect(screen.queryByRole('button', { name: /editar despesa/i }))
        .not.toBeInTheDocument();
    });

    expect(store.getState().wallet.subtotals).toEqual({});
  });
});

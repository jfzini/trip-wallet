import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import Wallet from '../pages/Wallet';
import App from '../App';

describe('Tests if the Wallet page is working as intended', () => {
  const emailFieldID = 'email-field';
  const totalFieldID = 'total-field';
  const headerCurrencyFieldID = 'header-currency-field';
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
    const btn = screen.getByRole('button', { name: /entrar/i });

    userEvent.type(email, 'teste@teste.com');
    userEvent.type(password, '123456');
    await waitFor(() => { expect(btn).toBeEnabled(); });
    userEvent.click(btn);

    const { pathname } = history.location;
    expect(pathname).toBe('/carteira');

    // Rendering wallet page
    const emailField = screen.getByTestId(emailFieldID);
    const totalField = screen.getByTestId(totalFieldID);
    const headerCurrencyField = screen.getByTestId(headerCurrencyFieldID);
    const valueInput = screen.getByTestId(valueInputID);
    const descriptionInput = screen.getByTestId(descriptionInputID);
    const currencyInput = screen.getByTestId(currencyInputID);
    const methodInput = screen.getByTestId(methodInputID);
    const tagInput = screen.getByTestId(tagInputID);
    const addBtn = screen.getByRole('button', { name: /adicionar despesa/i });
    const table = screen.getByRole('table');

    expect(emailField).toHaveTextContent('teste@teste.com');
    expect(totalField).toHaveTextContent('0.00');
    expect(headerCurrencyField).toHaveTextContent('BRL');
    expect(valueInput).toHaveTextContent('');
    expect(descriptionInput).toHaveTextContent('');
    await waitFor(() => { expect(currencyInput.value).toEqual('USD'); });
    await waitFor(() => { expect(methodInput.value).toEqual('Dinheiro'); });
    await waitFor(() => { expect(tagInput.value).toEqual('Alimentação'); });
    expect(addBtn).toBeInTheDocument();
    expect(table).toBeInTheDocument();
  });

  it('should render a table row with the correct values after adding an expense', () => {
    renderWithRouterAndRedux(<Wallet />);

    const valueInput = screen.getByTestId(valueInputID);
    const descriptionInput = screen.getByTestId(descriptionInputID);
    const currencyInput = screen.getByTestId(currencyInputID);
    const methodInput = screen.getByTestId(methodInputID);
    const tagInput = screen.getByTestId(tagInputID);
    const addBtn = screen.getByRole('button', { name: /adicionar despesa/i });

    // userEvent.type(valueInput, '50');
    // userEvent.type(descriptionInput, '50');
    // userEvent.selectOptions()
    // userEvent.type(valueInput, '50');
    // userEvent.type(valueInput, '50');
  });
});

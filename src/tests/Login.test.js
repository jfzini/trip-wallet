import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import Login from '../pages/Login';
import App from '../App';

describe('Tests if the Login page is working as intended', () => {
  const emailTestID = 'email-input';
  const passwordTestID = 'password-input';
  const invalidEmail = 'teste@teste.c';
  const invalidPassword = '12345';
  const validEmail = 'teste@teste.com';
  const validPassword = '123456';

  it('should have inputs for email, password, and a disabled button', () => {
    renderWithRouterAndRedux(<Login />);

    const email = screen.getByTestId(emailTestID);
    const password = screen.getByTestId(passwordTestID);
    const btn = screen.getByRole('button', { name: /entrar/i });

    expect(email).toBeInTheDocument();
    expect(password).toBeInTheDocument();
    expect(btn).toBeInTheDocument();
    expect(btn).toBeDisabled();
  });

  it('should not enable button after inputting invalid values', async () => {
    renderWithRouterAndRedux(<Login />);

    const email = screen.getByTestId(emailTestID);
    const password = screen.getByTestId(passwordTestID);
    const btn = screen.getByRole('button', { name: /entrar/i });

    userEvent.type(email, invalidEmail);
    userEvent.type(password, validPassword);

    expect(email.value).toEqual(invalidEmail);
    expect(password.value).toEqual(validPassword);
    await waitFor(() => { expect(btn).toBeDisabled(); });

    userEvent.clear(email);
    userEvent.type(email, validEmail);
    userEvent.clear(password);
    userEvent.type(password, invalidPassword);

    expect(email.value).toEqual(validEmail);
    expect(password.value).toEqual(invalidPassword);
    await waitFor(() => { expect(btn).toBeDisabled(); });
  });

  it('should enable button after inputting valid values and go to correct page', async () => {
    const {history} = renderWithRouterAndRedux(<App />);

    const email = screen.getByTestId(emailTestID);
    const password = screen.getByTestId(passwordTestID);
    const btn = screen.getByRole('button', { name: /entrar/i });

    userEvent.type(email, validEmail);
    userEvent.type(password, validPassword);

    expect(email.value).toEqual(validEmail);
    expect(password.value).toEqual(validPassword);
    await waitFor(() => { expect(btn).toBeEnabled(); });

    userEvent.click(btn);
    const { pathname } = history.location;
    expect(pathname).toBe('/carteira');
  });
});

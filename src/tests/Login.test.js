import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import Login from '../pages/Login';

describe('Tests if the Login page is working as intended', () => {

  const emailTestId

  it('should have inputs for email, password, and a disabled button', () => {
    renderWithRouterAndRedux(<Login />);

    const email = screen.getByTestId('email-input');
    const password = screen.getByTestId('password-input');
    const btn = screen.getByRole('button', { name: /entrar/i });

    expect(email).toBeInTheDocument();
    expect(password).toBeInTheDocument();
    expect(btn).toBeInTheDocument();
    expect(btn).toBeDisabled();
  });

  it('should not enable button after inputting invalid values', async () => {
    renderWithRouterAndRedux(<Login />);

    const email = screen.getByTestId('email-input');
    const password = screen.getByTestId('password-input');
    const btn = screen.getByRole('button', { name: /entrar/i });

    userEvent.type(email, 'teste@teste.c');
    userEvent.type(password, '123456');

    expect(email.value).toEqual('teste@teste.c');
    expect(password.value).toEqual('123456');
    await waitFor(() => { expect(btn).toBeDisabled(); });

    userEvent.clear(email);
    userEvent.type(email, 'teste@teste.com');
    userEvent.clear(password);
    userEvent.type(password, '12345');

    expect(email.value).toEqual('teste@teste.com');
    expect(password.value).toEqual('12345');
    await waitFor(() => { expect(btn).toBeDisabled(); });
  });

  it('should enable button after inputting valid values', async () => {
    renderWithRouterAndRedux(<Login />);

    const email = screen.getByTestId('email-input');
    const password = screen.getByTestId('password-input');
    const btn = screen.getByRole('button', { name: /entrar/i });

    userEvent.type(email, 'teste@teste.com');
    userEvent.type(password, '123456');

    expect(email.value).toEqual('teste@teste.com');
    expect(password.value).toEqual('123456');
    await waitFor(() => { expect(btn).toBeEnabled(); });
  });
});

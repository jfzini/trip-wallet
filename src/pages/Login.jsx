import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { actionSubmitLogin } from '../redux/actions';
import './Login.css';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    invalid: true,
  };

  validateFields = () => {
    const { email, password } = this.state;
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    const validEmail = emailRegex.test(email);
    const PWMinLen = 6;
    const validPW = password.length >= PWMinLen;
    if (validEmail && validPW) {
      this.setState({ invalid: false });
    } else {
      this.setState({ invalid: true });
    }
  };

  handleChange = async ({ name, value }) => {
    await this.setState({ [name]: value });
    this.validateFields();
  };

  handleClick = () => {
    const { history, dispatch } = this.props;
    const { email } = this.state;
    dispatch(actionSubmitLogin(email));
    history.push('/carteira');
  };

  render() {
    const { email, password, invalid } = this.state;

    return (
      <main>
        <div className="title">
          <h1>Trip Wallet</h1>
        </div>
        <div className="login-content">
          <div className="blue-circle" />
          <div className="pink-circle" />
          <form action="" className="general-form">
            <div className="general-input">
              <label htmlFor="email-input">E-mail</label>
              <input
                type="email"
                name="email"
                id="email-input"
                value={ email }
                data-testid="email-input"
                placeholder="e-mail@email.com"
                onChange={ (e) => this.handleChange(e.target) }
              />
            </div>
            <div className="general-input">
              <label htmlFor="password-input">Senha</label>
              <input
                type="password"
                name="password"
                id="password-input"
                value={ password }
                data-testid="password-input"
                placeholder="senha"
                onChange={ (e) => this.handleChange(e.target) }
              />
              <span>min 6 caracteres</span>
            </div>
            <button
              type="button"
              disabled={ invalid }
              onClick={ () => this.handleClick() }
            >
              Entrar
            </button>
          </form>
          <aside className="general-info">
            <p>
              Projeto desenvolvido utilizando React, React-Router, Redux e actions
              assíncronas. Para os testes foi utilizada a React-Testing-Library, mocks
              de funções e de retornos de API.
            </p>
            <p>
              Mais detalhes podem ser conferidos no repositório do
              {' '}
              <a
                href="https://github.com/jfzini/trip-wallet"
                target="_blank"
                rel="noreferrer"
              >
                GitHub
              </a>
            </p>
          </aside>
        </div>
      </main>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default connect()(Login);

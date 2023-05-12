import PropTypes from 'prop-types';
import React from 'react';

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
      this.setState({
        invalid: false,
      });
    } else {
      this.setState({
        invalid: true,
      });
    }
  };

  handleChange = async ({ name, value }) => {
    await this.setState({
      [name]: value,
    });
    this.validateFields();
  };

  handleClick = () => {
    const { history } = this.props;
    history.push('/carteira');
  };

  render() {
    const { email, password, invalid } = this.state;

    return (
      <form action="">
        <input
          type="email"
          name="email"
          id="email-input"
          value={ email }
          data-testid="email-input"
          placeholder="e-mail"
          onChange={ (e) => this.handleChange(e.target) }
        />
        <input
          type="password"
          name="password"
          id="password-input"
          value={ password }
          data-testid="password-input"
          placeholder="senha"
          onChange={ (e) => this.handleChange(e.target) }
        />
        <button
          disabled={ invalid }
          onClick={ () => this.handleClick() }
        >
          Entrar
        </button>
      </form>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default Login;

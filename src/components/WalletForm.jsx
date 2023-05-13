import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actionCalcSubtotal, actionGetCurrencies, actionSaveExpense } from '../redux/actions';

class WalletForm extends Component {
  state = {
    value: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
    description: '',
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(actionGetCurrencies());
  }

  getExchangeRate = async () => {
    const fetchCurrencies = await fetch('https://economia.awesomeapi.com.br/json/all');
    const JSONCurrencies = await fetchCurrencies.json();
    return JSONCurrencies;
    // const allCurrenciesData = Object.values(JSONCurrencies);
    // const { currency } = this.state;
    // const currencyData = allCurrenciesData.find(({ code }) => code === currency);
    // return currencyData.ask;
  };

  handleClick = async () => {
    const { dispatch, expenses } = this.props;
    const exchangeRates = await this.getExchangeRate();
    dispatch(actionSaveExpense(this.state, expenses.length, exchangeRates));
    dispatch(actionCalcSubtotal(exchangeRates, this.state.currency, this.state.value));
    this.setState({
      value: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      description: '',
    });
  };

  handleChange = async ({ name, value }) => {
    await this.setState({
      [name]: value,
    });
  };

  render() {
    const { currencies } = this.props;
    const { value, currency, method, description, tag } = this.state;
    return (
      <form action="">
        <input
          name="value"
          data-testid="value-input"
          type="text"
          placeholder="valor"
          value={ value }
          onChange={ (e) => this.handleChange(e.target) }
        />
        <input
          name="description"
          data-testid="description-input"
          type="text"
          placeholder="descrição"
          value={ description }
          onChange={ (e) => this.handleChange(e.target) }
        />
        <select
          data-testid="currency-input"
          name="currency"
          id="currency"
          value={ currency }
          onChange={ (e) => this.handleChange(e.target) }
        >
          {currencies
            .map((cur) => <option key={ cur } value={ cur }>{cur}</option>)}
        </select>
        <select
          name="method"
          id="payment-method"
          data-testid="method-input"
          value={ method }
          onChange={ (e) => this.handleChange(e.target) }
        >
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
          <option value="Cartão de débito">Cartão de débito</option>
        </select>
        <select
          name="tag"
          id="tag"
          data-testid="tag-input"
          value={ tag }
          onChange={ (e) => this.handleChange(e.target) }
        >
          <option value="Alimentação">Alimentação</option>
          <option value="Lazer">Lazer</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Transporte">Transporte</option>
          <option value="Saúde">Saúde</option>
        </select>
        <button type="button" onClick={ this.handleClick }>Adicionar despesa</button>
      </form>
    );
  }
}

WalletForm.propTypes = {
  currencies: PropTypes.shape({
    map: PropTypes.func,
  }),
  dispatch: PropTypes.func,
}.isRequired;

const mapStateToProps = (globalState) => ({
  currencies: globalState.wallet.currencies,
  expenses: globalState.wallet.expenses,
});

export default connect(mapStateToProps)(WalletForm);

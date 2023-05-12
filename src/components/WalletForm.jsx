import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actionGetCurrencies } from '../redux/actions';

class WalletForm extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(actionGetCurrencies());
  }

  render() {
    const { currencies } = this.props;
    return (
      <form action="">
        <input data-testid="value-input" type="text" placeholder="valor" />
        <input data-testid="description-input" type="text" placeholder="descrição" />
        <select data-testid="currency-input" name="currency" id="currency">
          {currencies.map((cur) => 
            <option key={ cur } value="currencies">{cur}</option>
          )}
        </select>
        <select name="payment-method" id="payment-method" data-testid="method-input">
          <option value="payment-method">Dinheiro</option>
          <option value="payment-method">Cartão de crédito</option>
          <option value="payment-method">Cartão de débito</option>
        </select>
        <select name="tag" id="tag" data-testid="tag-input">
          <option value="tag">Alimentação</option>
          <option value="tag">Lazer</option>
          <option value="tag">Trabalho</option>
          <option value="tag">Transporte</option>
          <option value="tag">Saúde</option>
        </select>
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
});

export default connect(mapStateToProps)(WalletForm);

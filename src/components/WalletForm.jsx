import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  actionCalcSubtotal,
  actionEditExpense,
  actionGetCurrencies,
  actionSaveExpense,
  actionCancelEdit,
} from '../redux/actions';
import { getExchangeRate, getCurrencyData } from './helpers/getData';

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

  componentDidUpdate(prevProps) {
    const { editor, prevEditData } = this.props;
    if (editor && prevEditData !== prevProps.prevEditData) {
      this.setState(prevEditData);
    }
  }

  resetState = () => {
    this.setState({
      value: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      description: '',
    });
  };

  handleAdd = async () => {
    const { dispatch, expenses, subtotals } = this.props;
    const { currency, value } = this.state;
    const currencies = await getExchangeRate();
    const currencyData = getCurrencyData(currencies, currency);
    dispatch(actionSaveExpense(this.state, expenses.length, currencies));
    dispatch(actionCalcSubtotal(currencyData, value, expenses.length, subtotals));
    this.resetState();
  };

  handleEdit = () => {
    const { expenses, index, dispatch, subtotals } = this.props;
    const { value, currency, method, tag, description } = this.state;
    expenses[index] = { ...expenses[index], value, currency, method, tag, description };
    const currencies = expenses[index].exchangeRates;
    const currencyData = getCurrencyData(currencies, currency);
    dispatch(actionCalcSubtotal(currencyData, value, expenses[index].id, subtotals));
    dispatch(actionEditExpense(expenses));
    this.resetState();
  };

  cancelEdit = () => {
    const { dispatch } = this.props;
    dispatch(actionCancelEdit());
    this.resetState();
  };

  handleClick = () => {
    const { editor } = this.props;
    if (editor) {
      this.handleEdit();
    } else {
      this.handleAdd();
    }
  };

  handleChange = async ({ name, value }) => {
    await this.setState({ [name]: value });
  };

  render() {
    const { currencies, editor } = this.props;
    const { value, currency, method, description, tag } = this.state;
    return (
      <form action="" className={ `general-form wallet-form ${editor ? 'editor' : ''}` }>
        <div className="general-input">
          <label htmlFor="value-input">Valor:</label>
          <input
            name="value"
            data-testid="value-input"
            id="value-input"
            type="number"
            placeholder="valor"
            value={ value }
            onChange={ (e) => this.handleChange(e.target) }
          />
        </div>
        <div className="general-input">
          <label htmlFor="description-input">Descrição:</label>
          <input
            name="description"
            data-testid="description-input"
            id="description-input"
            type="text"
            placeholder="descrição"
            value={ description }
            onChange={ (e) => this.handleChange(e.target) }
          />
        </div>
        <div className="general-input">
          <label htmlFor="currency-select">Moeda original:</label>
          <select
            data-testid="currency-input"
            name="currency"
            id="currency-select"
            value={ currency }
            onChange={ (e) => this.handleChange(e.target) }
          >
            {currencies.map((cur) => (
              <option key={ cur } value={ cur }>
                {cur}
              </option>
            ))}
          </select>
        </div>
        <div className="general-input">
          <label htmlFor="payment-method">Método de pagamento:</label>
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
        </div>
        <div className="general-input">
          <label htmlFor="tag-input">Tipo de gasto:</label>
          <select
            name="tag"
            data-testid="tag-input"
            id="tag-input"
            value={ tag }
            onChange={ (e) => this.handleChange(e.target) }
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </div>
        <button type="button" onClick={ this.handleClick }>
          {editor ? 'Salvar' : 'Adicionar despesa'}
        </button>
        {editor
          ? <button onClick={ this.cancelEdit } className="cancel-btn">Cancelar</button>
          : ''}
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
  editor: globalState.wallet.editor,
  index: globalState.wallet.indexToEdit,
  subtotals: globalState.wallet.subtotals,
  prevEditData: globalState.wallet.prevEditData,
});

export default connect(mapStateToProps)(WalletForm);

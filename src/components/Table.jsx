import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  actionDeleteExpense,
  actionDeleteSubtotal,
  actionGetIndexToEdit,
} from '../redux/actions';

class Table extends Component {
  handleDelete = (id) => {
    const { expenses, subtotals, dispatch } = this.props;
    dispatch(actionDeleteExpense(id, expenses));
    dispatch(actionDeleteSubtotal(id, subtotals));
  };

  handleEdit = (id) => {
    const { expenses, dispatch } = this.props;
    const foundExpense = expenses.find((expense) => expense.id === id);
    const index = expenses.indexOf(foundExpense);
    dispatch(actionGetIndexToEdit(index));
  };

  render() {
    const { expenses } = this.props;
    const ths = ['Descrição', 'Tag', 'Método de pagamento', 'Valor', 'Moeda',
      'Câmbio utilizado', 'Valor convertido', 'Moeda de conversão', 'Editar/Excluir'];

    return (
      <table>
        <thead>
          <tr>
            {ths.map((th) => <th key={ th }>{th}</th>)}
          </tr>
        </thead>
        <tbody id="expenses-tbody">
          {expenses.map(({
            description,
            value,
            method,
            tag,
            currency,
            exchangeRates,
            id,
          }) => (
            <tr key={ id } id={ `expense-${id}` }>
              <td>{description}</td>
              <td>{tag}</td>
              <td>{method}</td>
              <td>{Number(value).toFixed(2)}</td>
              <td>{exchangeRates[currency].name}</td>
              <td>{(exchangeRates[currency].ask * 1).toFixed(2)}</td>
              <td>{(exchangeRates[currency].ask * value).toFixed(2)}</td>
              <td>Real</td>
              <td>
                <button
                  type="button"
                  onClick={ () => this.handleDelete(id) }
                  data-testid="delete-btn"
                >
                  Excluir
                </button>
                <button
                  type="button"
                  onClick={ () => this.handleEdit(id) }
                  data-testid="edit-btn"
                >
                  Editar despesa
                </button>
              </td>
            </tr>))}
        </tbody>
      </table>
    );
  }
}

Table.propTypes = {
  expenses: PropTypes.shape({
    map: PropTypes.func,
  }),
}.isRequired;

const mapStateToProps = (globalState) => ({
  expenses: globalState.wallet.expenses,
  subtotals: globalState.wallet.subtotals,
  editor: globalState.wallet.editor,
});

export default connect(mapStateToProps)(Table);

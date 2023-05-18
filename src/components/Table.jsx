import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  actionDeleteExpense,
  actionDeleteSubtotal,
  actionGetIndexToEdit,
  actionPreloadEditData,
} from '../redux/actions';
import deleteIcon from '../imgs/delete_FILL0_wght400_GRAD0_opsz48.svg';
import editIcon from '../imgs/edit_note_FILL0_wght400_GRAD0_opsz48.svg';

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
    dispatch(actionPreloadEditData(foundExpense));
    dispatch(actionGetIndexToEdit(index));
  };

  render() {
    const { expenses, indexToEdit, editor } = this.props;
    const ths = ['Descrição', 'Tag', 'Método de pagamento', 'Valor', 'Moeda',
      'Câmbio utilizado', 'Valor convertido', 'Moeda de conversão', 'Editar/Excluir'];

    return (
      <table>
        <thead>
          <tr style={{backgroundImage:'none'}}>
            {ths.map((th) => <th key={ th }>{th}</th>)}
          </tr>
        </thead>
        <hr />
        <tbody id="expenses-tbody">
          {expenses.map(({
            description,
            value,
            method,
            tag,
            currency,
            exchangeRates,
            id,
          }, index) => (
            <tr key={ index } id={ `expense-${id}` } className={index === indexToEdit ? 'editing-tr' : ''}>
              <td>{description}</td>
              <td>{tag}</td>
              <td>{method}</td>
              <td>{Number(value).toFixed(2)}</td>
              <td>{exchangeRates[currency].name}</td>
              <td>{(exchangeRates[currency].ask * 1).toFixed(2)}</td>
              <td>{(exchangeRates[currency].ask * value).toFixed(2)}</td>
              <td>Real</td>
              <td>
                {!editor ? (
                  <button
                    type="button"
                    onClick={ () => this.handleDelete(id) }
                    data-testid="delete-btn"
                  >
                    {<img src={deleteIcon} alt="delete-expense" className='delete-btn'/>}
                  </button>
                ) : (
                  ''
                )}
                <button
                  type="button"
                  onClick={ () => this.handleEdit(id) }
                  data-testid="edit-btn"
                >
                  {<img src={editIcon} alt="edit-expense" className='edit-btn'/>}
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
  indexToEdit: globalState.wallet.indexToEdit,
});

export default connect(mapStateToProps)(Table);

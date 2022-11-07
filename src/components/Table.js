import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { removeExpense, toEditExpense } from '../redux/actions';

class Table extends Component {
  toggleEdit = (target) => {
    const selectEdit = 'select-edit';
    const prevSelect = document.getElementsByClassName(selectEdit);
    if (prevSelect[0] !== undefined) {
      prevSelect[0].classList.remove(selectEdit);
    }
    const element = target.parentNode.parentNode;
    element.classList.add(selectEdit);
    document
      .querySelector('#wallet-form')
      .scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  removeExpenses = (idToRemove) => {
    const { propsRemoveExpense, expenses } = this.props;
    const expensesAfterRemove = expenses.filter((e) => e.id !== idToRemove);
    propsRemoveExpense(expensesAfterRemove);
  };

  toEditExpenses = (idToEdit, { target }) => {
    const { propsToEditExpense } = this.props;
    propsToEditExpense(idToEdit);
    this.toggleEdit(target);
  };

  createTable = (expenses) => {
    if (expenses.length === 0) {
      return null;
    }
    return expenses.map((e) => (
      <tr key={ e.id }>
        <td>{e.description}</td>
        <td>{e.tag}</td>
        <td>{e.method}</td>
        <td>{Number(e.value).toFixed(2)}</td>
        <td>{e.exchangeRates[e.currency].name}</td>
        <td>{Number(e.exchangeRates[e.currency].ask).toFixed(2)}</td>
        <td>
          {(e.value * Number(e.exchangeRates[e.currency].ask)).toFixed(2)}
        </td>
        <td>Real</td>
        <td>
          <button
            className="edit"
            type="button"
            data-testid="edit-btn"
            onClick={ (target) => this.toEditExpenses(e.id, target) }
          >
            Editar
          </button>
          <button
            className="delete"
            type="button"
            data-testid="delete-btn"
            onClick={ () => this.removeExpenses(e.id) }
          >
            X
          </button>
        </td>
      </tr>
    ));
  };

  render() {
    const { expenses } = this.props;
    return (
      <div className="table-container">
        <table>
          <caption>
            <h1>Despesas</h1>
          </caption>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>{this.createTable(expenses)}</tbody>
        </table>
      </div>
    );
  }
}

Table.propTypes = {
  expenses: PropTypes.shape([]),
}.isRequired;

function mapStateToProps(state) {
  return {
    ...state.wallet,
  };
}

const mapDispatchToProps = (dispatch) => ({
  propsRemoveExpense: (payload) => dispatch(removeExpense(payload)),
  propsToEditExpense: (payload) => dispatch(toEditExpense(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { removeExpense } from '../redux/actions';

class Table extends Component {
  teste = (idToRemove) => {
    const { propsRemoveExpense, expenses } = this.props;
    const expensesAfterRemove = expenses.filter((e) => e.id !== idToRemove);
    propsRemoveExpense(expensesAfterRemove);
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
            type="button"
            data-testid="delete-btn"
            onClick={ () => this.teste(e.id) }
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
      <table>
        <caption>Despesas</caption>
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
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);

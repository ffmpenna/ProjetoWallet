import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  editExpense,
  fetchCurrencies,
  fetchExchangeRates,
} from '../redux/actions';

class WalletForm extends Component {
  state = {
    expenseValue: '',
    expenseDescription: '',
    expenseCurrency: 'USD',
    expenseMethod: 'Dinheiro',
    expenseTag: 'Alimentação',
  };

  componentDidMount() {
    const { propsFetchCurrencies } = this.props;
    propsFetchCurrencies();
  }

  handleEdit = (obj) => {
    const { propsEditExpense } = this.props;
    const {
      expenseValue,
      expenseDescription,
      expenseCurrency,
      expenseMethod,
      expenseTag,
    } = obj;
    const expense = {
      value: expenseValue,
      description: expenseDescription,
      currency: expenseCurrency,
      method: expenseMethod,
      tag: expenseTag,
    };
    propsEditExpense(expense);
  };

  handleChange = ({ target }) => {
    const { value, name } = target;
    this.setState({ [name]: value });
  };

  handleClick = async (obj) => {
    const { propsFetchExchangeRates, expenses } = this.props;
    const data = [obj, expenses];
    await propsFetchExchangeRates(data);
    this.setState({
      expenseValue: '',
      expenseDescription: '',
    });
  };

  render() {
    const {
      expenseCurrency,
      expenseDescription,
      expenseMethod,
      expenseTag,
      expenseValue,
    } = this.state;
    const { currencies, editor, idToEdit } = this.props;
    console.log(editor, idToEdit);
    return (
      <div className="wallet-form-container">
        <form className="form wallet-form">
          <label htmlFor="expenseValue">
            <p>Valor</p>
            <input
              className="text-input input"
              name="expenseValue"
              data-testid="value-input"
              type="number"
              value={ expenseValue }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="expenseDescription">
            <p>Descrição</p>
            <input
              className="text-input input"
              name="expenseDescription"
              data-testid="description-input"
              type="text"
              value={ expenseDescription }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="expenseCurrency">
            <p>Moeda</p>
            <select
              className="text-input input"
              name="expenseCurrency"
              defaultValue={ expenseCurrency }
              data-testid="currency-input"
              onChange={ this.handleChange }
            >
              {currencies.map((currencie) => (
                <option key={ currencie } value={ currencie }>
                  {currencie}
                </option>
              ))}
            </select>
          </label>
          <label htmlFor="expenseMethod">
            <p>Pagamento</p>
            <select
              className="text-input input"
              name="expenseMethod"
              defaultValue={ expenseMethod }
              data-testid="method-input"
              onChange={ this.handleChange }
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="expenseTag">
            <p>Categoria</p>
            <select
              className="text-input input"
              defaultValue={ expenseTag }
              name="expenseTag"
              data-testid="tag-input"
              onChange={ this.handleChange }
            >
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>
        </form>
        {!editor ? (
          <button
            className="btn"
            type="button"
            onClick={ () => this.handleClick(this.state) }
          >
            Adicionar despesa
          </button>
        ) : (
          <button
            className="btn"
            type="button"
            onClick={ () => this.handleEdit(this.state) }
          >
            Editar despesa
          </button>
        )}
      </div>
    );
  }
}

WalletForm.propTypes = {
  fetchCurrencies: PropTypes.func,
  currencies: PropTypes.shape([]),
}.isRequired;

const mapStateToProps = (state) => {
  const { currencies, expenses, editor, idToEdit } = state.wallet;
  return { currencies, expenses, editor, idToEdit };
};

const mapDispatchToProps = (dispatch) => ({
  propsFetchCurrencies: (payload) => dispatch(fetchCurrencies(payload)),
  propsFetchExchangeRates: (payload) => dispatch(fetchExchangeRates(payload)),
  propsEditExpense: (payload) => dispatch(editExpense(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);

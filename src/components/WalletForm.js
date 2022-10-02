import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCurrencies } from '../redux/actions';

class WalletForm extends Component {
  state = {
    expenseValue: '',
    expenseDescription: '',
    expenseCurrency: 'USD',
    expenseMethod: 'cash',
    expenseTag: 'food',
    expenses: [],
  };

  componentDidMount() {
    const { propsFetchCurrencies } = this.props;
    propsFetchCurrencies();
  }

  handleChange = ({ target }) => {
    const { value, name } = target;
    this.setState({ [name]: value });
  };

  fetchExchangeRates = async (state) => {
    const END_POINT = 'https://economia.awesomeapi.com.br/json/all';
    const response = await fetch(END_POINT);
    const responseJson = await response.json();
    delete responseJson.USDT;
    const {
      expenses,
      expenseValue,
      expenseDescription,
      expenseCurrency,
      expenseMethod,
      expenseTag,
    } = state;
    if (expenses.length !== 0) {
      const lastId = expenses[expenses.length - 1].id;
      this.setState({
        expenses: [
          ...expenses,
          {
            id: lastId + 1,
            value: expenseValue,
            description: expenseDescription,
            currency: expenseCurrency,
            method: expenseMethod,
            tag: expenseTag,
            exchangeRates: responseJson,
          },
        ],
      });
    } else {
      const lastId = 0;
      this.setState({
        expenses: [
          ...expenses,
          {
            id: lastId + 1,
            value: expenseValue,
            description: expenseDescription,
            currency: expenseCurrency,
            method: expenseMethod,
            tag: expenseTag,
            exchangeRates: responseJson,
          },
        ],
      });
    }
  };

  handleClick = async (state) => {
    this.fetchExchangeRates(state);
  };

  render() {
    const {
      expenseCurrency,
      expenseDescription,
      expenseMethod,
      expenseTag,
      expenseValue,
    } = this.state;
    const { currencies } = this.props;
    return (
      <form>
        <label htmlFor="expenseValue">
          Valor
          <input
            name="expenseValue"
            data-testid="value-input"
            type="number"
            value={ expenseValue }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="expenseDescription">
          Descrição
          <input
            name="expenseDescription"
            data-testid="description-input"
            type="text"
            value={ expenseDescription }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="expenseCurrency">
          Moeda
          <select
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
          Pagamento
          <select
            defaultValue={ expenseMethod }
            name="expenseMethod"
            data-testid="method-input"
            onChange={ this.handleChange }
          >
            <option value="cash">Dinheiro</option>
            <option value="credit">Cartão de crédito</option>
            <option value="debit">Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="expenseTag">
          Categoria
          <select
            defaultValue={ expenseTag }
            name="expenseTag"
            data-testid="tag-input"
            onChange={ this.handleChange }
          >
            <option value="food">Alimentação</option>
            <option value="leisure">Lazer</option>
            <option value="work">Trabalho</option>
            <option value="transport">Transporte</option>
            <option value="health">Saúde</option>
          </select>
        </label>
        <button type="button" onClick={ () => this.handleClick(this.state) }>
          Adicionar despesa
        </button>
      </form>
    );
  }
}

WalletForm.propTypes = {
  fetchCurrencies: PropTypes.func,
  currencies: PropTypes.shape([]),
}.isRequired;

const mapStateToProps = (state) => {
  const { currencies } = state.wallet;
  return { currencies };
};

const mapDispatchToProps = (dispatch) => ({
  propsFetchCurrencies: (payload) => dispatch(fetchCurrencies(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);

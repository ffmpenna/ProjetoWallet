import React, { Component } from 'react';
import { connect } from 'react-redux';
import { failedRequest, getCurrencies } from '../redux/actions';

class WalletForm extends Component {
  state = {
    expenseValue: 0,
    expenseDescription: '',
    expenseCurrency: 'USD',
    expenseMethod: 'cash',
    expenseTag: 'food',
  };

  async componentDidMount() {
    await this.fetchCurrencies();
  }

  fetchCurrencies = async () => {
    try {
      const { getCurrenciesDispatch } = this.props;
      const END_POINT = 'https://economia.awesomeapi.com.br/json/all';
      const response = await fetch(END_POINT);
      const responseJson = await response.json();
      const currencies = Object.keys(responseJson).filter(
        (currencie) => currencie !== 'USDT',
      );
      getCurrenciesDispatch(currencies);
    } catch (error) {
      failedRequestDispatch(error);
    }
  };

  handleChange = ({ target }) => {
    const { value, name } = target;
    this.setState({ [name]: value });
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
          Moeda
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
          Moeda
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
      </form>
    );
  }
}

const mapStateToProps = (state) => {
  const { currencies } = state.wallet;
  return { currencies };
};

const mapDispatchToProps = (dispatch) => ({
  getCurrenciesDispatch: (payload) => dispatch(getCurrencies(payload)),
  failedRequestDispatch: (payload) => dispatch(failedRequest(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);

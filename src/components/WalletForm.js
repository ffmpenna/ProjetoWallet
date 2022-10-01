import React, { Component } from 'react';
import { connect } from 'react-redux';
import { failedRequest, getCurrencies } from '../redux/actions';

class WalletForm extends Component {
  state = {
    expenseValue: '',
    expenseDescription: '',
    expenseCurrency: '',
    expenseMethod: '',
    expenseTag: '',
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
    const { currencies } = this.props;
    return (
      <form>
        <label htmlFor="expenseValue">
          Valor
          <input
            name="expenseValue"
            data-handleChangeid="value-input"
            type="number"
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="expenseDescription">
          Descrição
          <input
            name="expenseDescription"
            data-handleChangeid="description-input"
            type="text"
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="expenseCurrency">
          Moeda
          <select
            name="expenseCurrency"
            defaultValue=""
            data-handleChangeid="currency-input"
            onChange={ this.handleChange }
          >
            <option disabled hidden value="">
              Selecione uma moeda
            </option>
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
            defaultValue=""
            name="expenseMethod"
            data-handleChangeid="method-input"
            onChange={ this.handleChange }
          >
            <option value="" disabled hidden>
              Selecione um pagamento
            </option>
            <option value="money">Dinheiro</option>
            <option value="credit">Cartão de crédito</option>
            <option value="debit">Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="expenseTag">
          Moeda
          <select
            defaultValue=""
            name="expenseTag"
            data-handleChangeid="tag-input"
            onChange={ this.handleChange }
          >
            <option value="" disabled hidden>
              Selecione uma categoria
            </option>
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

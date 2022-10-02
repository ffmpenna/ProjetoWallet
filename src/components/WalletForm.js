import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCurrencies, fetchExchangeRates } from '../redux/actions';

class WalletForm extends Component {
  state = {
    expenseValue: '',
    expenseDescription: '',
    expenseCurrency: 'USD',
    expenseMethod: 'cash',
    expenseTag: 'food',
  };

  componentDidMount() {
    const { propsFetchCurrencies } = this.props;
    propsFetchCurrencies();
  }

  handleChange = ({ target }) => {
    const { value, name } = target;
    this.setState({ [name]: value });
  };

  handleClick = async (obj) => {
    const { propsFetchExchangeRates, expenses } = this.props;
    const teste = [obj, expenses];
    await propsFetchExchangeRates(teste);
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
    const { currencies, expenses } = this.props;
    // console.log(expenses);
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
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
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
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>
        <button
          type="button"
          onClick={ () => this.handleClick(this.state, expenses) }
        >
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
  const { currencies, expenses } = state.wallet;
  return { currencies, expenses };
};

const mapDispatchToProps = (dispatch) => ({
  propsFetchCurrencies: (payload) => dispatch(fetchCurrencies(payload)),
  propsFetchExchangeRates: (payload) => dispatch(fetchExchangeRates(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  expensesSum = () => {
    const { expenses } = this.props;
    return expenses
      .map(
        (expense) => Number(expense.value) * expense.exchangeRates[expense.currency].ask,
      )
      .reduce((acc, curr) => acc + curr, 0)
      .toFixed(2);
  };

  render() {
    const { email } = this.props;
    return (
      <header className="header">
        <div className="total-container">
          <p>Total:</p>
          <div>
            <p data-testid="total-field">{this.expensesSum()}</p>
            <p data-testid="header-currency-field">BRL</p>
          </div>
        </div>
        <h1>TRYBEWALLET</h1>
        <div>
          <p data-testid="email-field">{email}</p>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string,
}.isRequired;

function mapStateToProps(state) {
  return {
    ...state.user,
    ...state.wallet,
  };
}
export default connect(mapStateToProps)(Header);

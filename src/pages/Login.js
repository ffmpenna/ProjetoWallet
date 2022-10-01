import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { actUser } from '../redux/actions';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    isBtnDisabled: true,
  };

  inputValidation = (email, password) => {
    const passwordMinSize = 6;
    const emailRegex = /\S+@\S+\.\S+/;
    return !(password.length >= passwordMinSize && emailRegex.test(email));
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState(
      {
        [name]: value,
      },
      () => {
        const { email, password } = this.state;
        console.log(email);
        this.setState({ isBtnDisabled: this.inputValidation(email, password) });
      },
    );
  };

  handleSubmit = () => {
    const { history, dispatch } = this.props;
    history.push('/carteira');
    dispatch(actUser({ ...this.state }));
  };

  render() {
    const { isBtnDisabled } = this.state;
    return (
      <form>
        <label
          htmlFor="email-input"
          style={ {
            display: 'flex',
            flexDirection: 'column',
            width: '30vw',
            textTransform: 'uppercase',
          } }
        >
          E-mail
          <input
            id="email-input"
            name="email"
            type="e-mail"
            onChange={ this.handleChange }
            data-testid="email-input"
          />
        </label>
        <label
          htmlFor="password-input"
          style={ {
            display: 'flex',
            flexDirection: 'column',
            width: '30vw',
            textTransform: 'uppercase',
          } }
        >
          Senha
          <input
            id="password-input"
            name="password"
            type="password"
            onChange={ this.handleChange }
            data-testid="password-input"
          />
        </label>
        <button
          type="button"
          disabled={ isBtnDisabled }
          onClick={ this.handleSubmit }
        >
          Entar
        </button>
      </form>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({}),
  push: PropTypes.func,
}.isRequired;

export default connect()(Login);

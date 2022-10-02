import { FAILED_REQUEST, GET_CURRENCIES, LOGIN_ACTION } from './actionTypes';

// Coloque aqui suas actions
const actLogin = (payload) => ({ type: LOGIN_ACTION, payload });

const getCurrencies = (payload) => ({ type: GET_CURRENCIES, payload });
const failedRequest = (payload) => ({ type: FAILED_REQUEST, payload });

function fetchCurrencies() {
  return async (dispatch) => {
    try {
      const END_POINT = 'https://economia.awesomeapi.com.br/json/all';
      const response = await fetch(END_POINT);
      const responseJson = await response.json();
      const currencies = Object.keys(responseJson).filter(
        (currencie) => currencie !== 'USDT',
      );
      dispatch(getCurrencies(currencies));
    } catch (error) {
      dispatch(failedRequest(error));
    }
  };
}

const getExchangeRates = (payload) => ({ type: 'GET_EXCHANGE', payload });

export { actLogin, fetchCurrencies, getExchangeRates };

import {
  FAILED_REQUEST,
  GET_CURRENCIES,
  LOGIN_ACTION,
} from './actionTypes';

// Coloque aqui suas actions
const actLogin = (payload) => ({ type: LOGIN_ACTION, payload });

const getCurrencies = (payload) => ({ type: GET_CURRENCIES, payload });
const failedRequest = (payload) => ({ type: FAILED_REQUEST, payload });

export { actLogin, getCurrencies, failedRequest };

import { GET_CURRENCIES, FAILED_REQUEST } from '../actions/actionTypes';

// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
  error: '',
};

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case GET_CURRENCIES:
    return { ...state, currencies: action.payload };
  case 'GET_EXCHANGE':
    return { ...state, expenses: action.payload };
  case FAILED_REQUEST:
    return { ...state, error: action.payload };
  default:
    return state;
  }
}

export default wallet;

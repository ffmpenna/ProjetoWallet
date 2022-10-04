import {
  GET_CURRENCIES,
  FAILED_REQUEST,
  GET_EXCHANGE,
  REMOVE_EXPENSE,
} from '../actions/actionTypes';

// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: '',
  error: '',
};

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case GET_CURRENCIES:
    return { ...state, currencies: action.payload };
  case GET_EXCHANGE:
    return { ...state, expenses: action.payload };
  case REMOVE_EXPENSE:
    return { ...state, expenses: action.payload };
  case 'TO_EDIT_EXPENSE':
    return { ...state, editor: true, idToEdit: action.payload };
  case 'EDIT_EXPENSE':
    return {
      ...state,
      editor: false,
      expenses: state.expenses.map((expense) => {
        if (expense.id === state.idToEdit) {
          return {
            id: expense.id,
            ...action.payload,
            exchangeRates: expense.exchangeRates,
          };
        }
        return expense;
      }),
    };
  case FAILED_REQUEST:
    return { ...state, error: action.payload };
  default:
    return state;
  }
}

export default wallet;

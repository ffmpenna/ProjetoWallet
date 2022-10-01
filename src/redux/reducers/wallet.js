import actionTypes from '../actions/actionTypes';

// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  wallet: {
    currencies: [],
    expenses: [],
    editor: false,
    idToEdit: 0,
  },
};

export default function userReducer(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
  case actionTypes.wallet:
    return { ...state, wallet: { ...payload } };
  default:
    return { ...state };
  }
}

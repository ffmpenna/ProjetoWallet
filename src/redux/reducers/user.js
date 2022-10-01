import actionTypes from '../actions/actionTypes';

// Esse reducer será responsável por tratar as informações da pessoa usuária
const INITIAL_STATE = {
  user: {
    email: '',
  },
};

export default function userReducer(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
  case actionTypes.user:
    return { ...state, user: { ...payload } };
  default:
    return { ...state };
  }
}

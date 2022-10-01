// Esse reducer será responsável por tratar as informações da pessoa usuária
import LOGIN_ACTION from '../actions/actionTypes';

const INITIAL_STATE = {
  email: '',
};

function user(state = INITIAL_STATE, action) {
  switch (action.type) {
  case LOGIN_ACTION:
    return { email: action.payload };
  default:
    return state;
  }
}

export default user;

import actionType from './actionTypes';

// Coloque aqui suas actions
const actUser = (payload) => {
  const action = { type: actionType.user, payload };
  return action;
};

const actWallet = (payload) => {
  const action = { type: actionType.wallet, payload };
  return action;
};

export { actUser, actWallet };

import { createAction, handleActions } from 'redux-actions';

export const IS_LOGGED_IN = 'IS_LOGGED_IN';

export const setLoggedIn = createAction(IS_LOGGED_IN, (value = false) => value);


export const actions = {
  setLoggedIn
};

export default handleActions({
  IS_LOGGED_IN: (state, { payload }) => state + payload
}, 1);

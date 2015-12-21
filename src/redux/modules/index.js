import { combineReducers } from 'redux';
import { routeReducer } from 'redux-simple-router';
import counter from './counter';
import isLoggedIn from './loginInfo';

export default combineReducers({
  isLoggedIn,
  router: routeReducer
});

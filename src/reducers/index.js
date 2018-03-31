import user from './user';
import alert from './alert';
import { combineReducers } from 'redux';

const reducers = combineReducers({
  user,
  alert
});

export default reducers;

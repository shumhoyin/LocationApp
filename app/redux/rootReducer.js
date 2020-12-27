import userReducer from './reducer/userReducer';
import {combineReducers} from 'redux';

const rootReducer = combineReducers({
  user: userReducer,
});

export default rootReducer;

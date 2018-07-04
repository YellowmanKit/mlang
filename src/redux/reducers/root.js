import mainReducer from './main';
import userReducer from './user';
import uiReducer from './ui';
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  main: mainReducer,
  user: userReducer,
  ui: uiReducer
});

export default rootReducer;

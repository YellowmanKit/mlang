import mainReducer from './main';
import userReducer from './user';
import contentReducer from './content';
import uiReducer from './ui';
import modalReducer from './modal';
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  main: mainReducer,
  user: userReducer,
  content: contentReducer,
  ui: uiReducer,
  modal: modalReducer
});

export default rootReducer;

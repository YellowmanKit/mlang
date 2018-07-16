import { combineReducers } from "redux";
import mainReducer from './main';
import userReducer from './user';
import contentReducer from './content';
import uiReducer from './ui';
import modalReducer from './modal';
import profileReducer from './profile';
import coursesReducer from './courses';

const rootReducer = combineReducers({
  main: mainReducer,
  user: userReducer,
  content: contentReducer,
  ui: uiReducer,
  modal: modalReducer,
  profile: profileReducer,
  courses: coursesReducer
});

export default rootReducer;

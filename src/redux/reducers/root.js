import { combineReducers } from "redux";
import mainReducer from './control/main';
import contentReducer from './control/content';
import uiReducer from './control/ui';
import modalReducer from './control/modal';

import userReducer from './data/user';
import profileReducer from './data/profile';
import coursesReducer from './data/courses';
import studentsReducer from './data/students';

const rootReducer = combineReducers({
  main: mainReducer,
  user: userReducer,
  content: contentReducer,
  ui: uiReducer,
  modal: modalReducer,
  profile: profileReducer,
  courses: coursesReducer,
  students: studentsReducer
});

export default rootReducer;

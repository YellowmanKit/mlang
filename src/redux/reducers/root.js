import { combineReducers } from "redux";
import main from './control/main';
import content from './control/content';
import ui from './control/ui';
import modal from './control/modal';

import user from './data/user';
import profile from './data/profile';
import courses from './data/courses';
import students from './data/students';
import projects from './data/projects';

import cards from './data/cards';
import langs from './data/langs';

const rootReducer = combineReducers({
  main: main,
  user: user,
  content: content,
  ui: ui,
  modal: modal,
  profile: profile,
  courses: courses,
  students: students,
  projects: projects,

  cards: cards,
  langs: langs
});

export default rootReducer;

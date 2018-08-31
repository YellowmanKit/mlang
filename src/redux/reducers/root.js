import { combineReducers } from "redux";
import main from './control/main';
import content from './control/content';
import ui from './control/ui';
import modal from './control/modal';

import user from './data/user';
import profile from './data/profile';
import courses from './data/courses';
import subjects from './data/subjects';
import profiles from './data/profiles';
import projects from './data/projects';
import studentProjects from './data/studentProjects';

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
  subjects: subjects,
  profiles: profiles,
  projects: projects,
  studentProjects: studentProjects,

  cards: cards,
  langs: langs
});

export default rootReducer;

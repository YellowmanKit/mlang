import React, { Component } from 'react';
import { bindActionCreators} from 'redux';
import { connect } from "react-redux";

import * as main from './redux/actions/control/main';
import * as ui from './redux/actions/control/ui';
import * as content from './redux/actions/control/content';
import * as modal from './redux/actions/control/modal';

import * as user from './redux/actions/data/user';
import * as profile from './redux/actions/data/profile';
import * as courses from './redux/actions/data/courses';
import * as students from './redux/actions/data/students';
import * as projects from './redux/actions/data/projects';

import * as cards from './redux/actions/data/cards';
import * as langs from './redux/actions/data/langs';

import Main from './components/main/Main';

class App extends Component {

  langNameToLangKey(langName){
    const langKeys = this.props.store.langs.langKeys;
    for(var i=0;i<langKeys.length;i++){
      if(langName === langKeys[i].name[0] || langName === langKeys[i].name[1]){
        return langKeys[i].key;
      }
    }
    return '';
  }

  langKeyToLangName(langKey){
    const langKeys = this.props.store.langs.langKeys;
    for(var i=0;i<langKeys.length;i++){
      if(langKey === langKeys[i].key){
        return this.multiLang(langKeys[i].name[0], langKeys[i].name[1]);
      }
    }
    return '';
  }

  getProjectById(projectId){
    const projectsData = this.props.store.projects.projects;
    for(var i=0;i<projectsData.length;i++){
      if(projectsData[i]._id === projectId){
        return projectsData[i];
      }
    }
    return null;
  }

  getStudentProfileByUserId(userId){
    const studentsData = this.props.store.students;
    for(var i=0;i<studentsData.length;i++){
      if(studentsData[i].belongTo === userId){
        return studentsData[i];
      }
    }
    return null;
  }

  url(filename, type){
    return process.env.REACT_APP_API + '/download/'+ type + '/' + filename;
  }

  addZeroIfSingle(num){
    if(num < 10){
      return '0' + String(num);
    }else{
      return '' + String(num);
    }
  }

  getDateString(date) {
    let year = date.getFullYear();
    let monthIndex = date.getMonth() + 1;
    let day = date.getDate();

    let dateStr = year + '-' + this.addZeroIfSingle(monthIndex) + '-' + this.addZeroIfSingle(day);
    //return '2018-02-08';
    return dateStr;
  }

  multiLang(eng,chi){
    switch (this.props.store.main.language) {
      case 'english':
        return eng;
      case 'chinese':
        return chi;
      default:
        return eng;
    }
  }

  render() {
    const _app = {
      store: this.props.store,
      actions: this.props.actions,
      functions: {
        url: this.url.bind(this),
        multiLang: this.multiLang.bind(this),
        getDateString: this.getDateString.bind(this),
        getStudentProfileByUserId: this.getStudentProfileByUserId.bind(this),
        getProjectById: this.getProjectById.bind(this),
        langKeyToLangName: this.langKeyToLangName.bind(this),
        langNameToLangKey: this.langNameToLangKey.bind(this)
      }
    }
    return (
      <Main app={_app}/>
    );
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions.bind(this));
  }

  updateWindowDimensions() {
    this.props.actions.ui.setDimension({width: window.innerWidth,height: window.innerHeight});
  }

}

function mapStateToProps(state, props) {
  return { store: state }
}

function mapDispatchToProps(dispatch){
  return {
    actions: {
      main: Action(main, dispatch),
      user: Action(user, dispatch),
      ui: Action(ui, dispatch),
      content: Action(content, dispatch),
      modal: Action(modal, dispatch),

      profile: Action(profile, dispatch),
      courses: Action(courses, dispatch),
      students: Action(students, dispatch),
      projects: Action(projects, dispatch),

      cards: Action(cards, dispatch),
      langs: Action(langs, dispatch),
    }
  }
}

function Action(action, dispatch){
  return bindActionCreators(action, dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(App);

import React, { Component } from 'react';
import { bindActionCreators} from 'redux';
import { connect } from "react-redux";
import * as mainActions from './redux/actions/control/main';
import * as uiActions from './redux/actions/control/ui';
import * as contentActions from './redux/actions/control/content';
import * as modalActions from './redux/actions/control/modal';

import * as userActions from './redux/actions/data/user';
import * as profileActions from './redux/actions/data/profile';
import * as coursesActions from './redux/actions/data/courses';
import * as studentsActions from './redux/actions/data/students';
import * as projectsActions from './redux/actions/data/projects';

import * as cardsActions from './redux/actions/data/cards';
import * as langsActions from './redux/actions/data/langs';

import Main from './components/main/Main';

class App extends Component {

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
        langKeyToLangName: this.langKeyToLangName.bind(this)
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
      main: bindActionCreators(mainActions, dispatch),
      user: bindActionCreators(userActions, dispatch),
      ui: bindActionCreators(uiActions, dispatch),
      content: bindActionCreators(contentActions, dispatch),
      modal: bindActionCreators(modalActions, dispatch),

      profile: bindActionCreators(profileActions, dispatch),
      courses: bindActionCreators(coursesActions, dispatch),
      students: bindActionCreators(studentsActions, dispatch),
      projects: bindActionCreators(projectsActions, dispatch),

      cards: bindActionCreators(cardsActions, dispatch),
      langs: bindActionCreators(langsActions, dispatch),
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);

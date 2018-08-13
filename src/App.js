import React, { Component } from 'react';
import { bindActionCreators} from 'redux';
import { connect } from "react-redux";
import axios from 'axios';

import * as main from './redux/actions/control/main';
import * as ui from './redux/actions/control/ui';
import * as content from './redux/actions/control/content';
import * as modal from './redux/actions/control/modal';

import * as user from './redux/actions/data/user';
import * as profile from './redux/actions/data/profile';
import * as courses from './redux/actions/data/courses';
import * as students from './redux/actions/data/students';
import * as projects from './redux/actions/data/projects';
import * as studentProjects from './redux/actions/data/studentProjects';

import * as cards from './redux/actions/data/cards';
import * as langs from './redux/actions/data/langs';

import Main from './components/main/Main';

class App extends Component {

  getAllFeaturedCardsIdInViewingProject(){
    var featuredCardsId = [];
    const project = this.props.store.projects.viewingProject;
    const studentProjects = project.studentProjects;
    for(var i=0;i<studentProjects.length;i++){
      const studentProject = this.getStudentProjectById(studentProjects[i]);
      if(!studentProject){ return null; }
      const cardsId = studentProject.cards;
      for(var j=0;j<cardsId.length;j++){
        const card = this.getCardById(cardsId[j]);
        if(!card){ return null;}
        if(card.grade === 'featured'){
          featuredCardsId = [...featuredCardsId, cardsId[j]];
        }
      }
    }
    return featuredCardsId;
  }

  getItemById(data, id){
    for(var i=0;i<data.length;i++){
      if(data[i]._id === id){
        return data[i];
      }
    }
    return null;
  }

  getLangById(langId){
    const langsData = this.props.store.langs.langs;
    return this.getItemById(langsData, langId);
  }

  getCardById(cardId){
    const cardsData = this.props.store.cards.cards;
    return this.getItemById(cardsData, cardId);
  }

  getStudentProjectById(id){
    const data = this.props.store.studentProjects.studentProjects;
    return this.getItemById(data, id);
  }

  getProjectById(projectId){
    const projectsData = this.props.store.projects.projects;
    return this.getItemById(projectsData, projectId);
  }

  getCourseById(courseId){
    const coursesData = this.props.store.courses.courses;
    return this.getItemById(coursesData, courseId);
  }

  getStudentProject(studentId, projectId){
    const studentProjectsData = this.props.store.studentProjects.studentProjects;
    for(var i=0;i<studentProjectsData.length;i++){
      if(studentProjectsData[i].project === projectId &&
        studentProjectsData[i].student === studentId){
        return studentProjectsData[i];
      }
    }
    return null;
  }

  getStudentProfileByUserId(userId){
    const studentsData = this.props.store.students.students;
    for(var i=0;i<studentsData.length;i++){
      if(studentsData[i].belongTo === userId){
        return studentsData[i];
      }
    }
    return null;
  }

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

  async url(filename, type){
    const action = this.props.actions.content;
    if(!filename){ return ''};
    const cachedUrl = this.props.store.content.cachedUrl[filename];
    if(cachedUrl){ /*console.log('use cached url');*/ return cachedUrl; }
    //console.log('create url');
    action.cacheUrl(filename, 'processing...');
    const localFile = await this.props.db.get(filename);
    if(localFile){
      const url = URL.createObjectURL(localFile);
      return action.cacheUrl(filename, url);
    }else{
      const downloadUrl = process.env.REACT_APP_API + '/download/'+ type + '/' + filename;
      let err, res;
      [err, res] = await to(axios.get(downloadUrl, {responseType: 'blob'}));
      if(err || !res.data){ console.log('file download error!'); return '';}
      this.props.db.set(filename, res.data);
      const url = URL.createObjectURL(res.data);
      return action.cacheUrl(filename, url);
    }
  }

  downloadFile(absoluteUrl) {
    var link = document.createElement('a');
    link.href = absoluteUrl;
    link.download = 'true';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
 };

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

  multiLang(english, chinese){
    switch (this.props.store.main.language) {
      case 'english':
        return english;
      case 'chinese':
        return chinese;
      default:
        return english;
    }
  }

  render() {
    const app = {
      store: this.props.store,
      actions: this.props.actions,
      database: this.props.db,
      functions: {
        url: this.url.bind(this),
        multiLang: this.multiLang.bind(this),
        getDateString: this.getDateString.bind(this),
        getStudentProfileByUserId: this.getStudentProfileByUserId.bind(this),
        getCourseById: this.getCourseById.bind(this),
        getProjectById: this.getProjectById.bind(this),
        getStudentProject: this.getStudentProject.bind(this),
        getCardById: this.getCardById.bind(this),
        getLangById: this.getLangById.bind(this),
        getStudentProjectById: this.getStudentProjectById.bind(this),
        langKeyToLangName: this.langKeyToLangName.bind(this),
        langNameToLangKey: this.langNameToLangKey.bind(this),
        getAllFeaturedCardsIdInViewingProject: this.getAllFeaturedCardsIdInViewingProject.bind(this)
      }
    }
    return (
      <Main app={app}/>
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
      studentProjects: Action(studentProjects, dispatch),

      cards: Action(cards, dispatch),
      langs: Action(langs, dispatch),
    }
  }
}

function Action(action, dispatch){
  return bindActionCreators(action, dispatch)
}

function to(promise) {
   return promise.then(data => {
      return [null, data];
   })
   .catch(err => [err]);
}

export default connect(mapStateToProps,mapDispatchToProps)(App);

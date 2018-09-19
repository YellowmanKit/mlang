import React from 'react';
import UI from 'components/UI';
import {Motion, spring}  from 'react-motion';

class Tree extends UI {

  render(){
    this.init(this.props);

    const view = this.store.content.view;

    if(view && view.includes('Home')){ return null; }

    const toShow = ['school', 'teacher','student','course','subject','studentSubject','project','studentProject'];
    if(!toShow.includes(view)){ return null; }
    const treeStyle = {...this.ui.styles.container, ...{
      display: 'flex',
      justifyContent: 'flex-start',
      flexFlow: 'column nowrap',
      position: 'absolute',
      right: this.bs.height * 0.01,
      bottom: this.bs.height * 0.01
    }}
    const previousViews = this.store.content.previousViews;
    return(
      <div style={treeStyle}>
        {this.store.content.traces.map((view, i)=>{
          return this.treeCell(view, i);
        })}
        {previousViews.length > 0 && previousViews.slice().reverse().map(view =>{return this.treeCell(view, -1, true)}) }
      </div>
    )
  }

  treeCell(view, index, dead){
    const hide = this.store.content.hide.tree;
    const isTitle = index === 0;

    const cellStyle = {...this.ui.styles.border, ...this.ui.styles.container,...{
      width: this.bs.height * 0.2,
      fontSize: this.bs.height * 0.02,
      textAlign: 'center',
      backgroundColor: 'white',
      borderRadius: this.bs.height * 0.01,
      overflow: 'hidden',
      cursor: 'pointer'
    }}
    const text =
    isTitle? this.func.multiLang('Home','主頁','主页'):
    view === 'school'? this.store.schools.viewingSchool.name:
    view === 'teacher'? this.store.profiles.viewingTeacherProfile.name:
    view === 'student'? this.store.profiles.viewingProfile.name:
    view === 'course'? this.store.courses.viewingCourse.title:
    view === 'subject'? this.store.subjects.viewingSubject.title:
    view === 'studentSubject'? this.store.subjects.viewingSubject.title:
    view === 'project'? this.store.projects.viewingProject.title:
    view === 'studentProject'? this.store.projects.viewingProject.title:
    '';
    const onClick =
    isTitle? ()=>{   this.actions.content.backToHome(); }:
    ()=>{
      for(var i=0;i<(this.store.content.traces.length - index - 1);i++){
        this.actions.content.pullView();
      }
    };

    const cellHeight = this.bs.height * 0.025;
    const marginTop =  this.bs.height * 0.0075;
    return(
      <Motion key={view} defaultStyle={{opacity: dead? 1:0, height: dead? cellHeight: 0, marginTop: dead? marginTop:0}}
      style={{opacity: dead? spring(0):(hide && !isTitle)?spring(0.05): spring(1.1), height: dead? spring(0):(hide && !isTitle)?spring(0):spring(cellHeight), marginTop: dead? spring(0):(hide && !isTitle)?spring(0): spring(marginTop)}}>
        {style=>(
          <div style={{...cellStyle, ...{opacity: style.opacity, height: style.height, marginTop: style.marginTop}}} onClick={onClick}>
            {text}
          </div>
        )}
      </Motion>
    )
  }
}

export default Tree;
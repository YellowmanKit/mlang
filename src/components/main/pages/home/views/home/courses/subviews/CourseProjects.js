import React from 'react';
import SubView from 'components/main/pages/home/views/SubView';

import ProjectRow from 'components/main/items/rows/ProjectRow';

class CourseProjects extends SubView {

  componentDidMount(){
    this.getCourseProjects();
  }

  getCourseProjects(){
    const app = this.props.app;
    const func = app.functions;
    const course = app.store.courses.viewingCourse;

    const projectsToGet = [];
    const projectsToShow = course.projects;

    for(var i=0;i<projectsToShow.length;i++){
      if(func.getProjectById(projectsToShow[i]) === null){
        projectsToGet.splice(0,0, projectsToShow[i]);
      }
    }
    if(projectsToGet.length > 0){
      app.actions.projects.getProjects(projectsToGet);
    }
  }

  projectsList(){
    const app = this.props.app;
    const func = app.functions;
    const actions = app.actions;
    const projects = app.store.courses.viewingCourse.projects;
    return projects.map((projectId, i)=>{
      const _project = func.getProjectById(projectId)
      return <ProjectRow onClick={()=>{actions.projects.viewProject(i,_project); actions.content.pushView('project');}} app={app} project={_project} key={i}/>
    })
  }

  render() {
    const app = this.props.app;
    const ui = app.store.ui;
    const bs = ui.basicStyle;
    const areaStyle = Object.assign({}, bs, ui.listStyle);
    const addBtnText = ['CREATE PROJECT','創建專題研習'];

    return(
      <div style={this.subViewStyle()}>
        <div style={areaStyle}>
          {app.store.user.type === 'teacher' && this.buttons.listAdd([bs.width, bs.height * 0.1], addBtnText, '200%', ()=>{app.actions.content.pushView('addProject')})}
          {this.projectsList()}
        </div>
      </div>
    )
  }

}

export default CourseProjects;

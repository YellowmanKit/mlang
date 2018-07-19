import React from 'react';
import UI from 'components/UI';

import ProjectRow from 'components/main/items/ProjectRow';

class CourseProjects extends UI {

  projectsList(){
    const app = this.props.app;
    const func = app.functions;
    const actions = app.actions;
    const projects = app.store.courses.viewingCourse.projects;
    return projects.map((projectId, i)=>{
      const _project = func.getProjectById(projectId)
      return <ProjectRow _onClick={()=>{actions.projects.viewProject(i,_project); actions.content.pushView('project');}} app={this.props.app} project={_project} key={i}/>
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
          {app.store.user.type === 'teacher' && this.listAddButton([bs.width, bs.height * 0.1], ()=>{app.actions.content.pushView('addProject')}, addBtnText, '200%')}
          {this.projectsList()}
        </div>
      </div>
    )
  }

}

export default CourseProjects;

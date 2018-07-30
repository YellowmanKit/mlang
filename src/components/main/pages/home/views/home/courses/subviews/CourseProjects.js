import React from 'react';
import SubView from 'components/main/pages/home/views/SubView';

import ProjectRow from 'components/main/items/rows/ProjectRow';

class CourseProjects extends SubView {

  componentDidMount(){
    this.init(this.props);
    this.getCourseProjects();
  }

  getCourseProjects(){
    const course = this.store.courses.viewingCourse;

    const projectsToGet = [];
    const projectsToShow = course.projects;

    for(var i=0;i<projectsToShow.length;i++){
      if(this.func.getProjectById(projectsToShow[i]) === null){
        projectsToGet.splice(0,0, projectsToShow[i]);
      }
    }
    if(projectsToGet.length > 0){
      this.actions.projects.getProjects(projectsToGet);
    }
  }

  projectsList(){
    const projects = this.store.courses.viewingCourse.projects;
    return projects.map((projectId, i)=>{
      const _project = this.func.getProjectById(projectId)
      return <ProjectRow onClick={()=>{this.actions.projects.viewProject(i,_project); this.actions.content.pushView('project');}} app={this.app} project={_project} key={i}/>
    })
  }

  render() {
    this.init(this.props);
    const areaStyle = {...this.bs, ...this.ui.listStyle};
    const addBtnText = ['CREATE PROJECT','創建專題研習'];

    return(
      <div style={this.subViewStyle()}>
        <div style={areaStyle}>
          {this.store.user.type === 'teacher' && this.buttons.listAdd([this.bs.width, this.bs.height * 0.1], addBtnText, '200%', ()=>{this.actions.content.pushView('addProject')})}
          {this.projectsList()}
        </div>
      </div>
    )
  }

}

export default CourseProjects;

import React from 'react';
import SubView from 'components/main/pages/home/views/SubView';

import ProjectRow from 'components/main/items/rows/ProjectRow';

class SubjectProjects extends SubView {

  componentDidMount(){
    this.init(this.props);
    this.getSubjectProjects();
  }

  getSubjectProjects(){
    const subject = this.store.subjects.viewingSubject;

    const projectsToGet = [];
    const projectsToShow = subject.projects;

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
    const projects = this.store.subjects.viewingSubject.projects;
    return projects.slice(0).reverse().map((projectId, i)=>{
      const _project = this.func.getProjectById(projectId)
      return <ProjectRow onClick={()=>{ this.clearAlert(projectId); this.actions.projects.viewProject(_project); this.actions.content.pushView('project');}} app={this.app} project={_project} key={i}/>
    })
  }

  render() {
    this.init(this.props);
    return(
      <div style={this.subViewStyle()}>
        <div style={{...this.bs, ...this.ui.styles.list}}>
          {this.projectsList()}
        </div>
      </div>
    )
  }

}

export default SubjectProjects;

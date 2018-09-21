import React from 'react';
import View from 'components/main/pages/home/views/View';

import SubNav from 'components/main/items/SubNav';
import ProjectDetail from './subviews/ProjectDetail';
import SubmittedCards from './subviews/SubmittedCards';
import StudentProjects from './subviews/StudentProjects';
import ProjectFeatured from './subviews/ProjectFeatured';
import ProjectRanking from './subviews/ProjectRanking';

class Project extends View {

  componentDidMount(){
    this.init(this.props);
    if(!this.store.content.subView.includes('project')){
      this.actions.content.setSubView(this.inSchool? 'projectFeatured':'projectSubmitted');
    }
    this.getStudentProjects(this.props);
  }

  getStudentProjects(props){
    const viewingProject = this.store.projects.viewingProject;

    const studentProjectsToGet = [];
    const studentProjectsToShow = viewingProject.studentProjects;

    for(var i=0;i<studentProjectsToShow.length;i++){
      if(this.func.getStudentProjectById(studentProjectsToShow[i]) === null){
        studentProjectsToGet.splice(0,0, studentProjectsToShow[i]);
      }
    }
    if(studentProjectsToGet.length > 0){
      this.actions.studentProjects.getStudentProjects(studentProjectsToGet);
    }
  }

  subView(){
    const subView = this.store.content.subView;
    const type = this.store.user.type;

    switch (subView) {
      case 'projectDetail':
        return <ProjectDetail app={this.app}/>
      case 'projectSubmitted':
        return(
          type === 'student'? <SubmittedCards app={this.app}/>:
          type === 'teacher'? <StudentProjects app={this.app}/>:
          null
        )
      case 'projectRanking':
        return <ProjectRanking app={this.app}/>
      case 'projectFeatured':
        return <ProjectFeatured app={this.app}/>
      default:
        return null;
    }
  }

  projectSubNav(){
    const options = [
      {
        tag:['Featured','精選卡片','精选卡片'],
        subView: 'projectFeatured'
      },
      {
        tag:['Ranking','排行榜','排行榜'],
        subView: 'projectRanking'
      },
      {
        tag:['Detail','詳細資訊','详细资讯'],
        subView: 'projectDetail'
      }
    ];
    if(!this.inSchool){
      options.splice(0,0,
      {
        tag:['Submitted','已提交','已提交'],
        subView: 'projectSubmitted'
      });
    }
    return <SubNav app={this.app} options={options} />
  }

  render(){
    this.init(this.props);
    const project = this.store.projects.viewingProject;
    return(
      <div style={this.viewStyle()}>
        {this.tabBar([project.title,project.title,project.title])}
        {this.projectSubNav()}
        {this.sep()}
        {this.subView()}
      </div>
    )
  }
}

export default Project;

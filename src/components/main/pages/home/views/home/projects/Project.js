import React from 'react';
import View from 'components/main/pages/home/views/View';

import SubNav from 'components/main/items/SubNav';
import ProjectDetail from './subviews/ProjectDetail';
import SubmittedCards from './subviews/SubmittedCards';
import StudentProjects from './subviews/StudentProjects';

class Project extends View {

  componentDidMount(){
    this.init(this.props);
    this.actions.content.setSubView('projectSubmitted');
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
      default:
        return null;
    }
  }

  projectSubNav(){
    const _options = [
      {
        tag:['Detail','詳細資訊'],
        subView: 'projectDetail'
      },
      {
        tag:['Submitted','已提交'],
        subView: 'projectSubmitted'
      },
      {
        tag:['Featured','精選卡片'],
        subView: 'projectFeatured'
      }
    ]
    return <SubNav app={this.app} options={_options} />
  }

  render(){
    this.init(this.props);
    const project = this.store.projects.viewingProject;
    return(
      <div style={this.viewStyle()}>
        {this.tabBar([project.title,project.title])}
        {this.projectSubNav()}
        {this.sep()}
        {this.subView()}
      </div>
    )
  }
}

export default Project;

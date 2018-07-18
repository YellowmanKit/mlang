import React from 'react';
import UI from 'components/UI';

import SubNav from 'components/main/items/SubNav';
import ProjectDetail from './subviews/ProjectDetail';
import SubmittedCards from './subviews/SubmittedCards';

class Project extends UI {

  componentDidMount(){
    const app = this.props.app;
    const actions = app.actions;
    actions.content.setSubView('projectSubmitted');
  }

  subView(){
    const app = this.props.app;
    const subView = app.store.content.subView;
    const type = app.store.user.type;

    switch (subView) {
      case 'projectDetail':
        return <ProjectDetail app={this.props.app}/>
      case 'projectSubmitted':
        return(
          type === 'student'? <SubmittedCards app={this.props.app}/>:
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
    return <SubNav app={this.props.app} options={_options} />
  }

  render(){
    const app = this.props.app;
    const store = app.store;
    const project = store.projects.viewingProject;
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

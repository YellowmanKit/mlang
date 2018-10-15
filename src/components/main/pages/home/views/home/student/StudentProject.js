import React from 'react';
import View from 'components/main/pages/home/views/View';
import Cards from 'components/main/pages/home/views/home/contents/Cards';
import SubNav from 'components/main/items/SubNav';
import ProjectDetail from '../projects/subviews/ProjectDetail';

class StudentProject extends View {

  componentDidMount(){
    this.init(this.props);
    if(!this.store.content.subView.includes('project')){
      this.actions.content.setSubView('projectFeatured');
    }
  }

  subView(){
    const subView = this.store.content.subView;

    switch (subView) {
      case 'projectFeatured':
        return <Cards app={this.app} cardsId={this.cardsId} featuredOnly={true}/>
      case 'projectDetail':
        return <ProjectDetail app={this.app}/>
      default:
        return null;
    }
  }

  studentSubNav(){
    const _options = [
      {
        tag:['Featured','精選卡片','精选卡片'],
        subView: 'projectFeatured'
      },
      {
        tag:['Detail','詳細資訊','详细资讯'],
        subView: 'projectDetail'
      }
    ]
    return <SubNav app={this.app} options={_options} />
  }

  render(){
    this.init(this.props);
    const project = this.func.getById.project(this.store.studentProjects.viewingStudentProject.project, this.store);
    const title = project.title;
    this.cardsId = this.store.studentProjects.viewingStudentProject.cards;
    return(
      <div style={this.viewStyle()}>
        {this.tabBar([title, title, title])}
        {this.studentSubNav()}
        {this.sep()}
        {this.subView()}
      </div>
    )
  }


}

export default StudentProject;

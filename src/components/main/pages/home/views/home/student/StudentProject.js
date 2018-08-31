import React from 'react';
import View from 'components/main/pages/home/views/View';
import Cards from 'components/main/pages/home/views/home/contents/Cards';

class StudentProject extends View {

  render(){
    this.init(this.props);
    const project = this.func.getProjectById(this.store.studentProjects.viewingStudentProject.project);
    const cardsId = this.store.studentProjects.viewingStudentProject.cards;

    return(
      <div style={this.viewStyle()}>
        {this.tabBar([project.title, project.title, project.title])}
        <Cards app={this.app} cardsId={cardsId} featuredOnly={true}/>
      </div>
    )
  }

}

export default StudentProject;

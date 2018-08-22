import React from 'react';
import SubView from 'components/main/pages/home/views/SubView';
import Cards from 'components/main/pages/home/views/home/contents/Cards';

class SubmittedCards extends SubView {

  componentDidMount(){
    this.init(this.props);
    this.getStudentProject();
  }

  getStudentProject(){
    const viewingProject = this.store.projects.viewingProject;
    const studentProject = this.func.getStudentProject(this.store.user._id, viewingProject._id)
    if(studentProject === null){
      this.actions.studentProjects.getStudentProject(this.store.user._id, viewingProject._id, this.store.studentProjects.studentProjects.length)
    }else {
      this.actions.studentProjects.viewStudentProject(studentProject)
    }
  }

  cards(){
    const areaStyle = {...this.ui.styles.area, ...{
      height: this.bs.height * 0.72
    }}
    return(
      <div style={areaStyle}>
        {this.cardCells()}
      </div>
    )
  }

  cardCells(){
    const studentProject = this.store.studentProjects.viewingStudentProject;
    if(studentProject.cards){
      return <Cards app={this.app} cardsId={studentProject.cards} />
    }else{
      console.log('no viewingStudentProject cards!')
    }
  }

  render() {
    this.init(this.props);
    const onAdd = ()=>{this.actions.content.pushView('addCard')};

    return(
      <div style={this.subViewStyle()}>
        {this.buttons.listAdd([this.bs.width, this.bs.height * 0.1], ['CREATE CARD','製作卡片'], '200%', onAdd)}
        {this.cards()}
      </div>
    )
  }

}

export default SubmittedCards;

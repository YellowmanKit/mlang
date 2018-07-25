import React from 'react';
import SubView from 'components/main/pages/home/views/SubView';
import Cards from 'components/main/pages/home/views/home/contents/Cards';

class SubmittedCards extends SubView {

  componentDidMount(){
    this.getStudentProject();
  }

  getStudentProject(){
    const app = this.props.app;
    const func = app.functions;
    const viewingProject = app.store.projects.viewingProject;
    const studentProject = func.getStudentProject(app.store.user._id, viewingProject._id)
    if(studentProject.data === null){
      app.actions.studentProjects.getStudentProject(app.store.user._id, viewingProject._id, app.store.studentProjects.studentProjects.length)
    }else {
      app.actions.studentProjects.viewStudentProject(studentProject.index, studentProject.data)
    }
  }

  cards(){
    const app = this.props.app;
    const ui = app.store.ui;
    const bs = ui.basicStyle;

    const areaStyle = {...ui.styles.area, ...{
      height: bs.height * 0.72
    }}
    return(
      <div style={areaStyle}>
        {this.cardCells()}
      </div>
    )
  }

  cardCells(){
    const app = this.props.app;
    const studentProject = app.store.studentProjects.viewingStudentProject;
    if(studentProject.cards !== undefined){
      return <Cards app={app} cardsId={studentProject.cards} />
    }else{
      //console.log('no viewingStudentProject')
    }
  }

  render() {
    const app = this.props.app;
    const ui = app.store.ui;
    const bs = ui.basicStyle;
    const onAdd = ()=>{app.actions.content.pushView('addCard')};

    return(
      <div style={this.subViewStyle()}>
        {this.buttons.listAdd([bs.width, bs.height * 0.1], ['CREATE CARD','製作卡片'], '200%', onAdd)}
        {this.cards()}
      </div>
    )
  }

}

export default SubmittedCards;

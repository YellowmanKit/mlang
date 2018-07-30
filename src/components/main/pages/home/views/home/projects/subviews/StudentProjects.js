import React from 'react';
import SubView from 'components/main/pages/home/views/SubView';

import StudentProjectRow from 'components/main/items/rows/StudentProjectRow';

class StudentProjects extends SubView {

  constructor(props){
    super(props);
    this.state = {
      studentProjects: []
    }
  }

  componentDidMount(){
    this.init(this.props);
    this.getStudentProjects(this.props);
  }

  componentWillReceiveProps(newProps){
    this.init(this.props);
    if(this.state.studentProjects.length === 0){
      //console.log('componentWillReceiveProps')
      this.getStudentProjects(newProps);
    }
  }

  initStudentProjects(props){
    var studentProjects = this.store.projects.viewingProject.studentProjects.slice(0);

    for(var i=0;i<studentProjects.length;i++){
      studentProjects[i] = this.func.getStudentProjectById(studentProjects[i])
      //console.log(studentProjects[i])
      if(studentProjects[i] === null){ return; }
      var total = 0;
      var featured = 0;
      var alert = 0;
      const cards = studentProjects[i].cards;
      total = cards.length;
      for(var j=0;j<cards.length;j++){
        if(!cards[j].grade || cards[j].grade === 'notGraded'){
          alert++;
        }
        if(cards[j].grade && cards[j].grade === 'featured'){
          featured++;
        }
      }
      studentProjects[i] = {...studentProjects[i], total: total, featured: featured, alert: alert}
    }
    this.setState({
      studentProjects: studentProjects
    })
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
    this.initStudentProjects(props);
  }

  studentProjectsList(){
    return this.state.studentProjects.map((studentProject, i)=>{
      return <StudentProjectRow app={this.app} studentProject={studentProject} key={i}/>
    })
  }

  render() {
    this.init(this.props);
    return(
      <div style={this.subViewStyle()}>
        {this.studentProjectsList()}
      </div>
    )
  }

}

export default StudentProjects;

import React from 'react';
import SubView from 'components/main/pages/home/views/SubView';

import ProfileRow from 'components/main/items/rows/ProfileRow';

class CourseStudents extends SubView {

  componentDidMount(){
    this.getStudentProfiles();
  }

  getStudentProfiles(){
    const app = this.props.app;
    const func = app.functions;
    const course = app.store.courses.viewingCourse;

    const studentsToGet = [];
    const studentsToShow = course.joinedStudents;

    for(var i=0;i<studentsToShow.length;i++){
      if(func.getStudentProfileByUserId(studentsToShow[i]) === null){
        studentsToGet.splice(0,0, studentsToShow[i]);
      }
    }
    if(studentsToGet.length > 0){
      app.actions.students.getStudentProfiles(studentsToGet);
    }
  }

  studentsList(){
    const app = this.props.app;
    const func = app.functions;
    const students = app.store.courses.viewingCourse.joinedStudents;
    return students.map((userId, i)=>{
      return <ProfileRow app={app} profile={func.getStudentProfileByUserId(userId)} key={i}/>
    })
  }

  render() {
    const app = this.props.app;
    const ui = app.store.ui;
    const areaStyle = Object.assign({},ui.basicStyle, ui.listStyle)
    return(
      <div style={this.subViewStyle()}>
        <div style={areaStyle}>
          {this.studentsList()}
        </div>
      </div>
    )
  }

}

export default CourseStudents;

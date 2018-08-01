import React from 'react';
import SubView from 'components/main/pages/home/views/SubView';

import ProfileRow from 'components/main/items/rows/ProfileRow';

class CourseStudents extends SubView {

  componentDidMount(){
    this.init(this.props);
    this.getStudentProfiles();
  }

  getStudentProfiles(){
    const course = this.store.courses.viewingCourse;

    const studentsToGet = [];
    const studentsToShow = course.joinedStudents;

    for(var i=0;i<studentsToShow.length;i++){
      if(this.func.getStudentProfileByUserId(studentsToShow[i]) === null){
        studentsToGet.splice(0,0, studentsToShow[i]);
      }
    }
    if(studentsToGet.length > 0){
      this.actions.students.getStudentProfiles(studentsToGet);
    }
  }

  studentsList(){
    const students = this.store.courses.viewingCourse.joinedStudents;
    return students.map((userId, i)=>{
      return <ProfileRow app={this.app} profile={this.func.getStudentProfileByUserId(userId)} key={i}/>
    })
  }

  render() {
    this.init(this.props);
    return(
      <div style={this.subViewStyle()}>
        <div style={{...this.bs, ...this.ui.styles.list}}>
          {this.studentsList()}
        </div>
      </div>
    )
  }

}

export default CourseStudents;

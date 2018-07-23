import React from 'react';
import SubView from 'components/main/pages/home/views/SubView';

import ProfileRow from 'components/main/items/rows/ProfileRow';

class CourseStudents extends SubView {

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

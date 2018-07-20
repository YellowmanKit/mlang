import React from 'react';
import UI from 'components/UI';

import ProfileRow from 'components/main/items/rows/ProfileRow';

class CourseStudents extends UI {

  studentsList(){
    const app = this.props.app;
    const func = app.functions;
    const students = app.store.courses.viewingCourse.joinedStudents;
    return students.map((userId, i)=>{
      return <ProfileRow app={this.props.app} profile={func.getStudentProfileByUserId(userId)} key={i}/>
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

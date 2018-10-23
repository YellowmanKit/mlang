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

    const profilesToGet = [];
    const profilesToShow = course.joinedStudents;

    for(var i=0;i<profilesToShow.length;i++){
      if(this.func.getById.profileByUser(profilesToShow[i], this.store) === null){
        profilesToGet.splice(0,0, profilesToShow[i]);
      }
    }
    if(profilesToGet.length > 0){
      this.actions.profiles.getProfiles(profilesToGet);
    }
  }

  studentsList(){
    const students = this.store.courses.viewingCourse.joinedStudents;
    return students.map((userId, i)=>{
      const profile = this.func.getById.profileByUser(userId, this.store);
      if(!profile){ return null; }
      return (
      <ProfileRow
      app={this.app}
      profile={profile}
      key={i}
      onClick={()=>{ this.actions.profiles.viewProfile(profile); this.actions.content.pushView('student');}}/>)
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

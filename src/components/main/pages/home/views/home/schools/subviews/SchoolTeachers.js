import React from 'react';
import SubView from 'components/main/pages/home/views/SubView';

import ProfileRow from 'components/main/items/rows/ProfileRow';

class CourseStudents extends SubView {

  componentDidMount(){
    this.init(this.props);
    this.getTeacherProfiles();
  }

  getTeacherProfiles(){
    const school = this.store.schools.viewingSchool;

    const profilesToGet = [];
    const profilesToShow = school.joinedTeachers;

    for(var i=0;i<profilesToShow.length;i++){
      if(this.func.getProfileByUserId(profilesToShow[i]) === null){
        profilesToGet.splice(0,0, profilesToShow[i]);
      }
    }
    if(profilesToGet.length > 0){
      this.actions.profiles.getProfiles(profilesToGet);
    }
  }

  teachersList(){
    const teachers = this.store.schools.viewingSchool.joinedTeachers;
    return teachers.map((userId, i)=>{
      const profile = this.func.getProfileByUserId(userId);
      return (
      <ProfileRow
      app={this.app}
      profile={profile}
      key={i}
      onClick={()=>{ this.actions.profiles.viewTeacherProfile(profile); this.actions.content.pushView('teacher');}}/>)
    })
  }

  render() {
    this.init(this.props);
    return(
      <div style={this.subViewStyle()}>
        <div style={{...this.bs, ...this.ui.styles.list}}>
          {this.teachersList()}
        </div>
      </div>
    )
  }

}

export default CourseStudents;

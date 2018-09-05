import React from 'react';
import SubView from 'components/main/pages/home/views/SubView';
import CourseRow from 'components/main/items/rows/CourseRow';

class TeacherCourses extends SubView {

  constructor(props){
    super(props);
    this.init(props);
    if(!props.profile.teachingCourses){
      this.getAllCoursesOfUser();
    }
  }

  getAllCoursesOfUser(){
    this.actions.courses.getAllTeachingCoursesOfUser(this.store.profiles.viewingTeacherProfile);
  }

  teacherCoursesList(){
    return this.props.profile.teachingCourses.map((courseId, i)=>{
      var course = this.func.getCourseById(courseId);
      return(
        <CourseRow
        app={this.app}
        course={course}
        onClick={()=>{
          this.actions.courses.viewCourse(course);
          this.actions.content.pushView('course'); }}
        key={i}/>
      )
    })
  }

  render(){
    this.init(this.props);

    if(!this.props.profile.teachingCourses){ return null; }
    return(
      <div style={this.subViewStyle()}>
        {this.teacherCoursesList()}
      </div>
    )
  }

}

export default TeacherCourses;

import React from 'react';
import UI from 'components/UI';

import SubNav from 'components/main/items/SubNav';
import CourseDetail from './subviews/CourseDetail';
import CourseStudents from './subviews/CourseStudents';

class Course extends UI {

  componentDidMount(){
    const app = this.props.app;
    const actions = app.actions;
    this.getStudentProfiles();
    actions.content.setSubView('courseStudents');
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
    app.actions.students.getStudentProfiles(studentsToGet);
  }

  subView(){
    const subView = this.props.app.store.content.subView;
    switch (subView) {
      case 'courseDetail':
        return <CourseDetail app={this.props.app}/>
      case 'courseStudents':
        return <CourseStudents app={this.props.app}/>
      default:
        return null;
    }
  }

  courseSubNav(){
    const _options = [
      {
        tag:['Detail','詳細資訊'],
        subView: 'courseDetail'
      },
      {
        tag:['Students','學生'],
        subView: 'courseStudents'
      },
      {
        tag:['Projects','專題研習'],
        subView: 'courseProjects'
      }
    ]
    return <SubNav app={this.props.app} options={_options} />
  }

  render(){
    const app = this.props.app;
    const store = app.store;
    const course = store.courses.viewingCourse;
    return(
      <div style={this.viewStyle()}>
        {this.tabBar([course.title,course.title])}
        {this.courseSubNav()}
        {this.sep()}
        {this.subView()}
      </div>
    )
  }
}

export default Course;

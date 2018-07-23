import React from 'react';
import View from 'components/main/pages/home/views/View';

import SubNav from 'components/main/items/SubNav';
import CourseDetail from './subviews/CourseDetail';
import CourseStudents from './subviews/CourseStudents';
import CourseProjects from './subviews/CourseProjects';

class Course extends View {

  componentDidMount(){
    const app = this.props.app;
    const actions = app.actions;
    this.getStudentProfiles();
    this.getCourseProjects();
    actions.content.setSubView('courseProjects');
  }

  getCourseProjects(){
    const app = this.props.app;
    const func = app.functions;
    const course = app.store.courses.viewingCourse;

    const projectsToGet = [];
    const projectsToShow = course.projects;

    for(var i=0;i<projectsToShow.length;i++){
      if(func.getProjectById(projectsToShow[i]) === null){
        projectsToGet.splice(0,0, projectsToShow[i]);
      }
    }
    if(projectsToGet.length > 0){
      app.actions.projects.getProjects(projectsToGet);
    }
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

  subView(){
    const app = this.props.app;
    const subView = this.props.app.store.content.subView;
    switch (subView) {
      case 'courseDetail':
        return <CourseDetail app={app}/>
      case 'courseStudents':
        return <CourseStudents app={app}/>
      case 'courseProjects':
        return <CourseProjects app={app}/>
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

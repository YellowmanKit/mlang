import React from 'react';
import View from 'components/main/pages/home/views/View';

import SubNav from 'components/main/items/SubNav';
import CourseDetail from './subviews/CourseDetail';
import CourseStudents from './subviews/CourseStudents';
//import CourseProjects from './subviews/CourseProjects';
import CourseSubjects from './subviews/CourseSubjects';

class Course extends View {

  componentDidMount(){
    if(this.store.content.subView.includes('student')){
      this.actions.content.setSubView('courseStudents');
    }else if(this.store.content.subView.includes('subject')){
      this.actions.content.setSubView('courseSubjects');
    }else if(!this.store.content.subView.includes('course')){
      this.actions.content.setSubView('courseSubjects');
    }
  }

  subView(){
    const subView = this.store.content.subView;
    switch (subView) {
      case 'courseDetail':
        return <CourseDetail app={this.app}/>
      case 'courseStudents':
        return <CourseStudents app={this.app}/>
      case 'courseSubjects':
        return <CourseSubjects app={this.app}/>
      default:
        return null;
    }
  }

  courseSubNav(){
    const _options = [
      {
        tag:['Subjects','議題','议题'],
        subView: 'courseSubjects'
      },
      {
        tag:['Students','學生','学生'],
        subView: 'courseStudents'
      },
      {
        tag:['Detail','詳細資訊','详细资讯'],
        subView: 'courseDetail'
      }
    ]
    return <SubNav app={this.app} options={_options} />
  }

  render(){
    this.init(this.props);
    const course = this.store.courses.viewingCourse;
    return(
      <div style={this.viewStyle()}>
        {this.tabBar([course.title,course.title,course.title])}
        {this.courseSubNav()}
        {this.sep()}
        {this.subView()}
      </div>
    )
  }
}

export default Course;

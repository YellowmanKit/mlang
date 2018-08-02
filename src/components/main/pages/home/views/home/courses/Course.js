import React from 'react';
import View from 'components/main/pages/home/views/View';

import SubNav from 'components/main/items/SubNav';
import CourseDetail from './subviews/CourseDetail';
import CourseStudents from './subviews/CourseStudents';
import CourseProjects from './subviews/CourseProjects';

class Course extends View {

  componentDidMount(){
    if(!this.store.content.subView.includes('course')){
      this.actions.content.setSubView('courseProjects');
    }
  }

  subView(){
    const subView = this.store.content.subView;
    switch (subView) {
      case 'courseDetail':
        return <CourseDetail app={this.app}/>
      case 'courseStudents':
        return <CourseStudents app={this.app}/>
      case 'courseProjects':
        return <CourseProjects app={this.app}/>
      default:
        return null;
    }
  }

  courseSubNav(){
    const _options = [
      {
        tag:['Projects','專題研習'],
        subView: 'courseProjects'
      },
      {
        tag:['Students','學生'],
        subView: 'courseStudents'
      },
      {
        tag:['Detail','詳細資訊'],
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
        {this.tabBar([course.title,course.title])}
        {this.courseSubNav()}
        {this.sep()}
        {this.subView()}
      </div>
    )
  }
}

export default Course;

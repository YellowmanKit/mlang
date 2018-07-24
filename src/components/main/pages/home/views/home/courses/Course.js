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
    actions.content.setSubView('courseProjects');
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

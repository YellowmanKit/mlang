import React from 'react';
import View from 'components/main/pages/home/views/View';

import SubNav from 'components/main/items/SubNav';
import Profile from '../student/subviews/Profile';
import TeacherCourses from './subviews/TeacherCourses';

class Teacher extends View {

  constructor(props){
    super(props);
    this.init(this.props);
    this.profile = this.store.profiles.viewingTeacherProfile;
  }

  componentWillReceiveProps(newProps){
    this.init(newProps);
    this.profile = this.store.profiles.viewingTeacherProfile;
  }

  componentDidMount(){
    this.init(this.props);
    if(!this.store.content.subView.includes('teacher')){
      this.actions.content.setSubView('teacherCourses');
    }
  }

  subView(){
    const subView = this.store.content.subView;

    switch (subView) {
      case 'teacherProfile':
        return <Profile app={this.app} profile={this.profile}/>
      case 'teacherCourses':
        return <TeacherCourses app={this.app} profile={this.profile}/>;
      default:
        return null;
    }
  }

  teacherSubNav(){
    const options = [
      {
        tag:['Courses','班別','班别'],
        subView: 'teacherCourses'
      },
      {
        tag:['Profile','個人檔案','个人档案'],
        subView: 'teacherProfile'
      }
    ]
    return <SubNav app={this.app} options={options} />
  }

  render(){
    this.init(this.props);
    return(
      <div style={this.viewStyle()}>
        {this.tabBar([this.profile.name, this.profile.name, this.profile.name])}
        {this.teacherSubNav()}
        {this.sep()}
        {this.subView()}
      </div>
    )
  }

}

export default Teacher;

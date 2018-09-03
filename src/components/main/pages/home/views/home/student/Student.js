import React from 'react';
import View from 'components/main/pages/home/views/View';

import SubNav from 'components/main/items/SubNav';
import StudentProfile from './subviews/StudentProfile';
import StudentSubjects from './subviews/StudentSubjects';

class Student extends View {

  constructor(props){
    super(props);
    this.init(this.props);
    this.profile = this.store.profiles.viewingProfile;
  }

  componentWillReceiveProps(newProps){
    this.init(newProps);
    this.profile = this.store.profiles.viewingProfile;
  }

  componentDidMount(){
    this.init(this.props);
    if(!this.store.content.subView.includes('student')){
      this.actions.content.setSubView('studentProfile');
    }
  }

  subView(){
    const subView = this.store.content.subView;

    switch (subView) {
      case 'studentProfile':
        return <StudentProfile app={this.app} profile={this.profile}/>
      case 'studentSubjects':
        return <StudentSubjects app={this.app} profile={this.profile}/>
      default:
        return null;
    }
  }

  studentSubNav(){
    const _options = [
      {
        tag:['Profile','個人檔案','个人档案'],
        subView: 'studentProfile'
      },
      {
        tag:['Subjects','議題','议题'],
        subView: 'studentSubjects'
      }
    ]
    return <SubNav app={this.app} options={_options} />
  }

  render(){
    this.init(this.props);
    return(
      <div style={this.viewStyle()}>
        {this.tabBar([this.profile.name, this.profile.name, this.profile.name])}
        {this.studentSubNav()}
        {this.sep()}
        {this.subView()}
      </div>
    )
  }

}

export default Student;

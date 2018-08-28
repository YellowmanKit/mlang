import React from 'react';
import View from 'components/main/pages/home/views/View';

import SubNav from 'components/main/items/SubNav';
import StudentProfile from './subviews/StudentProfile';
import StudentFeatured from './subviews/StudentFeatured';

class Student extends View {

  constructor(props){
    super(props);
    this.init(this.props);
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
      case 'studentFeatured':
        return <StudentFeatured app={this.app} profile={this.profile}/>
      default:
        return null;
    }
  }

  studentSubNav(){
    const _options = [
      {
        tag:['Profile','個人檔案'],
        subView: 'studentProfile'
      },
      {
        tag:['Projects','專題研習'],
        subView: 'studentFeatured'
      }
    ]
    return <SubNav app={this.app} options={_options} />
  }

  render(){
    this.init(this.props);
    return(
      <div style={this.viewStyle()}>
        {this.tabBar([this.profile.name, this.profile.name])}
        {this.studentSubNav()}
        {this.sep()}
        {this.subView()}
      </div>
    )
  }

}

export default Student;

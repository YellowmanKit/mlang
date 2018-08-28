import React from 'react';
import SubView from 'components/main/pages/home/views/SubView';

class StudentFeatured extends SubView {

  constructor(props){
    super(props);
    this.init(props);
    this.profile = this.props.profile;
    if(!this.profile.studentProjects){
      this.getStudentProjects();
    }
  }

  getStudentProjects(){
    this.actions.studentProjects.getAllStudentProjectsOfUser(this.store.profiles.viewingProfile);
  }

  render(){
    this.init(this.props);
    return(
      <div style={this.subViewStyle()}>

      </div>
    )
  }

}

export default StudentFeatured;

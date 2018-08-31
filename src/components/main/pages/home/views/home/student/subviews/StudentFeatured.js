import React from 'react';
import SubView from 'components/main/pages/home/views/SubView';
import StudentProjectRow from 'components/main/items/rows/StudentProjectRow';

class StudentFeatured extends SubView {

  constructor(props){
    super(props);
    this.init(props);
    if(!props.profile.studentProjects){
      this.getStudentProjects();
    }
  }

  getStudentProjects(){
    this.actions.studentProjects.getAllStudentProjectsOfUser(this.store.profiles.viewingProfile);
  }

  studentProjectsList(){
    return this.props.profile.studentProjects.map((studentProjectId, i)=>{
      var studentProject = this.func.getStudentProjectById(studentProjectId);
      return(
        <StudentProjectRow
        app={this.app}
        studentProject={studentProject}
        onClick={()=>{
          this.actions.studentProjects.viewStudentProject(studentProject);
          this.actions.content.pushView('studentProject'); }}
        byProject={true}
        key={i}/>
      )
    })
  }

  render(){
    this.init(this.props);
    console.log(this.props.profile);
    if(!this.props.profile.studentProjects){ return null; }
    return(
      <div style={this.subViewStyle()}>
        {this.studentProjectsList()}
      </div>
    )
  }

}

export default StudentFeatured;

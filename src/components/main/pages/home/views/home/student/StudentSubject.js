import React from 'react';
import View from 'components/main/pages/home/views/View';
import SubNav from 'components/main/items/SubNav';

import SubjectDetail from '../subjects/subviews/SubjectDetail';
import StudentProjectRow from 'components/main/items/rows/StudentProjectRow';

class StudentSubject extends View {

  componentDidMount(){
    this.init(this.props);
    if(!this.store.content.subView.includes('subject')){
      this.actions.content.setSubView('subjectProjects');
    }
  }

  studentProjectsList(){
    return this.store.subjects.viewingSubject.projects.map((projectId, i)=>{
      var project = this.func.getProjectById(projectId);
      var studentProject = '';
      project.studentProjects.map(studentProjectId=>{
        if(this.store.profiles.viewingProfile.studentProjects.indexOf(''+studentProjectId) > -1){
          studentProject = this.func.getStudentProjectById(studentProjectId);
        }
        return null;
      });
      return(
        <StudentProjectRow
        app={this.app}
        studentProject={studentProject}
        onClick={()=>{
          this.actions.projects.viewProject(project);
          this.actions.studentProjects.viewStudentProject(studentProject);
          this.actions.content.pushView('studentProject'); }}
        byProject={true}
        key={i}/>
      )
    })
  }

  subView(){
    const subView = this.store.content.subView;

    switch (subView) {
      case 'subjectProjects':
        return this.studentProjectsList();
      case 'subjectDetail':
        return <SubjectDetail app={this.app}/>
      default:
        return null;
    }
  }

  studentSubNav(){
    const _options = [
      {
        tag:['Projects','專題研習','专题研习'],
        subView: 'subjectProjects'
      },
      {
        tag:['Detail','詳細資訊','详细资讯'],
        subView: 'subjectDetail'
      }
    ]
    return <SubNav app={this.app} options={_options} />
  }

  render(){
    this.init(this.props);
    const title = this.store.subjects.viewingSubject.title;
    return(
      <div style={this.viewStyle()}>
        {this.tabBar([title, title, title])}
        {this.studentSubNav()}
        {this.sep()}
        {this.subView()}
      </div>
    )
  }

}

export default StudentSubject;

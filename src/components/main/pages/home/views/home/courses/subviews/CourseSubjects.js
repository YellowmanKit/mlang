import React from 'react';
import SubView from 'components/main/pages/home/views/SubView';

import SubjectRow from 'components/main/items/rows/SubjectRow';

class CourseSubjects extends SubView {

  componentDidMount(){
    this.init(this.props);
    this.getCourseSubjects();
  }

  getCourseSubjects(){
    const course = this.store.courses.viewingCourse;

    const subjectsToGet = [];
    const subjectsToShow = course.subjects;
    if(subjectsToShow.length === 0 && this.store.user.type === 'teacher'){
      this.actions.content.pushHint({type:'noSubject'});
    }

    for(var i=0;i<subjectsToShow.length;i++){
      if(this.func.getSubjectById(subjectsToShow[i]) === null){
        subjectsToGet.push(subjectsToShow[i]);
      }
    }
    if(subjectsToGet.length > 0){
      this.actions.subjects.getSubjects(subjectsToGet);
    }
  }

  subjectsList(){
    const subjects = this.store.courses.viewingCourse.subjects;
    return subjects.slice(0).reverse().map((subjectId, i)=>{
      const _subject = this.func.getSubjectById(subjectId)
      return <SubjectRow onClick={()=>{this.actions.subjects.viewSubject(_subject); this.actions.content.pushView('subject');}} app={this.app} subject={_subject} key={i}/>
    })
  }

  render() {
    this.init(this.props);

    return(
      <div style={this.subViewStyle()}>
        <div style={{...this.bs, ...this.ui.styles.list}}>
          {this.subjectsList()}
        </div>
      </div>
    )
  }

}

export default CourseSubjects;

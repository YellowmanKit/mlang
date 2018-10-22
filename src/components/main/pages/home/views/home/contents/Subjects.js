import React from 'react';
import Content from './Content';

import SubjectCell from 'components/main/items/cells/SubjectCell';

class Subjects extends Content {

  componentDidMount(){
    this.init(this.props);
    this.setData();
    if(this.subjectsData.length === 0 && !this.store.switches.hide.subjects){
      this.actions.switches.setHide('subjects', true)
    }
  }

  setData(){
    this.subjects =
    this.store.user.type === 'teacher'? this.store.subjects.teachingSubjects:
    this.store.user.type === 'student'? this.store.subjects.joinedSubjects:
    [];

    this.subjectsData = [];
    for(var i=0;i<this.subjects.length;i++){
      this.subjectsData.push(this.func.getById.subject(this.subjects[i], this.store));
    }
  }

  content = style =>(
    <div style={{...this.ui.styles.areaY,
      ...{ height: style.height, opacity: style.opacity}}}>
      {this.subjectsCells()}
    </div>
  )

  subjectsCells(){
    this.setData();
    const containerStyle = {...this.ui.styles.container, ...{
      width: this.bs.height * 0.25,
      height: this.bs.height * 0.25
    }}

    var subjectsData = this.subjectsData;
    var lastCourse = '';
    for(var i=0;i<subjectsData.length;i++){
      if(subjectsData[i].course !== lastCourse){
        lastCourse = subjectsData[i].course;
        const course = this.func.getById.course(lastCourse, this.store)
        subjectsData.splice(i,0,{isTitle: true, title: course.title});
      }
    }

    return subjectsData.map((subject, i)=>{
      if(subject.isTitle){
        return this.courseTitle(subject.title)
      }
      return(
        <div key={i} style={containerStyle}>
          <SubjectCell app={this.app}
          data={subject}
          onClick={()=>{ this.actions.subjects.viewSubject(subject); this.actions.content.pushView('subject'); }}/>
        </div>
      )
    });
  }

  courseTitle(title){
    const titleStyle = {...this.ui.styles.containerY, ...{
      width: this.bs.height * 0.04,
      height: this.bs.height * 0.25,
      overflow: 'hidden'
    }}
    const textStyle = {
      width: this.bs.height * 0.04,
      color: 'rgba(0,0,0,0.25)',
      fontSize: this.bs.height * 0.025,
      textAlign: 'center',
      textOverflow: 'ellipsis'
    }
    return(
      <div key={title} style={titleStyle}>
        {this.verSep('rgba(0,0,0,0.25)','32.5%')}
          <div style={textStyle}>
            {title}
          </div>
        {this.verSep('rgba(0,0,0,0.25)','32.5%')}
      </div>
    )
  }

  render() {
    this.init(this.props);
    const hide = this.store.switches.hide.subjects;

    const title = ['Unit','單元','单元'];

    const containerStyle = {
      width: '100%',
      height: '',
      background: this.ui.colors.gradientBasic
    }

    return(
      <div style={containerStyle}>
        {this.tabBar(title, hide, ()=>{this.actions.switches.toggleHide('subjects')})}
        {this.animatedContent('subjects', this.content.bind(this), !hide, this.bs.height * 0.77)}
      </div>
    )
  }
}

export default Subjects;

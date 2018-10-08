import React from 'react';
import Content from './Content';

import Cell from 'components/main/items/Cell';

class Subjects extends Content {

  componentDidMount(){
    this.setData();
    if(this.subjectsData.length === 0 && !this.store.content.hide.subjects){
      this.actions.content.setHide('subjects', true)
    }
  }

  setData(){
    this.subjects =
    this.store.user.type === 'teacher'? this.store.subjects.teachingSubjects:
    this.store.user.type === 'student'? this.store.subjects.joinedSubjects:
    [];

    this.subjectsData = [];
    this.subjects.map(id=>{
      return this.subjectsData.push(this.func.getSubjectById(id));
    })
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
        const course = this.func.getCourseById(lastCourse);
        subjectsData.splice(i,0,{isTitle: true, title: course.title});
      }
    }

    return subjectsData.map((subject, i)=>{
      if(subject.isTitle){
        return this.courseTitle(subject.title)
      }
      return(
        <div key={i} style={containerStyle}>
          <Cell app={this.app}
          type={'subject'}
          data={subject}
          onClick={()=>{ this.actions.subjects.viewSubject(subject); this.actions.content.pushView('subject'); }}/>
        </div>
      )
    });
  }

  courseTitle(title){
    const titleStyle = {...this.ui.styles.containerY, ...{
      width: this.bs.height * 0.035,
      height: this.bs.height * 0.25,
      overflow: 'hidden'
    }}
    const textStyle = {
      color: 'rgba(0,0,0,0.25)',
      fontSzie: this.bs.height * 0.1,
      textAlign: 'center'
    }
    return(
      <div style={titleStyle}>
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
    const hide = this.store.content.hide.subjects;

    const title = ['Units','單元','单元'];

    const containerStyle = {
      width: '100%',
      height: '',
      background: this.ui.colors.gradientBasic
    }

    return(
      <div style={containerStyle}>
        {this.tabBar(title, hide, ()=>{this.actions.content.toggleHide('subjects')})}
        {this.animatedContent('subjects', this.content.bind(this), !hide, this.bs.height * 0.77)}
      </div>
    )
  }
}

export default Subjects;

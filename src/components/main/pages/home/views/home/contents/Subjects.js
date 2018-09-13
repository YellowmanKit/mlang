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
    <div style={{...this.ui.styles.area, ...{
      width: '100%',
      flexFlow: 'row wrap',
      alignItems: 'flex-start',
      overflow: 'auto',
      alignContent: 'flex-start'
    }, ...{ height: style.height, opacity: style.opacity}}}>
      {this.subjectsCells()}
    </div>
  )

  subjectsCells(){
    this.setData();
    const containerStyle = {...this.ui.styles.container, ...{
      width: this.bs.height * 0.25,
      height: this.bs.height * 0.25
    }}
    return this.subjectsData.map((subject, i)=>{
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

  render() {
    this.init(this.props);
    const hide = this.store.content.hide.subjects;

    const title = ['Subjects','議題','议题'];

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

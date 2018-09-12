import React from 'react';
import UI from 'components/UI';
import {Motion, spring}  from 'react-motion';

import Cell from 'components/main/items/Cell';

class Subjects extends UI {

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

  subjectsContent(){
    const areaStyle = {...this.ui.styles.area, ...{
      width: '100%',
      flexFlow: 'row wrap',
      alignItems: 'flex-start',
      overflow: 'auto',
      alignContent: 'flex-start'
    }}
    const isOpen = ! this.hide;
    const height = this.bs.height * 0.77;
    return(
      <Motion defaultStyle={{height: !this.ani? (isOpen? height: 0): isOpen? 0: height, opacity: isOpen?0:1.1}}
      style={{height:isOpen? spring(height): spring(0), opacity: isOpen?spring(1.1):spring(0)}}>
        {style=>(
        <div style={{...areaStyle, ...{ height: style.height, opacity: style.opacity}}}>
          {this.subjectsCells()}
        </div>
        )}
      </Motion>
    )
  }

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
    this.hide = this.store.content.hide.subjects;

    const title = ['Subjects','議題','议题'];

    const containerStyle = {
      width: '100%',
      height: '',
      background: this.ui.colors.gradientBasic
    }

    return(
      <div style={containerStyle}>
        {this.tabBar(title, this.hide, ()=>{this.actions.content.toggleHide('subjects')})}
        {this.subjectsContent()}
      </div>
    )
  }
}

export default Subjects;

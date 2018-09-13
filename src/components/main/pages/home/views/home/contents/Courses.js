import React from 'react';
import Content from './Content';

import Cell from 'components/main/items/Cell';

class Courses extends Content {

  componentDidMount(){
    this.setData();
    if(this.coursesData.length === 0 && !this.store.content.hide.courses){
      this.actions.content.setHide('courses', true)
    }
  }

  setData(){
    this.courses =
    this.store.user.type === 'teacher'? this.store.courses.teachingCourses:
    this.store.user.type === 'student'? this.store.courses.joinedCourses:
    [];

    this.coursesData = [];
    this.courses.map(id=>{
      return this.coursesData.push(this.func.getCourseById(id));
    })
  }

  content = style =>(
    <div style={{...this.areaStyle(), ...{ height: style.height, opacity: style.opacity}}}>
      {this.verGap('2%')}
      {this.coursesCells()}
      {this.verGap('5%')}
      {this.buttons.cellAdd(this.onAdd)}
      {this.verGap('5%')}
    </div>
  )

  coursesCells(){
    this.setData();
    return this.coursesData.map((course, i)=>{
      return(
        <Cell key={i} app={this.app}
        type={'course'}
        data={course}
        onClick={()=>{ this.actions.courses.viewCourse(course); this.actions.content.pushView('course'); }}/>
      )
    });
  }

  render() {
    this.init(this.props);
    const hide = this.store.content.hide.courses;

    const type = this.store.user.type;
    const title =
    type === 'teacher'? ['Courses - created','班別 - 已創建','班别 - 已创建']:
    type === 'student'? ['Courses - joined','班別 - 已加入','班别 - 已加入']:
    ['','']

    const containerStyle = {
      width: '100%',
      height:'',
      background: this.ui.colors.gradientBasic
    }

    this.onAdd =
    this.store.user.type === 'teacher'? ()=>{this.actions.content.pushView('addCourse')}:
    this.store.user.type === 'student'? ()=>{this.actions.content.pushView('joinCourse')}:
    ()=>{};

    return(
      <div style={containerStyle}>
        {this.tabBar(title, hide, ()=>{this.actions.content.toggleHide('courses')})}
        {this.animatedContent('courses', this.content.bind(this), !hide, this.bs.height * 0.27)}
      </div>
    )
  }
}

export default Courses;

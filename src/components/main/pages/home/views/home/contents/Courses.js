import React from 'react';
import UI from 'components/UI';
import {Motion, spring}  from 'react-motion';

import Cell from 'components/main/items/Cell';

class Courses extends UI {

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

  coursesContent(){
    const onAdd =
    this.store.user.type === 'teacher'? ()=>{this.actions.content.pushView('addCourse')}:
    this.store.user.type === 'student'? ()=>{this.actions.content.pushView('joinCourse')}:
    [];

    const areaStyle = {...this.ui.styles.area, ...{
      width: '100%',
      alignItems: 'center',
      overflow: 'auto'
    }}
    const isOpen = ! this.hide;
    const height = this.bs.height * 0.27;
    return(
      <Motion defaultStyle={{height: !this.ani? (isOpen? height: 0): isOpen? 0: height, opacity: isOpen?0:1.1}}
      style={{height:isOpen? spring(height): spring(0), opacity: isOpen?spring(1.1):spring(0)}}>
        {style=>(
        <div style={{...areaStyle, ...{ height: style.height, opacity: style.opacity}}}>
          {this.verGap('2%')}
          {this.coursesCells()}
          {this.verGap('5%')}
          {this.buttons.cellAdd(onAdd)}
          {this.verGap('5%')}
        </div>
        )}
      </Motion>
    )
  }

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
    this.hide = this.store.content.hide.courses;

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

    return(
      <div style={containerStyle}>
        {this.tabBar(title, this.hide, ()=>{this.actions.content.toggleHide('courses')})}
        {this.coursesContent()}
      </div>
    )
  }
}

export default Courses;

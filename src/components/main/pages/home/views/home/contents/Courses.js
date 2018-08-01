import React from 'react';
import UI from 'components/UI';
import Cell from 'components/main/items/Cell';

class Courses extends UI {

  courses(){
    const onAdd =
    this.store.user.type === 'teacher'? ()=>{this.actions.content.pushView('addCourse')}:
    this.store.user.type === 'student'? ()=>{this.actions.content.pushView('joinCourse')}:
    [];

    const addBtnText =
    this.store.user.type === 'teacher'? ['ADD','創建']:
    this.store.user.type === 'student'?  ['JOIN','加入']:
    '';

    const areaStyle = {...this.ui.styles.area, ...{
      width: '100%',
      height: this.bs.height * 0.23,
      alignItems: 'center',
      overflow: 'auto'
    }}
    return(
      <div style={areaStyle}>
        {this.buttons.listAdd([this.bs.width * 0.125, '100%'], addBtnText, '110%', onAdd)}
        {this.verGap('2%')}
        {this.coursesCells()}
        {this.verGap('5%')}
      </div>
    )
  }

  coursesCells(){
    const courses =
    this.store.user.type === 'teacher'? this.store.courses.teachingCourses:
    this.store.user.type === 'student'? this.store.courses.joinedCourses:
    [];

    var coursesData = [];
    courses.map(id=>{
      return coursesData.push(this.func.getCourseById(id));
    })
    return coursesData.map((course, i)=>{
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

    const type = this.store.user.type;
    const title =
    type === 'teacher'? ['Courses - created','班別 - 已創建']:
    type === 'student'? ['Courses - joined','班別 - 已加入']:
    ['','']

    const containerStyle = {
      width: '100%',
      height: this.bs.height * 0.28,
      background: this.ui.colors.gradientBasic
    }

    return(
      <div style={containerStyle}>
        {this.tabBar(title)}
        {this.courses()}
      </div>
    )
  }
}

export default Courses;

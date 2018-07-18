import React from 'react';
import UI from 'components/UI';
import Cell from 'components/main/items/Cell';

class Courses extends UI {

  courses(){
    const app = this.props.app;
    const ui = app.store.ui;
    const bs = ui.basicStyle;
    const store = app.store;
    const actions = app.actions;
    const onAdd =
    store.user.type === 'teacher'? ()=>{actions.content.pushView('addCourse')}:
    store.user.type === 'student'? ()=>{actions.content.pushView('joinCourse')}:
    [];

    const areaStyle = Object.assign({},ui.areaStyle, {
      width: '100%',
      height: bs.height * 0.23,
      alignItems: 'center',
      overflow: 'auto'
    });
    return(
      <div style={areaStyle}>
        {this.listAddButton([bs.width * 0.1, '100%'], onAdd)}
        {this.verGap('2%')}
        {this.coursesCells()}
        {this.verGap('5%')}
      </div>
    )
  }

  coursesCells(){
    const app = this.props.app;
    const store = app.store;
    const actions = app.actions;
    const courses =
    store.user.type === 'teacher'? store.courses.teachingCourses:
    store.user.type === 'student'? store.courses.joinedCourses:
    [];

    return courses.map((course, i)=>{
      return(
        <Cell key={i} app={this.props.app}
        type={'courseCell'}
        data={course}
        onCellClick={()=>{ actions.courses.viewCourse(i, course); actions.content.pushView('course'); }}/>
      )
    });
  }

  render() {
    const app = this.props.app;
    const ui = app.store.ui;
    const bs = ui.basicStyle;

    const containerStyle = {
      width: '100%',
      height: bs.height * 0.28,
      background: ui.gradientBasic
    }

    return(
      <div style={containerStyle}>
        {this.tabBar(['Courses','班別'])}
        {this.courses()}
      </div>
    )
  }
}

export default Courses;

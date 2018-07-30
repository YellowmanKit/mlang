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

    const addBtnText =
    store.user.type === 'teacher'? ['ADD','創建']:
    store.user.type === 'student'?  ['JOIN','加入']:
    '';

    const areaStyle = Object.assign({},ui.styles.area, {
      width: '100%',
      height: bs.height * 0.23,
      alignItems: 'center',
      overflow: 'auto'
    });
    return(
      <div style={areaStyle}>
        {this.buttons.listAdd([bs.width * 0.125, '100%'], addBtnText, '110%', onAdd)}
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
        <Cell key={i} app={app}
        type={'course'}
        data={course}
        onClick={()=>{ actions.courses.viewCourse(i, course); actions.content.pushView('course'); }}/>
      )
    });
  }

  render() {
    this.init(this.props);
    const app = this.props.app;
    const ui = app.store.ui;
    const bs = ui.basicStyle;

    const type = app.store.user.type;
    const title =
    type === 'teacher'? ['Course - created','班別 - 已創建']:
    type === 'student'? ['Course - joined','班別 - 已加入']:
    ['','']

    const containerStyle = {
      width: '100%',
      height: bs.height * 0.28,
      background: ui.colors.gradientBasic
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

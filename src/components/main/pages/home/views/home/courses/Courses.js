import React from 'react';
import UI from 'components/UI';
import Cell from 'components/main/items/Cell';

class Courses extends UI {

  courses(){
    const app = this.props.app;
    const ui = app.store.ui;
    const bs = ui.basicStyle;

    const areaStyle = Object.assign({},ui.areaStyle, {
      width: '98%',
      height: bs.height * 0.23,
      alignItems: 'center',
      marginLeft: '2%',
      position: 'relative',
      overflow: 'auto'
    });
    const buttonArea = {
      width: bs.width * 0.2,
      height: bs.height * 0.1,
      display: 'flex',
      alignItems: 'center'
    }
    return(
      <div style={areaStyle}>
        <div style={buttonArea}>{this.addButton(()=>{app.actions.content.pushView('addCourse')})}</div>
        {this.coursesCells()}
      </div>
    )
  }

  coursesCells(){
    const app = this.props.app;
    const store = app.store;
    const courses =
    store.user.type === 'teacher'? store.courses.teachingCourses:
    store.user.type === 'student'? store.profile.joinedCourses:
    [];

    return courses.map((course, i)=>{
      return(
        <Cell key={i} app={this.props.app}
        type={'courseCell'}
        data={course}/>
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
      background: 'linear-gradient(to right, #ededed 0%, #dbdbdb 100%)'
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

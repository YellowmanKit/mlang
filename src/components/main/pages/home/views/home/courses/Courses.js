import React from 'react';
import UI from 'components/UI';
//import Cell from 'components/main/items/Cell';

class Courses extends UI {

  courses(){
    const app = this.props.app;
    const ui = app.store.ui;
    const bs = ui.basicStyle;

    const areaStyle = Object.assign({},ui.areaStyle, {
      width: '98%',
      height: bs.height * 0.22,
      alignItems: 'center',
      marginLeft: '2%',
      position: 'relative'
    });
    return(
      <div style={areaStyle}>
        <div style={ui.sideStyle}>{this.addButton(()=>{app.actions.content.pushView('addCourse')})}</div>
      </div>
    )
  }

  render() {

    const app = this.props.app;
    const ui = app.store.ui;
    const bs = ui.basicStyle;

    const containerStyle = {
      width: '100%',
      height: bs.height * 0.27,
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

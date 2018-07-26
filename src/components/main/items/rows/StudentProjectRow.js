import React from 'react';
import Row from './Row';

import icon_student from 'resources/images/icons/student.png';
import cards from 'resources/images/icons/cards_lightgrey.png';
import star2 from 'resources/images/icons/star2_lightgrey.png';
import alert from 'resources/images/icons/alert_black.png';

class StudentProjectRow extends Row {

  rowInfo(){
    const app = this.props.app;
    const ui = app.store.ui;
    const bs = ui.basicStyle;
    const studentProject = this.props.studentProject;

    const rowStyle = {...ui.styles.area, ...{
      width: '100%',
      height: bs.height * 0.06,
      alignItems: 'center'
    }}
    const iconSize = bs.height * 0.05;
    const textScale = [bs.height * 0.05,''];
    return(
      <div style={rowStyle}>
        {this.icon(cards, [iconSize, iconSize])}
        {this.textDisplay(studentProject.total, textScale, '150%', 'center')}
        {this.verGap('5%')}
        {this.icon(star2, [iconSize, iconSize])}
        {this.textDisplay(studentProject.featured, textScale, '150%', 'center')}
        {this.verGap('5%')}
        {this.icon(alert, [iconSize, iconSize], 0.2)}
        {this.textDisplay(studentProject.alert, textScale, '150%', 'center')}
      </div>
    )
  }

  render(){
    const studentProject = this.props.studentProject;
    if(studentProject === null){
      return null;
    }
    const app = this.props.app;
    const func = app.functions;
    const actions = app.actions;
    const ui = app.store.ui;
    const bs = ui.basicStyle;

    const rowStyle = {...ui.styles.area, ...ui.styles.button, ...{
      flexShrink: 0,
      height: bs.height * 0.15,
      borderBottom: '1px solid ' + ui.colors.darkGrey,
      alignItems: 'center'
    }}
    const profile = func.getStudentProfileByUserId(studentProject.student);
    return(
      <button style={rowStyle} onClick={()=>{actions.studentProjects.viewStudentProject(studentProject); actions.content.pushView('gradingCards');}}>
        {this.verGap('3%')}
        {this.rowIcon(icon_student)}
        {profile && this.rowContent(profile.name, this.rowInfo.bind(this) )}
      </button>
    )
  }
}

export default StudentProjectRow;

import React from 'react';
import Row from './Row';

import icon_student from 'resources/images/icons/student_grey.png';
import cards from 'resources/images/icons/cards_lightgrey.png';
import star2 from 'resources/images/icons/star2_lightgrey.png';
import alert from 'resources/images/icons/alert_black.png';

class StudentProjectRow extends Row {

  componentDidMount(){
    this.getIconUrl(icon_student);
  }

  rowInfo(){
    const studentProject = this.props.studentProject;

    const rowStyle = {...this.ui.styles.area, ...{
      width: '100%',
      height: this.bs.height * 0.06,
      alignItems: 'center'
    }}
    const iconSize = this.bs.height * 0.05;
    const textScale = [this.bs.height * 0.05,''];
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
    this.init(this.props);
    const studentProject = this.props.studentProject;
    if(studentProject === null){
      return null;
    }

    const rowStyle = {...this.ui.styles.area, ...this.ui.styles.button, ...{
      flexShrink: 0,
      height: this.bs.height * 0.15,
      borderBottom: '1px solid ' + this.ui.colors.darkGrey,
      alignItems: 'center'
    }}
    const profile = this.func.getStudentProfileByUserId(studentProject.student);
    return(
      <button style={rowStyle} onClick={()=>{this.actions.studentProjects.viewStudentProject(studentProject); this.actions.content.pushView('gradingCards');}}>
        {this.verGap('3%')}
        {this.rowIcon()}
        {profile && this.rowContent(profile.name, this.rowInfo.bind(this) )}
      </button>
    )
  }
}

export default StudentProjectRow;

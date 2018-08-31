import React from 'react';
import Row from './Row';

import icon_event from 'resources/images/icons/event_grey.png';
import icon_alert2 from 'resources/images/icons/alert2.png';

class ProjectRow extends Row {

  constructor(props){
    super(props);
    this.init(props);
    this.state = {
      filename: this.props.project? this.props.project.icon: null,
      type: 'projectIcon'
    }
  }

  componentWillReceiveProps(newProps){
    this.init(newProps);
    if(newProps.project && !this.state.filename){
      this.setState({
        filename: newProps.project.icon,
        type: 'projectIcon'
      })
    }
    this.checkUrl();
  }

  rowInfo(){
    const project = this.props.project;

    const rowStyle = {...this.ui.styles.area, ...{
      width: '100%',
      height: this.bs.height * 0.06,
      alignItems: 'flex-end'
    }}
    const iconSize = this.bs.height * 0.05;
    return(
      <div style={rowStyle}>
        {this.icon(icon_event, [iconSize, iconSize])}
        {this.verGap('1%')}
        {this.textDisplay(this.func.getDateString(new Date(project.endDate)), ['',''], '150%')}
      </div>
    )
  }

  checkAlertTag(){
    if(this.props.project.teacherAlert && this.store.user.type === 'teacher'){
      return this.alertTag();
    }else if(this.store.user.type === 'student'){
      const studentProject = this.func.getStudentProject(this.store.user._id, this.props.project._id);
      if(studentProject && studentProject.studentAlert){
        return this.alertTag();
      }
    }
    return null;
  }

  alertTag(){
    const style = {
      position: 'absolute',
      top: this.bs.width * 0.005,
      right: this.bs.width * 0.005,
      width: this.bs.width * 0.05,
      height: this.bs.width * 0.05
    }
    return <img style={style} src={icon_alert2} alt=''/>
  }

  render(){
    this.init(this.props);
    if(this.props.project === null){
      return null;
    }

    const rowStyle = {...this.ui.styles.button, ...this.ui.styles.area, ...{
      flexShrink: 0,
      height: this.bs.height * 0.15,
      borderBottom: '1px solid ' + this.ui.colors.darkGrey,
      alignItems: 'center',
      position: 'relative'
    }}

    return(
      <button onClick={this.props.onClick} style={rowStyle}>
        {this.verGap('3%')}
        {this.rowIcon()}
        {this.rowContent(this.props.project.title, this.rowInfo.bind(this))}
        {this.checkAlertTag()}
      </button>
    )
  }
}

export default ProjectRow;

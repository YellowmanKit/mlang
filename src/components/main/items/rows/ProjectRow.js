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
      width: this.bs.height * 0.04,
      height: this.bs.height * 0.04
    }
    return <img style={style} src={icon_alert2} alt=''/>
  }

  render(){
    this.init(this.props);
    if(this.props.project === null){ return null; }
    return this.animatedRow(this.content.bind(this), this.bs.height * 0.15)
  }

  content = (style)=>(
      <button onClick={this.props.onClick} style={{...this.rowStyle(), ...{
        height: style.height,
        opacity: style.opacity
      }}}>
        {this.verGap('3%')}
        {this.rowIcon()}
        {this.rowContent(this.props.project.title, this.rowInfo.bind(this))}
        {this.checkAlertTag()}
      </button>
  )
}

export default ProjectRow;

import React from 'react';
import Row from './Row';

import icon_event from 'resources/images/icons/event_grey.png';

class ProjectRow extends Row {

  constructor(props){
    super(props);
    this.init(props);
    this.state = {
      filename: this.props.project? this.props.project.icon: null,
      type: 'projectIcon'
    }
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

  render(){
    this.init(this.props);
    if(this.props.project === null){
      return null;
    }

    const rowStyle = {...this.ui.styles.button, ...this.ui.styles.area, ...{
      flexShrink: 0,
      height: this.bs.height * 0.15,
      borderBottom: '1px solid ' + this.ui.colors.darkGrey,
      alignItems: 'center'
    }}

    return(
      <button onClick={this.props.onClick} style={rowStyle}>
        {this.verGap('3%')}
        {this.rowIcon()}
        {this.rowContent(this.props.project.title, this.rowInfo.bind(this))}
      </button>
    )
  }
}

export default ProjectRow;

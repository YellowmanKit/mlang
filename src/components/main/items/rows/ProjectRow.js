import React from 'react';
import Row from './Row';

import icon_event from 'resources/images/icons/event_grey.png';

class ProjectRow extends Row {

  rowInfo(){
    const app = this.props.app;
    const ui = app.store.ui;
    const bs = ui.basicStyle;
    const func = app.functions;
    const project = this.props.project;

    const rowStyle = {...ui.styles.area, ...{
      width: '100%',
      height: bs.height * 0.06,
      alignItems: 'flex-end'
    }}
    const iconSize = bs.height * 0.05;
    return(
      <div style={rowStyle}>
        {this.icon(icon_event, [iconSize, iconSize])}
        {this.verGap('1%')}
        {this.textDisplay(func.getDateString(new Date(project.endDate)), ['',''], '125%', '')}
      </div>
    )
  }

  render(){
    if(this.props.project === null){
      return null;
    }
    const app = this.props.app;
    const ui = app.store.ui;
    const bs = ui.basicStyle;
    const func = app.functions;

    const rowStyle = Object.assign({}, ui.styles.button, ui.styles.area, {
      flexShrink: 0,
      height: bs.height * 0.15,
      borderBottom: '1px solid ' + ui.colors.darkGrey,
      alignItems: 'center'
    })

    return(
      <button onClick={this.props.onClick} style={rowStyle}>
        {this.verGap('3%')}
        {this.rowIcon(func.url(this.props.project.icon, 'projectIcon'))}
        {this.rowContent(this.props.project.title, this.rowInfo.bind(this))}
      </button>
    )
  }
}

export default ProjectRow;

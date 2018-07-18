import React from 'react';
import UI from 'components/UI';

import icon_event from 'resources/images/icons/event_grey.png';

class ProjectRow extends UI {

  info(){
    const app = this.props.app;
    const ui = app.store.ui;
    const bs = ui.basicStyle;

    const infoStyle = Object.assign({}, ui.basicStyle, {
      width: '72%',
      height: bs.height * 0.12,
      marginLeft: bs.height * 0.02
    })
    return(
      <div style={infoStyle}>
        {this.projectTitle()}
        {this.infoRow()}
      </div>
    )
  }

  projectTitle(){
    const app = this.props.app;
    const ui = app.store.ui;
    const bs = ui.basicStyle;
    const titleStyle = {
      width: '100%',
      height: bs.height * 0.06,
      fontWeight: 'bold',
      fontSize: '125%',
      textAlign: 'left'
    }
    return <div style={titleStyle}>{this.props.project.title}</div>
  }

  infoRow(){
    const app = this.props.app;
    const ui = app.store.ui;
    const bs = ui.basicStyle;
    const func = app.functions;
    const project = this.props.project;

    const rowStyle = Object.assign({}, ui.areaStyle, {
      width: '100%',
      height: bs.height * 0.06,
      alignItems: 'center'
    })
    const iconSize = bs.height * 0.05;
    return(
      <div style={rowStyle}>
        {this.icon(icon_event, [iconSize, iconSize])}
        {this.verGap('1%')}
        {this.textDisplay(func.getDateString(new Date(project.endDate)), ['',''], '125%', ui.deepDarkGrey)}
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

    const rowStyle = Object.assign({}, ui.buttonStyle, ui.areaStyle, {
      flexShrink: 0,
      height: bs.height * 0.15,
      borderBottom: '1px solid ' + ui.darkGrey,
      alignItems: 'center'
    })

    return(
      <button onClick={this.props._onClick} style={rowStyle}>
        {this.verGap('3%')}
        {this.rowIcon(func.url(this.props.project.icon, 'projectIcon'))}
        {this.info()}
      </button>
    )
  }
}

export default ProjectRow;

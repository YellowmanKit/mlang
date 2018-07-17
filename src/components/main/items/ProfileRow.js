import React from 'react';
import UI from 'components/UI';

class ProfileRow extends UI {

  render(){
    const app = this.props.app;
    const ui = app.store.ui;
    const bs = ui.basicStyle;

    const rowStyle = Object.assign({}, ui.areaStyle, {
      flexShrink: 0,
      height: bs.height * 0.15,
      borderBottom: '1px solid ' + ui.darkGrey
    })

    return(
      <div style={rowStyle}>
      </div>
    )
  }
}

export default ProfileRow;

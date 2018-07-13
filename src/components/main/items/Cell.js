import React, { Component } from 'react';

class Cell extends Component {

  render(){

    const app = this.props.app;
    const ui = app.store.ui;
    const bs = ui.basicStyle;

    const cellStyle = {
      width: bs.width * 0.225,
      height: bs.width * 0.275,

      backgroundColor: ui.darkGrey
    }

    return(
      <div style={cellStyle}>

      </div>
    )
  }

}

export default Cell;

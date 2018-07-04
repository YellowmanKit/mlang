import React, { Component } from 'react';
//import background from 'resources/images/general/background';

class Pages extends Component {

  render() {
    var ui = this.props.store.ui;
    var mainStyle = {
      width: ui.width,
      height: ui.height,
      maxWidth: '760px',
      backgroundColor: 'white'
    }
    return(
      <div style={mainStyle}>

      </div>
    )
  }

}

export default Pages;

import React, { Component } from 'react';
import Pages from './pages/Pages';

class Main extends Component {

  render() {
    var ui = this.props.store.ui;
    var mainStyle = {
      width: ui.width,
      height: ui.height,
      backgroundColor: 'black',
      display: 'flex',
      flexFlow: 'row nowrap',
      justifyContent: 'center'
    }
    return (
      <div style={mainStyle}>
        <Pages
        store={this.props.store}
        actions={this.props.actions}/>
      </div>
    )
  }

}

export default Main;

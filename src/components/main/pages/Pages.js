import React, { Component } from 'react';

//import background2 from 'resources/images/general/background2.png';

import Login from './Login';
import Home from './home/Home';
import Capture from './Capture';

class Pages extends Component {

  page(){
    switch (this.props.app.store.main.status) {
      case 'waitForLogin':
        return <Login app={this.props.app}/>
      case 'getNewAccount':
        return <Login app={this.props.app}/>
      case 'forgotPassword':
        return <Login app={this.props.app}/>
      case 'ready':
        return <Home app={this.props.app}/>
      case 'capture':
        return <Capture app={this.props.app}/>
      default:
        return <div/>
    }
  }

  render() {
    const app = this.props.app;
    const ui = app.store.ui;
    return(
      <div style={ui.basicStyle}>
        {this.page()}
      </div>
    )
  }

}

export default Pages;

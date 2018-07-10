import React, { Component } from 'react';

import background2 from 'resources/images/general/background2.png';

import NavBar from './NavBar';
import Menu from './Menu';

class Home extends Component {

  menu(){
    const app = this.props.app;
    if(app.store.content.menu === 'off'){
      return null;
    }
    return <Menu app={this.props.app}/>
  }

  render() {
    const app = this.props.app;
    const ui = app.store.ui;
    const pageStyle = Object.assign({},ui.basicStyle,{
      justifyContent: 'flex-start',
      backgroundImage: 'url(' + background2 + ')',
      backgroundSize: '100% 100%',
    })
    //const func = app.functions;
    return(
      <div style={pageStyle}>
        {this.menu()}
        <NavBar app={this.props.app}/>
      </div>
    )
  }

}

export default Home;

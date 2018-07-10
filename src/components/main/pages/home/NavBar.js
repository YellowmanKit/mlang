import React, { Component } from 'react';

import topBar from 'resources/images/general/top_bar.png';
import menu from 'resources/images/buttons/buttonIcons/menu.png';
import search from 'resources/images/buttons/buttonIcons/search.png';

class NavBar extends Component {

  navButton(_bg, _onClick){
    const app = this.props.app;
    const ui = app.store.ui;
    const bs = ui.basicStyle;

    const buttonStyle = Object.assign({}, ui.buttonStyle, {
      width: bs.width * 0.1,
      height: bs.width * 0.1,
      margin: bs.width * 0.015,
      backgroundImage: 'url(' + _bg + ')'
    });
    return <button style={buttonStyle} onClick={_onClick}/>
  }

  title(){
    const titleStyle = {
      flexGrow: 5,
    }
    return <div style={titleStyle}></div>
  }

  render() {
    const app = this.props.app;
    const ui = app.store.ui;
    const bs = ui.basicStyle;

    const barStyle = {
      width: '100%',
      height: bs.width * 0.13,
      backgroundImage: 'url(' + topBar + ')',
      backgroundSize: '100% 100%',
      display: 'flex',
      flexFlow: 'row nowrap'
    }
    return(
      <div style={barStyle}>
        {this.navButton(menu, ()=>app.actions.content.toggleMenu())}
        {this.title()}
        {this.navButton(search)}
      </div>
    )
  }

}

export default NavBar;

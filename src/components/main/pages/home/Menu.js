import React, { Component } from 'react';

import menu_bg from 'resources/images/slideMenu/menu_bg.png';

class Menu extends Component {

  info(){
    const store = this.props.app.store;
    const areaStyle = Object.assign({}, areaBaseStyle, {
      backgroundColor: 'transparent',
      marginTop: '3%',
      flexGrow: 6
    });
    return(
      <div style={areaStyle}>
        <div style={{flexGrow: 1,fontSize: '125%', color: 'white'}}>{store.user.id}</div>
        <div style={{flexGrow: 1,fontSize: '100%', color: 'grey'}}>{store.user.type}</div>
      </div>
    )
  }

  option(){
    const areaStyle = Object.assign({}, areaBaseStyle, {
      backgroundColor: 'transparent',
      flexGrow: 95
    });
    return(
      <div style={areaStyle}>
      </div>
    )
  }

  logout(){
    const areaStyle = Object.assign({}, areaBaseStyle, {
      backgroundColor: 'transparent',
      flexGrow: 8
    });
    return <div style={areaStyle}></div>
  }

  backArea(){
    const app = this.props.app;
    const ui = app.store.ui;
    const bs = ui.basicStyle;
    const areaStyle = Object.assign({}, ui.buttonStyle, {
      position: 'absolute',
      right: 0,
      width: bs.width * 0.2,
      height: bs.height
    });
    return <button style={areaStyle} onClick={app.actions.content.toggleMenu}/>
  }

  render() {
    const app = this.props.app;
    const ui = app.store.ui;
    const menuStyle = Object.assign({},ui.basicStyle,{
      position: 'absolute',
      alignItems: 'left',
      justifyContent: 'flex-start',
      backgroundImage: 'url(' + menu_bg + ')',
      backgroundSize: '100% 100%'
    })
    return(
      <div style={menuStyle}>
        {this.backArea()}
        {this.info()}
        <div style={{ flexGrow: 8 }}/>
        {this.option()}
        {this.logout()}
      </div>
    )
  }
}

const areaBaseStyle = {
  width: '75%',
  display: 'flex',
  flexFlow: 'column nowrap',
  alignItems: 'left',
  opacity: 1,
  marginLeft: '3%',
  fontWeight: 'bold'
}

export default Menu;

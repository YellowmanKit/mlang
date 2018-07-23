import React, { Component } from 'react';

import menu_bg from 'resources/images/slideMenu/menu_bg.png';

class Menu extends Component {

  switchView(view){
    const actions = this.props.app.actions;
    actions.content.pushView(view);
    actions.content.toggleMenu();
  }

  info(){
    const app = this.props.app;
    const store = app.store;
    const func = app.functions;
    const areaStyle = Object.assign({}, areaBaseStyle, {
      backgroundColor: 'transparent',
      marginTop: '3%',
      flexGrow: 6
    });
    const type =
    store.user.type === 'student'? func.multiLang('Student','學生'):
    store.user.type === 'teacher'? func.multiLang('Teacher','老師'):
    '';

    return(
      <div style={areaStyle}>
        <div style={{flexGrow: 1,fontSize: '125%', color: 'white'}}>{store.profile.name + ' ( ' + store.user.id + ' )'}</div>
        <div style={{flexGrow: 1,fontSize: '100%', color: 'grey'}}>{type}</div>
      </div>
    )
  }

  optionsList(){
    const app = this.props.app;
    const ui = app.store.ui;
    const areaStyle = Object.assign({}, areaBaseStyle, {
      backgroundColor: 'transparent',
      flexGrow: 95
    });
    const buttonStyle = Object.assign({}, ui.styles.button, listBtnStyle, {
      color: 'white'
    });
    const buttons =
    [
      ['account','Account','帳號資訊'],
      ['profile','Profile','個人檔案'],
      //['setting','Setting','設定'],
      ['credit','Credit','鳴謝']
    ]
    return(
      <div style={areaStyle}>
        <div style={{height: ui.basicStyle.height * 0.03}} />
        {buttons.map((item,i)=>{
          return <button key={i} onClick={()=>this.switchView(item[0])} style={buttonStyle}> {app.functions.multiLang(item[1],item[2])} </button>
        })}
      </div>
    )
  }

  logoutButton(){
    const app = this.props.app;
    const ui = app.store.ui;
    const areaStyle = Object.assign({}, areaBaseStyle, {
      backgroundColor: 'transparent',
      flexGrow: 8,
      justifyContent: 'flex-end'
    });
    const buttonStyle = Object.assign({}, ui.styles.button, listBtnStyle, {
      color: ui.colors.mlangGreen
    });
    return(
      <div style={areaStyle}>
        <button onClick={()=>this.logout()} style={buttonStyle}> {app.functions.multiLang('Logout','登出')} </button>
      </div>
    )
  }

  backArea(){
    const app = this.props.app;
    const ui = app.store.ui;
    const bs = ui.basicStyle;
    const areaStyle = Object.assign({}, ui.styles.button, {
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
        <div style={{ flexGrow: 12 }}/>
        {this.optionsList()}
        {this.logoutButton()}
      </div>
    )
  }

  logout(){
    const actions = this.props.app.actions;
    actions.content.toggleMenu();
    actions.user.logout();
  }
}

const listBtnStyle = {
  fontWeight: 'bold',
  fontSize: '125%',
  textAlign: 'left',
  margin: '3%'
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

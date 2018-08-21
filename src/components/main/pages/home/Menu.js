import React from 'react';
import UI from 'components/UI';

import menu_bg from 'resources/images/slideMenu/menu_bg.png';

class Menu extends UI {

  switchView(view){
    this.actions.content.pushView(view);
    this.actions.content.toggleMenu();
  }

  info(){
    const areaStyle = {...styles.areaBase, ...{
      backgroundColor: 'transparent',
      marginTop: '3%',
      flexGrow: 6
    }}
    const type =
    this.store.user.type === 'student'? this.func.multiLang('Student','學生'):
    this.store.user.type === 'teacher'? this.func.multiLang('Teacher','老師'):
    '';

    return(
      <div style={areaStyle}>
        <div style={{flexGrow: 1,fontSize: '125%', color: 'white'}}>{this.store.profile.name + ' ( ' + this.store.user.id + ' )'}</div>
        <div style={{flexGrow: 1,fontSize: '100%', color: 'grey'}}>{type}</div>
      </div>
    )
  }

  optionsList(){
    const areaStyle = {...styles.areaBase, ...{
      backgroundColor: 'transparent',
      flexGrow: 95
    }}
    const buttonStyle = {...this.ui.styles.button, ...{
      fontWeight: 'bold',
      fontSize: this.bs.width * 0.04,
      textAlign: 'left',
      margin: '3%',
      color: 'white',
      height: this.bs.width * 0.075
    }}
    const buttons =
    [
      ['account','Account','帳號資訊'],
      ['profile','Profile','個人檔案'],
      //['setting','Setting','設定'],
      ['credit','Credit','鳴謝']
    ]
    return(
      <div style={areaStyle}>
        {this.gap(this.bs.width * 0.05)}
          {buttons.map((item,i)=>{
            return <button key={i} onClick={()=>{this.actions.main.setPhoto({url: null, blob: null}); this.switchView(item[0]);}} style={buttonStyle}> {this.func.multiLang(item[1],item[2])} </button>
          })}
      </div>
    )
  }

  logoutButton(){
    const areaStyle = {...styles.areaBase, ...{
      backgroundColor: 'transparent',
      flexGrow: 5,
      justifyContent: 'center'
    }}
    const buttonStyle = {...this.ui.styles.button, ...{
      fontWeight: 'bold',
      fontSize: this.bs.width * 0.05,
      textAlign: 'left',
      color: this.ui.colors.mlangGreen
    }}
    return(
      <div style={areaStyle}>
        <button onClick={()=>this.logout()} style={buttonStyle}> {this.func.multiLang('Logout','登出')} </button>
      </div>
    )
  }

  backArea(){
    const areaStyle = {...this.ui.styles.button, ...{
      position: 'absolute',
      right: 0,
      width: this.bs.width * 0.2,
      height: this.bs.height
    }}
    return <button style={areaStyle} onClick={this.actions.content.toggleMenu}/>
  }

  render() {
    this.init(this.props);
    const menuStyle = {...this.bs, ...{
      position: 'absolute',
      alignItems: 'left',
      justifyContent: 'flex-start',
      backgroundImage: 'url(' + menu_bg + ')',
      backgroundSize: '100% 100%'
    }}
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
    this.actions.content.toggleMenu();
    this.actions.user.logout();
  }
}

const styles = {
  areaBase: {
    width: '75%',
    display: 'flex',
    flexFlow: 'column nowrap',
    alignItems: 'left',
    opacity: 1,
    marginLeft: '2%',
    fontWeight: 'bold'
  }
}



export default Menu;

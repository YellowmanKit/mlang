import React from 'react';
import UI from 'components/UI';

import icon from 'resources/images/icons/mlang_green.png';
import btn_red from 'resources/images/buttons/btn_red.png';
import btn_green from 'resources/images/buttons/btn_green.png';
import btn_yellow from 'resources/images/buttons/btn_yellow.png';

class Login extends UI {

  icon(){
    const iconStyle = {
      width: '50%',
      height: '15%',
      backgroundImage: 'url(' + icon + ')',
      backgroundSize: '100% 100%',
    }
    return <div style={iconStyle}/>
  }

  languageBar(){
    const app = this.props.app;
    const actions = app.actions;
    const lang = app.store.main.language;

    const barStyle = {
      width: '67%',
      height: '5%',
      marginTop: '15%',
      display: 'flex',
      flexFlow: 'row nowrap',
      justifyContent: 'center'
    }
    const buttonStyle = {
      flexGrow: 1,
      border: 'none',
      backgroundColor: 'transparent',
      color: 'grey',
      cursor: 'pointer'
    }
    return(
      <div style={barStyle}>
        <button onClick={()=>actions.main.setLanguage('chinese')} style={Object.assign({}, buttonStyle, {color: lang === 'chinese'? 'white': 'grey'})}>中文</button>
        <button onClick={()=>actions.main.setLanguage('english')} style={Object.assign({}, buttonStyle, {color: lang === 'english'? 'white': 'grey'})}>English</button>
      </div>
    )
  }

  versionCode(){
    const versionStyle = {
      width: '30%',
      height: '4%',
      marginTop: '5%',
      color: 'grey',
      textAlign: 'center',
      fontWeight: 'bold'
    }
    return <div style={versionStyle}>{this.props.app.store.main.version}</div>
  }

  login(){
    const id = document.getElementById('id').value;
    const pw = document.getElementById('pw').value;
    this.props.app.actions.user.login(id, pw);
  }

  render() {
    const app = this.props.app;
    const ui = app.store.ui;
    const actions = app.actions;
    const status = app.store.main.status;

    const pageStyle = Object.assign({}, ui.basicStyle,{ justifyContent: 'center' });
    const loginInfo = JSON.parse(localStorage.getItem('loginInfo'));

    if(status === 'waitForLogin'){
      return(
        <div style={pageStyle}>
          {this.icon()}
          {this.inputField('id','text', ['Enter your identity','登入名稱'], loginInfo !== null? loginInfo.id:'')}
          {this.inputField('pw','password', ['Enter your password','密碼'], loginInfo !== null? loginInfo.pw:'')}
          {this.eventButton(['Login','登入'], btn_green, ()=>this.login() )}
          {this.eventButton(['Get new account','申請帳號'], btn_yellow, ()=>actions.main.setStatus('getNewAccount') )}
          {this.eventButton(['Forget password','忘記密碼'], btn_red, ()=>actions.main.setStatus('forgotPassword') )}
          {this.languageBar()}
          {this.versionCode()}
        </div>)
    }else if(status === 'getNewAccount'){
      return(
        <div style={pageStyle}>
          {this.inputField('email','text', ['Enter your email address','輸入你的電郵地址'], '')}
          {this.eventButton(['Acquire new account','獲得新帳號'], btn_green, ()=>actions.user.getNewAccount(document.getElementById('email').value))}
          {this.eventButton(['Cancel','取消'], btn_red, ()=>actions.main.setStatus('waitForLogin') )}
        </div>)
    }else if(status === 'forgotPassword'){
      return(
        <div style={pageStyle}>
          {this.inputField('email','text', ['Enter your email address','輸入你的電郵地址'], '')}
          {this.eventButton(['Reset password','重設密碼'], btn_green, ()=>actions.user.resetPassword(document.getElementById('email').value))}
          {this.eventButton(['Cancel','取消'], btn_red, ()=>actions.main.setStatus('waitForLogin') )}
        </div>)
    }else{
      return null;
    }
  }

}

export default Login;

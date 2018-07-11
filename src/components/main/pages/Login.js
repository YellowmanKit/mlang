import React, { Component } from 'react';

import icon from 'resources/images/icons/mlang_green.png';
import redButton from 'resources/images/buttons/btn_red.png';
import greenButton from 'resources/images/buttons/btn_green.png';
import yellowButton from 'resources/images/buttons/btn_yellow.png';

class Login extends Component {

  icon(){
    const iconStyle = {
      width: '50%',
      height: '15%',
      backgroundImage: 'url(' + icon + ')',
      backgroundSize: '100% 100%',
    }
    return <div style={iconStyle}/>
  }

  inputField(_id, _type, _placeholder, _value){
    const app = this.props.app;
    const func = app.functions;
    const inputStyle = {
      width: '65%',
      height: '4%',
      fontSize: '100%',
      marginTop: '5%'
    }
    return <input id={_id} type={_type} placeholder={func.multiLang(_placeholder[0],_placeholder[1])} defaultValue={_value} style={inputStyle} />
  }

  button(text, imageUrl, _onClick){
    const app = this.props.app;
    const ui = app.store.ui;
    const func = app.functions;
    const buttonStyle = Object.assign({}, ui.buttonStyle, ui.eventBtnStyle, {
      backgroundImage: 'url(' + imageUrl + ')',
      marginTop: '5%'
    });
    return <button style={buttonStyle}  onClick={_onClick}>{func.multiLang(text[0],text[1])}</button>
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
    const pageStyle = Object.assign({}, ui.basicStyle,{ justifyContent: 'center' });
    const actions = app.actions;
    const loginInfo = JSON.parse(localStorage.getItem('loginInfo'));
    if(app.store.main.status === 'waitForLogin'){
      return(
        <div style={pageStyle}>
          {this.icon()}
          {this.inputField('id','text', ['Enter your name','帳號名稱'], loginInfo !== null? loginInfo.id:'')}
          {this.inputField('pw','password', ['Enter your password','密碼'], loginInfo !== null? loginInfo.pw:'')}
          {this.button(['Login','登入'], greenButton, ()=>this.login() )}
          {this.button(['Get new account','申請帳號'], yellowButton, ()=>actions.main.setStatus('getNewAccount') )}
          {this.button(['Forget password','忘記密碼'], redButton, ()=>actions.main.setStatus('forgotPassword') )}
          {this.languageBar()}
          {this.versionCode()}
        </div>)
    }else if(app.store.main.status === 'getNewAccount'){
      return(
        <div style={pageStyle}>
          {this.icon()}
          {this.inputField('email','text', ['Enter your email address','輸入你的電郵地址'], '')}
          {this.button(['Acquire new account','獲得新帳號'], greenButton, ()=>actions.user.getNewAccount(document.getElementById('email').value))}
          {this.button(['Cancel','取消'], redButton, ()=>actions.main.setStatus('waitForLogin') )}
        </div>)
    }else if(app.store.main.status === 'forgotPassword'){
      return(
        <div style={pageStyle}>
          {this.icon()}
          {this.inputField('email','text', ['Enter your email address','輸入你的電郵地址'], '')}
          {this.button(['Reset password','重設密碼'], greenButton, ()=>actions.user.resetPassword(document.getElementById('email').value))}
          {this.button(['Cancel','取消'], redButton, ()=>actions.main.setStatus('waitForLogin') )}
        </div>)
    }else{
      return null;
    }
  }

}

export default Login;

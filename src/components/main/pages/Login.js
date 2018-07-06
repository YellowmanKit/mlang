import React, { Component } from 'react';

import icon from 'resources/images/icons/mlang_green.png';
//import redButton from 'resources/images/buttons/btn_red.png';
import greenButton from 'resources/images/buttons/btn_green.png';

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

  inputField(_id,_type,_placeholder, _value){
    const inputStyle = {
      width: '65%',
      height: '4%',
      marginBottom: '3%',
      fontSize: '100%'
    }
    return <input id={_id} type={_type} placeholder={_placeholder} defaultValue={_value} style={inputStyle} />
  }

  button(text, imageUrl, _onClick){
    const buttonStyle = {
      width: '67%',
      height: '5%',
      backgroundColor: 'transparent',
      backgroundImage: 'url(' + imageUrl + ')',
      backgroundSize: '100% 100%',
      border: 'none',
      fontWeight: 'bold',
      color: 'white'
    }
    return <button style={buttonStyle}  onClick={_onClick}>{text}</button>

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
    const pageStyle = Object.assign({},ui.basicStyle,{
      justifyContent: 'center'
    })
    const func = app.functions;
    const loginInfo = JSON.parse(localStorage.getItem('loginInfo'));
    return(
      <div style={pageStyle}>
        {this.icon()}
        {this.inputField('id','text', func.multiLang('Enter your name','帳號名稱'), loginInfo !== null? loginInfo.id:'')}
        {this.inputField('pw','password', func.multiLang('Enter your password','密碼'), loginInfo !== null? loginInfo.pw:'')}
        <div style={{height: '2%'}}/>
        {this.button(func.multiLang('Login','登入'), greenButton, ()=>this.login() )}
        {this.versionCode()}
      </div>
    )
  }

}

export default Login;

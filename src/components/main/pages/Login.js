import React from 'react';
import UI from 'components/UI';

import icon from 'resources/images/icons/mlang_green.png';

class Login extends UI {

  constructor(props){
    super(props);
    this.init(this.props);
    this.state = {
      loginInfo: null
    }
    this.getLoginInfo()
  }

  async getLoginInfo(){
    const loginInfo = await this.db.get('loginInfo');
    this.setState({
      loginInfo: loginInfo
    })
  }

  icon(){
    const iconStyle = {
      width: this.bs.width * 0.5,
      height: this.bs.height * 0.15,
      backgroundImage: 'url(' + icon + ')',
      backgroundSize: '100% 100%',
      flexShrink: 0
    }
    return <div style={iconStyle}/>
  }

  languageBar(){
    const lang = this.store.main.language;

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
      cursor: 'pointer',
      fontWeight: 'normal'
    }
    const chineseStyle = {...buttonStyle, ...{color: lang === 'chinese'? 'white': 'grey'}};
    const englishStyle = {...buttonStyle, ...{color: lang === 'english'? 'white': 'grey'}};

    return(
      <div style={barStyle}>
        {this.buttons.button(chineseStyle, ['中文','中文'], '', ()=>this.actions.main.setLanguage('chinese'))}
        {this.buttons.button(englishStyle, ['English','English'], '', ()=>this.actions.main.setLanguage('english'))}
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
    this.init(this.props);
    const status = this.store.main.status;

    const pageStyle = {...this.bs, ...{ justifyContent: 'center' }};
    //const loginInfo = JSON.parse(localStorage.getItem('loginInfo'));
    const loginInfo = this.state.loginInfo;

    if(status === 'waitForLogin'){
      return(
        <div style={pageStyle}>
          {this.icon()}
          {this.inputs.inputField('id','text', ['Enter your identity','登入名稱'], loginInfo? loginInfo.id:'')}
          {this.inputs.inputField('pw','password', ['Enter your password','密碼'], loginInfo? loginInfo.pw:'')}
          {this.buttons.rectGreen(['Login','登入'], ()=>this.login())}
          {this.buttons.rectYellow(['Get new account','申請帳號'], ()=>this.actions.main.setStatus('getNewAccount'))}
          {this.buttons.rectRed(['Forget password','忘記密碼'], ()=>this.actions.main.setStatus('forgotPassword'))}
          {this.languageBar()}
          {this.versionCode()}
        </div>
      )
    }else if(status === 'getNewAccount'){
      return(
        <div style={pageStyle}>
          {this.inputs.inputField('email','text', ['Enter your email address','輸入你的電郵地址'], '')}
          {this.buttons.rectGreen(['Acquire new account','獲得新帳號'], ()=>this.actions.user.getNewAccount(document.getElementById('email').value))}
          {this.buttons.rectRed(['Cancel','取消'], ()=>this.actions.main.setStatus('waitForLogin'))}
        </div>
      )
    }else if(status === 'forgotPassword'){
      return(
        <div style={pageStyle}>
          {this.inputs.inputField('email','text', ['Enter your email address','輸入你的電郵地址'], '')}
          {this.buttons.rectGreen(['Reset password','重設密碼'], ()=>this.actions.user.resetPassword(document.getElementById('email').value))}
          {this.buttons.rectRed(['Cancel','取消'], ()=>this.actions.main.setStatus('waitForLogin') )}
        </div>
      )
    }else{
      return null;
    }
  }

}

export default Login;

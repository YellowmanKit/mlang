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
    this.getLoginInfo();
  }

  async getLoginInfo(){
    const loginInfo = await this.db.get('loginInfo');
    const language = await this.db.get('language');
    this.setState({
      loginInfo: loginInfo
    });
    this.actions.main.setLanguage(language? language: 'chinese');
  }

  icon(){
    const iconStyle = {
      width: this.bs.height * 0.4,
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

    const simplifiedchineseStyle = {...buttonStyle, ...{color: lang === 'simplified_chinese'? 'white': 'grey'}};
    const chineseStyle = {...buttonStyle, ...{color: lang === 'chinese'? 'white': 'grey'}};
    const englishStyle = {...buttonStyle, ...{color: lang === 'english'? 'white': 'grey'}};

    return(
      <div style={barStyle}>
        {this.buttons.button(simplifiedchineseStyle, ['简体中文','简体中文','简体中文'], '', ()=>this.actions.main.setLanguage('simplified_chinese'))}
        {this.buttons.button(chineseStyle, ['繁體中文','繁體中文','繁體中文'], '', ()=>this.actions.main.setLanguage('chinese'))}
        {this.buttons.button(englishStyle, ['English','English','English'], '', ()=>this.actions.main.setLanguage('english'))}
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
    const loginInfo = this.func.isDev()? this.state.loginInfo: null;

    if(status === 'waitForLogin'){
      return(
        <div style={pageStyle}>
          {this.gap('5%')}
          {this.icon()}
          {this.inputs.inputField('id','text', ['Enter your identity','登入名稱','登入名称'], loginInfo? loginInfo.id:'')}
          {this.inputs.inputField('pw','password', ['Enter your password','密碼','密码'], loginInfo? loginInfo.pw:'')}
          {this.buttons.rectGreen(['Login','登入','登入'], ()=>this.login())}
          {this.buttons.rectYellow(['Get new account','申請帳號','申请帐号'], ()=>this.actions.main.setStatus('getNewAccount'))}
          {this.buttons.rectRed(['Forget password','忘記密碼','忘记密码'], ()=>this.actions.main.setStatus('forgotPassword'))}
          {this.languageBar()}
          {this.versionCode()}
          {this.gap('5%')}
        </div>
      )
    }else if(status === 'getNewAccount'){
      return(
        <div style={pageStyle}>
          {this.inputs.inputField('email','text', ['Enter your email address','輸入你的電郵地址','输入你的电邮地址'], '')}
          {this.buttons.rectGreen(['Acquire new account','獲得新帳號','获得新帐号'], ()=>this.actions.user.getNewAccount(document.getElementById('email').value))}
          {this.buttons.rectRed(['Cancel','取消','取消'], ()=>this.actions.main.setStatus('waitForLogin'))}
        </div>
      )
    }else if(status === 'forgotPassword'){
      return(
        <div style={pageStyle}>
          {this.inputs.inputField('email','text', ['Enter your email address','輸入你的電郵地址','输入你的电邮地址'], '')}
          {this.buttons.rectGreen(['Reset password','重設密碼','重设密码'], ()=>this.actions.user.resetPassword(document.getElementById('email').value))}
          {this.buttons.rectRed(['Cancel','取消','取消'], ()=>this.actions.main.setStatus('waitForLogin') )}
        </div>
      )
    }else{
      return null;
    }
  }

}

export default Login;

import React, { Component } from 'react';

import redButton from 'resources/images/buttons/btn_red.png';

class Account extends Component {

  button(text, imageUrl, _onClick){
    const app = this.props.app;
    const ui = app.store.ui;
    const func = app.functions;
    const buttonStyle = Object.assign({}, ui.buttonStyle, ui.eventBtnStyle, {
      backgroundImage: 'url(' + imageUrl + ')'
    });
    return <button style={buttonStyle}  onClick={_onClick}>{func.multiLang(text[0],text[1])}</button>
  }

  subTitle(title){
    const app = this.props.app;
    const ui = app.store.ui;
    const bs = ui.basicStyle;
    const func = app.functions;
    const subTitleStyle = {
      width: bs.width,
      color: ui.mlangGreen,
      fontSize: '125%',
      fontWeight: 'bold',
      textAlign: 'center'
    }
    return <div style={subTitleStyle}>{func.multiLang(title[0], title[1])}</div>
  }

  inputField(_id, _type, _placeholder, _value){
    const inputStyle = {
      width: '50%',
      height: '4%',
      fontSize: '100%',
      margin: '2%'
    }
    return <input id={_id} type={_type} placeholder={_placeholder} defaultValue={_value} style={inputStyle} />
  }

  render() {
    const app = this.props.app;
    const ui = app.store.ui;
    const func = app.functions;
    const viewStyle = Object.assign({}, ui.basicStyle, ui.viewStyle);
    return(
      <div style={viewStyle}>
        {func.gap('4%')}
        {this.subTitle(['Identity','登入名稱'])}
        {func.sep()}
        {this.inputField('id','text','',app.store.user.id)}
        {func.gap('2%')}
        {this.subTitle(['Email address','電郵地址'])}
        {func.sep()}
        {this.inputField('email','text','',app.store.user.email)}
        {func.gap('2%')}
        {this.subTitle(['New password','新密碼'])}
        {func.sep()}
        {this.inputField('newPw','password','','')}
        {func.gap('2%')}
        {this.subTitle(['Confirm new password','確定新密碼'])}
        {func.sep()}
        {this.inputField('confirmPw','password','','')}
        {func.gap('2%')}
        {func.sep()}
        {func.gap('2%')}
        {this.subTitle(['Enter current password for changing','輸入密碼以變更資訊'])}
        {func.sep()}
        {this.inputField('pw','password','','')}
        {func.gap('2%')}
        {func.sep()}
        {func.gap('2%')}
        {this.button(['Confirm change','確定變更'], redButton, ()=>{this.changing()})}
      </div>
    )
  }

  changing(){
    console.log('changeing')
  }

}

export default Account;

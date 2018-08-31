import React from 'react';
import View from 'components/main/pages/home/views/View';

class Account extends View {

  render() {
    this.init(this.props);
    const user = this.store.user;
    const student = this.func.multiLang('Student','學生','学生');
    const teacher = this.func.multiLang('Teacher','老師','老师');
    return(
      <div style={this.viewStyle()}>
        {this.gap('4%')}

        {this.subTitle(['User type','用戶類型','用户类型'])}
        {this.sep()}
        {this.gap('2%')}
        {this.inputs.optionBar('type', ['25%', this.bs.height * 0.04], [student, teacher], user.type === 'student'? student: teacher)}
        {this.gap('2%')}

        {this.subTitle(['Identity','登入名稱','登入名称'])}
        {this.sep()}
        {this.inputs.inputField('id','text','', user.id)}
        {this.gap('2%')}

        {this.subTitle(['Email address','電郵地址','电邮地址'])}
        {this.sep()}
        {this.inputs.inputField('email','text','', user.email)}
        {this.gap('2%')}

        {this.subTitle(['New password','新密碼','新密码'])}
        {this.sep()}
        {this.inputs.inputField('newPw','password',['Leave blank if not changing','不更改密碼時請留空','不更改密码时请留空'],'')}
        {this.gap('2%')}

        {this.subTitle(['Confirm new password','確定新密碼','确定新密码'])}
        {this.sep()}
        {this.inputs.inputField('confirmPw','password',['Leave blank if not changing','不更改密碼時請留空','不更改密码时请留空'],'')}
        {this.gap('4%')}

        {this.subTitle(['Enter current password for any changing','輸入密碼以變更資訊','输入密码以变更资讯'])}
        {this.sep()}
        {this.inputs.inputField('pw','password','','')}
        {this.buttons.rectRed(['Confirm change','確定變更','确定变更'], ()=>{this.changing()})}
      </div>
    )
  }

  changing(){
    const user = this.store.user;

    const selected = document.getElementById('type').selectedIndex;
    const newType =
    selected === 0? 'student':
    selected === 1? 'teacher':
    'student';

    const newId = document.getElementById('id').value;
    const newEmail = document.getElementById('email').value;
    const newPw = document.getElementById('newPw').value;
    const confirmPw = document.getElementById('confirmPw').value;
    const pw = document.getElementById('pw').value;

    //console.log(newId)
    if(newId.length < 6){
      return this.failedMessage(['Failed to change! Identity must be atlease 6 characters long!', '變更失敗! 登入名稱至少須由六個字元組成!', '变更失败! 登入名称至少须由六个字元组成!'])
    }
    if(!newEmail.includes('@')){
      return this.failedMessage(['Failed to change! Invalid email address!', '變更失敗! 電郵地址不正確!', '变更失败! 电邮地址不正确!'])
    }
    if(newPw.length > 0){
      if(newPw !== confirmPw){
        return this.failedMessage(['Failed to change! Confirm password not equal to new password!', '變更失敗! 確定密碼不相符!', '变更失败! 确定密码不相符!'])
      }
      if(newPw.length < 6){
        return this.failedMessage(['Failed to change! Password must be atlease 6 characters long!', '變更失敗! 密碼至少須由六個字元組成!', '变更失败! 密码至少须由六个字元组成!'])
      }
    }
    if(pw !== user.pw){
      return this.failedMessage(['Failed to change! Please enter your password correctly!', '變更失敗! 請輸入正確的密碼!', '变更失败! 请输入正确的密码!'])
    }

    this.actions.user.changeUserInfo({
      _id: user._id,
      type: newType,
      id: newId,
      pw: newPw.length >= 6? newPw: user.pw,
      email: newEmail
    });

  }

}

export default Account;

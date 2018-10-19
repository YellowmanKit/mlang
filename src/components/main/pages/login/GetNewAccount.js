import React from 'react';
import UI from 'components/UI';
import CustomButton from 'components/main/items/ui/CustomButton';


class GetNewAccount extends UI {

  constructor(props){
    super(props);
    this.init(props);
    this.state = {
      codeType: 'course'
    }
  }

  render(){
    this.init(this.props);
    return(
      <div style={this.props.animatedStyle}>
        {this.codeOptions()}
        {this.inputs.inputField('code','text',
        this.state.codeType === 'course'?
        ['Enter class code','輸入班別代碼','输入班别代码']:
        ['Enter school code','輸入學校代碼','输入学校代码'], '')}
        <CustomButton app={this.app} button={this.buttons.rectGreen(['Acquire new account','獲得新帳號','获得新帐号'], ()=>this.actions.user.getNewAccountByCode(document.getElementById('code').value, this.state.codeType))}/>
        <CustomButton app={this.app} button={this.buttons.rectRed(['Cancel','取消','取消'], ()=>this.actions.main.setStatus('waitForLogin'))}/>
      </div>
    )
  }

  codeOptions(){
    const optionsStyle = {...this.bs, ...{
      width: '',
      height: '',
      justifyContent: 'center'
    }}
    return(
      <div style={optionsStyle}>
        {this.checkBox(this.func.multiLang('Get student account by class code','憑班別代碼申請學生帳號','凭班别代码申请学生帐号'), this.state.codeType === 'course', (e)=>{this.setState({ codeType: 'course' })})}
        {this.gap(this.bs.height * 0.015)}
        {this.checkBox(this.func.multiLang('Get teacher account by school code','憑學校代碼申請老師帳號','凭学校代码申请老师帐号'), this.state.codeType === 'school', (e)=>{this.setState({ codeType: 'school' })})}
        {this.gap(this.bs.height * 0.015)}
      </div>
    )
  }

}

export default GetNewAccount;

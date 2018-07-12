import React from 'react';
import UI from 'components/UI';
import redButton from 'resources/images/buttons/btn_red.png';

class Profile extends UI {

  render() {
    const profile = this.props.app.store.profile;
    return(
      <div style={this.viewStyle()}>
        {this.gap('4%')}

        {this.subTitle(['Name','名稱'])}
        {this.sep()}
        {this.inputField('name','text','', profile.name)}
        {this.gap('2%')}

        {this.subTitle(['Total submitted cards','卡片總數'])}
        {this.sep()}
        {this.textDisplay(profile.cardCount)}
        {this.gap('2%')}

        {this.subTitle(['Total featured cards','精選卡片總數'])}
        {this.sep()}
        {this.textDisplay(profile.featuredCount)}
        {this.gap('2%')}

        {this.gap('4%')}

        {this.subTitle(['Enter current password for any changing','輸入密碼以變更資訊'])}
        {this.sep()}
        {this.inputField('pw','password','','')}
        {this.button(['Confirm change','確定變更'], redButton, ()=>{this.changing()})}
      </div>
    )
  }

  changing(){
    const user = this.props.app.store.user;
    const profile = this.props.app.store.profile;
    const func = this.props.app.functions;
    const actions = this.props.app.actions;

    const newName = document.getElementById('name').value;
    const pw = document.getElementById('pw').value;

    actions.modal.message(func.multiLang({eng:'Changing...', chi:'變更中...'}));

    //console.log(newId)
    if(newName.length < 6){
      return this.failedMessage(['Failed to change! Name must be atlease 6 characters long!', '變更失敗! 登入名稱至少須由六個字元組成!'])
    }
    if(pw !== user.pw){
      return this.failedMessage(['Failed to change! Please enter your password correctly!', '變更失敗! 請輸入正確的密碼!'])
    }

    actions.profile.changeProfile({
      _id: profile._id,
      name: newName
    });

  }

}

export default Profile;

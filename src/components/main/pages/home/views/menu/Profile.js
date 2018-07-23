import React from 'react';
import View from 'components/main/pages/home/views/View';

class Profile extends View {

  render() {
    const app = this.props.app;
    const profile = app.store.profile;
    const view = app.store.content.view;
    if(view === 'forceProfile'){
      return(
        <div style={this.viewStyle()}>
          {this.gap('4%')}

          {this.subTitle(['Please enter your name','請輸入你的名稱'])}
          {this.sep()}
          {this.inputs.inputField('name','text','', profile.name)}
          {this.gap('2%')}

          {this.buttons.rectGreen(['Confirm','確定'], ()=>{this.changing()})}
        </div>
      )
    }
    return(
      <div style={this.viewStyle()}>
        {this.gap('4%')}

        {this.subTitle(['Name','名稱'])}
        {this.sep()}
        {this.inputs.inputField('name','text','', profile.name)}
        {this.gap('2%')}

        {this.subTitle(['Total submitted cards','卡片總數'])}
        {this.sep()}
        {this.textDisplay(profile.cardCount, ['50%','6%'], '150%')}
        {this.gap('2%')}

        {this.subTitle(['Total featured cards','精選卡片總數'])}
        {this.sep()}
        {this.textDisplay(profile.featuredCount, ['50%','6%'], '150%')}
        {this.gap('2%')}

        {this.gap('4%')}

        {this.subTitle(['Enter current password for any changing','輸入密碼以變更資訊'])}
        {this.sep()}
        {this.inputs.inputField('pw','password','','')}
        {this.buttons.rectRed(['Confirm change','確定變更'], ()=>{this.changing()})}
      </div>
    )
  }

  changing(){
    const app = this.props.app;
    const profile = app.store.profile;
    const view = app.store.content.view;
    const user = app.store.user;
    const actions = app.actions;

    const newName = document.getElementById('name').value;

    //console.log(newId)
    if(newName === ''){
      return this.failedMessage(['Failed to change! Name is missing!', '變更失敗! 請輸入名稱!'])
    }

    if(view !== 'forceProfile' && document.getElementById('pw').value !== user.pw){
        return this.failedMessage(['Failed to change! Please enter your password correctly!', '變更失敗! 請輸入正確的密碼!'])
    }

    actions.profile.changeProfile({
      _id: profile._id,
      name: newName
    });

  }

}

export default Profile;

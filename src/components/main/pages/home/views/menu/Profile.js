import React from 'react';
import View from 'components/main/pages/home/views/View';
import ImagePicker from 'components/main/items/ImagePicker';

class Profile extends View {

  constructor(props){
    super(props);
    this.init(props);
    this.state = {
      url: null
    }
    this.getIconUrl();
  }

  componentWillReceiveProps(newProps){
    this.init(newProps);
    this.getIconUrl();
  }

  async getIconUrl(){
    if(this.state.url){ return; }
    const url = await this.func.url(this.store.profile.icon, 'profileIcon');
    this.setState({
      url: url
    });
    this.actions.main.setStatus('ready');
  }

  render() {
    this.init(this.props);
    const profile = this.store.profile;
    const view = this.store.content.view;
    if(view === 'forceProfile'){
      return(
        <div style={this.viewStyle()}>
          {this.gap('4%')}

          {this.subTitle(['Icon','照片'])}
          {this.sep()}
          <ImagePicker defaultUrl={this.state.url} app={this.app} />
          {this.sep()}
          {this.gap('2%')}

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

        {this.subTitle(['Icon','照片'])}
        {this.sep()}
        <ImagePicker defaultUrl={this.state.url} app={this.app} />
        {this.sep()}
        {this.gap('2%')}

        {this.subTitle(['Name','名稱'])}
        {this.sep()}
        {this.inputs.inputField('name','text','', profile.name)}
        {this.gap('2%')}

        {this.subTitle(['Total submitted cards','卡片總數'])}
        {this.sep()}
        {this.textDisplay(profile.cardCount, ['50%','6%'], '150%', 'center')}
        {this.gap('2%')}

        {this.subTitle(['Total featured cards','精選卡片總數'])}
        {this.sep()}
        {this.textDisplay(profile.featuredCount, ['50%','6%'], '150%', 'center')}
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
    const profile = this.store.profile;
    const newIconBlob = this.store.main.photoBlob;
    const view = this.store.content.view;
    const user = this.store.user;

    const newName = document.getElementById('name').value;

    //console.log(newId)
    if(!newIconBlob && !profile.icon){
      return this.failedMessage(['Failed to edit! Icon is missing!', '變更失敗! 未有照片!'])
    }
    if(newName === ''){
      return this.failedMessage(['Failed to change! Name is missing!', '變更失敗! 請輸入名稱!'])
    }
    if(view !== 'forceProfile' && document.getElementById('pw').value !== user.pw){
        return this.failedMessage(['Failed to change! Please enter your password correctly!', '變更失敗! 請輸入正確的密碼!'])
    }

    this.actions.profile.changeProfile({
      profile: profile,
      newName: newName,
      newIconBlob: newIconBlob
    });

  }

}

export default Profile;

import React from 'react';
import View from 'components/main/pages/home/views/View';
import ImagePicker from 'components/main/items/ImagePicker';
import CustomButton from 'components/main/items/ui/CustomButton';
import LangEditor from './editLangs/LangEditor';

class AddCard extends View {

  constructor(props){
    super(props);
    this.init(props);
    this.state = {
      url: null
    }
    this.card = this.store.cards.viewingCard;
    this.getIconUrl(props);
  }

  componentWillReceiveProps(newProps){
    this.init(newProps);
    this.card = newProps.app.store.cards.viewingCard;
    this.getIconUrl(newProps);
  }

  async getIconUrl(props){
    if(!this.props.editMode || this.state.url){ return; }
    const url = await this.func.url(this.card.icon, 'cardIcon');
    this.setState({
      url: url
    });
  }

  render() {
    this.init(this.props);
    return(
      <div style={this.viewStyle()}>
        {this.gap('4%')}

        {this.subTitle(['Icon','照片','照片'])}
        {this.sep()}
        <ImagePicker type={'card'} defaultUrl={this.state.url} app={this.app}/>
        {this.sep()}
        {this.gap('2%')}

        {this.subTitle(['Lang rows','語言欄','语言栏'])}
        {this.sep()}
        <LangEditor defaultLangs={this.props.editMode? this.card.langs:null} app={this.app}/>
        {this.sep()}

        <CustomButton app={this.app} button={this.buttons.rectGreen(['Submit','提交','提交'], ()=>{this.addCard()})}/>
        {this.gap('8%')}
      </div>
    )
  }

  addCard(){
    const editMode = this.props.editMode;
    const icon = this.store.main.photoBlob;
    if(!editMode && icon === null){
      return this.failedMessage(['Failed to submit! Icon is missing!', '提交失敗! 未有照片!','提交失败! 未有照片!'])
    }
    const editLangs = this.store.langs.editLangs;
    var usedKeys = [];
    for(var i=0;i<editLangs.length;i++){
      if(usedKeys.includes(editLangs[i].key)){
        return this.failedMessage(['Failed to submit! Lang key duplicated!', '提交失敗! 語言列不能重複!','提交失败! 语言列不能重复!'])
      }
      if(editLangs[i].text === ''){
        return this.failedMessage(['Failed to submit! Lang text missing!', '提交失敗! 語言列缺少文字!','提交失败! 语言列缺少文字!'])
      }
      if(!editLangs[i].defaultAudio && !editLangs[i].audioBlob){
        return this.failedMessage(['Failed to submit! Lang audio missing!', '提交失敗! 語言列缺少錄音!','提交失败! 语言列缺少录音!'])
      }
      usedKeys.splice(0,0,editLangs[i].key)
    }

    if(!editMode){
      this.actions.cards.addCard({
        icon: icon,
        editLangs: editLangs,
        project: this.store.projects.viewingProject,
        studentProject: this.store.studentProjects.viewingStudentProject,
        author: this.store.user._id,
        isTeacher: this.store.user.type === 'teacher'
      });
    }else if(!this.props.resubmit){
      this.actions.cards.editCard({
        card: this.card,
        newIcon: icon,
        editLangs: editLangs
      });
    }else{
      this.actions.cards.addCard({
        resubmit: true,
        icon: this.card.icon,
        newIcon: icon,
        editLangs: editLangs,
        project: this.store.projects.viewingProject,
        studentProject: this.store.studentProjects.viewingStudentProject,
        author: this.store.user._id
      });
    }
  }
}

export default AddCard;

import React from 'react';
import View from 'components/main/pages/home/views/View';
import ImagePicker from 'components/main/items/ImagePicker';

import LangEditor from './editLangs/LangEditor';

class AddCard extends View {

  render() {
    return(
      <div style={this.viewStyle()}>
        {this.gap('4%')}

        {this.subTitle(['Icon','照片'])}
        {this.sep()}
        <ImagePicker app={this.props.app}/>
        {this.sep()}
        {this.gap('2%')}

        {this.subTitle(['Lang rows','語言欄'])}
        {this.sep()}
        <LangEditor app={this.props.app}/>
        {this.sep()}

        {this.buttons.rectGreen(['Submit','提交'], ()=>{this.addCard()})}
        {this.gap('2%')}
      </div>
    )
  }

  addCard(){
    const app = this.props.app;
    const actions = this.props.app.actions;

    const icon = app.store.main.photoBlob;
    if(icon === null){
      return this.failedMessage(['Failed to create! Icon is missing!', '製作失敗! 未有照片!'])
    }
    const editLangs = app.store.langs.editLangs;
    var usedKeys = [];
    for(var i=0;i<editLangs.length;i++){
      if(usedKeys.includes(editLangs[i].key)){
        return this.failedMessage(['Failed to create! Lang key duplicated!', '製作失敗! 語言列不能重複!'])
      }
      if(editLangs[i].text === ''){
        return this.failedMessage(['Failed to create! Lang text missing!', '製作失敗! 語言列缺少文字!'])
      }
      if(editLangs[i].audioBlob === null){
        return this.failedMessage(['Failed to create! Lang audio missing!', '製作失敗! 語言列缺少錄音!'])
      }
      usedKeys.splice(0,0,editLangs[i].key)
    }

    actions.cards.addCard({
      icon: icon,
      editLangs: editLangs,
      project: app.store.projects.viewingProject,
      studentProject: app.store.studentProjects.viewingStudentProject,
      author: app.store.user._id
    });
  }
}

export default AddCard;

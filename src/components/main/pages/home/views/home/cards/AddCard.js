import React from 'react';
import UI from 'components/UI';

import ImagePicker from 'components/main/items/ImagePicker';
import LangEditor from './langs/LangEditor';

import btn_green from 'resources/images/buttons/btn_green.png';

class AddCard extends UI {

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

        {this.eventButton(['Submit','提交'], btn_green, ()=>{this.addCard()})}
        {this.gap('2%')}
      </div>
    )
  }

  addCard(){
    const app = this.props.app;
    //const actions = this.props.app.actions;

    const _icon = app.store.main.photoBlob;
    if(_icon === null){
      return this.failedMessage(['Failed to create! Icon is missing!', '製作失敗! 未有照片!'])
    }

    /*actions.courses.addCourse({
      teacher: app.store.user._id,
      icon: _icon,
      title: _title,
      endDate: _endDate
    });*/
  }
}

export default AddCard;

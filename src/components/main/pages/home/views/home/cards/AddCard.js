import React from 'react';
import View from 'components/main/pages/home/views/View';
import ImagePicker from 'components/main/items/ImagePicker';

import LangEditor from './langs/LangEditor';

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

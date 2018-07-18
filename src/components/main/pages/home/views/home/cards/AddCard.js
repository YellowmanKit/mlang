import React from 'react';
import UI from 'components/UI';

import ImagePicker from 'components/main/items/ImagePicker';

import btn_green from 'resources/images/buttons/btn_green.png';

class AddCard extends UI {

  render() {
    //const app = this.props.app;
    //const func = app.functions;

    return(
      <div style={this.viewStyle()}>
        {this.gap('4%')}

        {this.subTitle(['Icon','照片'])}
        {this.sep()}
        <ImagePicker app={this.props.app} />
        {this.sep()}
        {this.gap('2%')}



        {this.eventButton(['Confirm','確定'], btn_green, ()=>{this.addCard()})}
      </div>
    )
  }

  addCard(){
    const app = this.props.app;
    //const actions = this.props.app.actions;

    const _icon = app.store.main.photoBlob;
    if(_icon === null){
      return this.failedMessage(['Failed to add! Icon is missing!', '創建失敗! 未有照片!'])
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

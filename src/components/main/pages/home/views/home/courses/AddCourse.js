import React from 'react';
import UI from 'components/UI';

import ImagePicker from 'components/main/items/ImagePicker';

import btn_green from 'resources/images/buttons/btn_green.png';

class AddCourse extends UI {

  render() {
    const app = this.props.app;
    const func = app.functions;
    var defaultDate = new Date();
    defaultDate.setFullYear(defaultDate.getFullYear() + 1);

    return(
      <div style={this.viewStyle()}>
        {this.gap('4%')}

        {this.subTitle(['Icon','照片'])}
        {this.sep()}
        <ImagePicker app={this.props.app} />
        {this.sep()}
        {this.gap('2%')}

        {this.subTitle(['Title','班名'])}
        {this.sep()}
        {this.inputField('title','text', '', '')}
        {this.gap('2%')}

        {this.subTitle(['End date','結束日期'])}
        {this.sep()}
        {this.inputField('endDate','date', ['',''], func.getDateString(defaultDate))}
        {this.gap('2%')}

        {this.eventButton(['Confirm','確定'], btn_green, ()=>{this.addCourse()})}
      </div>
    )
  }

  addCourse(){
    const app = this.props.app;
    const actions = this.props.app.actions;

    const _icon = app.store.main.photoBlob;
    const _title = document.getElementById('title').value;
    const _endDate = document.getElementById('endDate').value;

    const today = new Date();
    const selectedEndDate = new Date(_endDate)
    if(_icon === null){
      return this.failedMessage(['Failed to change! Icon is missing!', '變更失敗! 未有照片!'])
    }
    if(_title.length === 0){
      return this.failedMessage(['Failed to change! Title is missing!', '變更失敗! 未填班名!'])
    }
    if(selectedEndDate < today){
      return this.failedMessage(['Failed to change! End date is in the past!', '變更失敗! 結束日期早於現在!'])
    }

    actions.courses.addCourse({
      teacher: app.store.user._id,
      icon: _icon,
      title: _title,
      endDate: _endDate
    });
  }
}

export default AddCourse;

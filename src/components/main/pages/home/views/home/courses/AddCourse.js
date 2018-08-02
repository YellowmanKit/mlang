import React from 'react';
import View from 'components/main/pages/home/views/View';

import ImagePicker from 'components/main/items/ImagePicker';

class AddCourse extends View {

  constructor(props){
    super(props);
    this.init(props);
    this.actions.main.setPhoto(null);

  }

  render() {
    this.init(this.props);
    var defaultDate = new Date();
    defaultDate.setFullYear(defaultDate.getFullYear() + 1);

    return(
      <div style={this.viewStyle()}>
        {this.gap('4%')}

        {this.subTitle(['Icon','照片'])}
        {this.sep()}
        <ImagePicker app={this.app} />
        {this.sep()}
        {this.gap('2%')}

        {this.subTitle(['Title','班名'])}
        {this.sep()}
        {this.inputs.inputField('title','text', '', '')}
        {this.gap('2%')}

        {this.subTitle(['End date','結束日期'])}
        {this.sep()}
        {this.inputs.inputField('endDate','date', ['',''], this.func.getDateString(defaultDate))}
        {this.gap('2%')}

        {this.buttons.rectGreen(['Confirm','確定'], ()=>{this.addCourse()})}
      </div>
    )
  }

  addCourse(){
    const _icon = this.store.main.photoBlob;
    const _title = document.getElementById('title').value;
    const _endDate = document.getElementById('endDate').value;

    const today = new Date();
    const selectedEndDate = new Date(_endDate)
    if(_icon === null){
      return this.failedMessage(['Failed to add! Icon is missing!', '提交失敗! 未有照片!'])
    }
    if(_title.length === 0){
      return this.failedMessage(['Failed to add! Title is missing!', '提交失敗! 未填班名!'])
    }
    if(selectedEndDate < today){
      return this.failedMessage(['Failed to add! End date is in the past!', '提交失敗! 結束日期早於現在!'])
    }

    this.actions.courses.addCourse({
      teacher: this.store.user._id,
      icon: _icon,
      title: _title,
      endDate: _endDate
    });
  }
}

export default AddCourse;

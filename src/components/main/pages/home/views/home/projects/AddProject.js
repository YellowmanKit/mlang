import React from 'react';
import UI from 'components/UI';

import ImagePicker from 'components/main/items/ImagePicker';

import btn_green from 'resources/images/buttons/btn_green.png';

class AddProject extends UI {

  render() {
    const app = this.props.app;
    const func = app.functions;
    var defaultDate = new Date();
    defaultDate.setMonth(defaultDate.getMonth() + 1);

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

        {this.subTitle(['Description','描述'])}
        {this.sep()}
        {this.gap('2%')}
        {this.textArea('desc', ['67%', '15%'], '100%', '')}
        {this.gap('4%')}

        {this.subTitle(['End date','結束日期'])}
        {this.sep()}
        {this.inputField('endDate','date', ['',''], func.getDateString(defaultDate))}
        {this.gap('2%')}

        {this.eventButton(['Confirm','確定'], btn_green, ()=>{this.addProject()})}
      </div>
    )
  }

  addProject(){
    const app = this.props.app;
    const actions = this.props.app.actions;

    const _icon = app.store.main.photoBlob;
    const _title = document.getElementById('title').value;
    const _desc = document.getElementById('desc').value;
    const _endDate = document.getElementById('endDate').value;

    const today = new Date();
    const selectedEndDate = new Date(_endDate)
    if(_icon === null){
      return this.failedMessage(['Failed to add! Icon is missing!', '創建失敗! 未有照片!'])
    }
    if(_title.length === 0){
      return this.failedMessage(['Failed to add! Title is missing!', '創建失敗! 未填班名!'])
    }
    if(selectedEndDate < today){
      return this.failedMessage(['Failed to add! End date is in the past!', '創建失敗! 結束日期早於現在!'])
    }

    actions.projects.addProject({
      course: app.store.courses.viewingCourse._id,
      icon: _icon,
      title: _title,
      description: _desc,
      endDate: _endDate
    });
  }

}

export default AddProject;

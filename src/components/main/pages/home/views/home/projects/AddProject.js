import React from 'react';
import View from 'components/main/pages/home/views/View';
import ImagePicker from 'components/main/items/ImagePicker';

class AddProject extends View {

  render() {
    this.init(this.props);
    var defaultDate = new Date();
    defaultDate.setMonth(defaultDate.getMonth() + 1);

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

        {this.subTitle(['Description','描述'])}
        {this.sep()}
        {this.gap('2%')}
        {this.inputs.textArea('desc', ['67%', '15%'], '100%', '')}
        {this.gap('4%')}

        {this.subTitle(['End date','結束日期'])}
        {this.sep()}
        {this.inputs.inputField('endDate','date', ['',''], this.func.getDateString(defaultDate))}
        {this.gap('2%')}

        {this.buttons.rectGreen(['Confirm','確定'], ()=>{this.addProject()})}
      </div>
    )
  }

  addProject(){
    const _icon = this.store.main.photoBlob;
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

    this.actions.projects.addProject({
      course: this.store.courses.viewingCourse._id,
      icon: _icon,
      title: _title,
      description: _desc,
      endDate: _endDate
    });
  }

}

export default AddProject;

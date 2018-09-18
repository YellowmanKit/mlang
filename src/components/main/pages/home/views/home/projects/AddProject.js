import React from 'react';
import View from 'components/main/pages/home/views/View';
import CustomButton from 'components/main/items/ui/CustomButton';
import ImagePicker from 'components/main/items/ImagePicker';

class AddProject extends View {

  constructor(props){
    super(props);
    this.init(props);
    this.project = this.store.projects.viewingProject;
    this.state = {
      modified: false,
      filename: this.project.icon,
      type: 'projectIcon',
    }
    this.checkUrl();
  }

  render() {
    this.init(this.props);
    var defaultDate = new Date();
    defaultDate.setMonth(defaultDate.getMonth() + 1);

    return(
      <div style={this.viewStyle()}>
        {this.gap('4%')}

        {this.subTitle(['Icon','照片','照片'])}
        {this.sep()}
        <ImagePicker defaultUrl={this.url.url} app={this.app} />
        {this.sep()}
        {this.gap('2%')}

        {this.subTitle(['Title','標題','标题'])}
        {this.sep()}
        {this.inputs.inputField('title','text', '', this.props.editMode? this.project.title:'' , ()=>{ this.setState({modified: true})})}
        {this.gap('2%')}

        {this.subTitle(['Description','描述','描述'])}
        {this.sep()}
        {this.gap('2%')}
        {this.inputs.textArea('desc', '', this.props.editMode? this.project.description:'', ()=>{ this.setState({modified: true})})}
        {this.gap('4%')}

        {this.subTitle(['End date','結束日期','结束日期'])}
        {this.sep()}
        {this.inputs.inputField('endDate','date', ['',''], this.func.getDateString(this.props.editMode? new Date(this.project.endDate):defaultDate) , ()=>{ this.setState({modified: true})})}
        {this.gap('2%')}

        <CustomButton app={this.app} button={this.buttons.rectGreen(['Confirm','確定','确定'], ()=>{this.addProject()})}/>
        {this.gap('8%')}
      </div>
    )
  }

  addProject(){
    const editMode = this.props.editMode;
    const newIconBlob = this.store.main.photoBlob;
    const title = document.getElementById('title').value;
    const description = document.getElementById('desc').value;
    const endDate = document.getElementById('endDate').value;

    //const today = new Date();
    //const selectedEndDate = new Date(endDate)
    if(!editMode && newIconBlob === null){
      return this.failedMessage(['Failed to add! Icon is missing!', '創建失敗! 未有照片!','创建失败! 未有照片!'])
    }
    if(title.length === 0){
      return this.failedMessage(['Failed to add! Title is missing!', '創建失敗! 未填班名!','创建失败! 未填班名!'])
    }
    /*if(selectedEndDate < today){
      return this.failedMessage(['Failed to add! End date is in the past!', '創建失敗! 結束日期早於現在!','创建失败! 结束日期早于现在!'])
    }*/

    if(!editMode){
      this.actions.projects.addProject({
        subject: this.store.subjects.viewingSubject._id,
        icon: newIconBlob,
        title: title,
        description: description,
        endDate: endDate
      });
    }else if(newIconBlob || this.state.modified){
      this.actions.projects.editProject({...this.project, ...{
        newIcon: newIconBlob,
        title: title,
        description: description,
        endDate: endDate
      }})
    }else{
      return this.failedMessage(['Failed to add! Nothing is modified!', '提交失敗!未作出更改!', '提交失败!未作出更改!'])
    }
  }

}

export default AddProject;

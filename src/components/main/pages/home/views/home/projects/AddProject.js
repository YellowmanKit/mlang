import React from 'react';
import View from 'components/main/pages/home/views/View';
import ImagePicker from 'components/main/items/ImagePicker';

class AddProject extends View {

  constructor(props){
    super(props);
    this.init(props);
    this.state = {
      modified: false,
      url: null
    }
    this.project = this.store.projects.viewingProject;
    this.getIconUrl(props);
  }

  componentWillReceiveProps(newProps){
    this.init(newProps);
    this.getIconUrl(newProps);
  }

  async getIconUrl(props){
    if(!this.props.editMode || this.state.url){ return; }
    const url = await this.func.url(this.project.icon, 'projectIcon');
    this.setState({
      url: url
    });
  }

  render() {
    this.init(this.props);
    var defaultDate = new Date();
    defaultDate.setMonth(defaultDate.getMonth() + 1);

    return(
      <div style={this.viewStyle()}>
        {this.gap('4%')}

        {this.subTitle(['Icon','照片'])}
        {this.sep()}
        <ImagePicker defaultUrl={this.state.url} app={this.app} />
        {this.sep()}
        {this.gap('2%')}

        {this.subTitle(['Title','班名'])}
        {this.sep()}
        {this.inputs.inputField('title','text', '', this.props.editMode? this.project.title:'' , ()=>{ this.setState({modified: true})})}
        {this.gap('2%')}

        {this.subTitle(['Description','描述'])}
        {this.sep()}
        {this.gap('2%')}
        {this.inputs.textArea('desc', ['67%', '15%'], '100%', this.props.editMode? this.project.description:'', ()=>{ this.setState({modified: true})})}
        {this.gap('4%')}

        {this.subTitle(['End date','結束日期'])}
        {this.sep()}
        {this.inputs.inputField('endDate','date', ['',''], this.func.getDateString(this.props.editMode? new Date(this.project.endDate):defaultDate) , ()=>{ this.setState({modified: true})})}
        {this.gap('2%')}

        {this.buttons.rectGreen(['Confirm','確定'], ()=>{this.addProject()})}
      </div>
    )
  }

  addProject(){
    const editMode = this.props.editMode;
    const _icon = this.store.main.photoBlob;
    const _title = document.getElementById('title').value;
    const _desc = document.getElementById('desc').value;
    const _endDate = document.getElementById('endDate').value;

    const today = new Date();
    const selectedEndDate = new Date(_endDate)
    if(!editMode && _icon === null){
      return this.failedMessage(['Failed to add! Icon is missing!', '創建失敗! 未有照片!'])
    }
    if(_title.length === 0){
      return this.failedMessage(['Failed to add! Title is missing!', '創建失敗! 未填班名!'])
    }
    if(selectedEndDate < today){
      return this.failedMessage(['Failed to add! End date is in the past!', '創建失敗! 結束日期早於現在!'])
    }

    if(!editMode){
      this.actions.projects.addProject({
        course: this.store.courses.viewingCourse._id,
        icon: _icon,
        title: _title,
        description: _desc,
        endDate: _endDate
      });
    }else if(_icon || this.state.modified){
      this.actions.projects.editProject({...this.project, ...{
        newIcon: _icon,
        title: _title,
        description: _desc,
        endDate: _endDate
      }})
    }else{
      return this.failedMessage(['Failed to add! Nothing is modified!', '提交失敗!未作出更改!'])
    }
  }

}

export default AddProject;

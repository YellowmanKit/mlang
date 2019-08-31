import React from 'react';
import View from 'components/main/pages/home/views/View';

class AddPublish extends View {

  constructor(props){
    super(props);
    this.init(props);
    this.publish = this.store.survey.viewingPublish;
  }

  componentWillReceiveProps(newProps){
    this.init(newProps);
    this.publish = newProps.app.store.survey.viewingPublish;
  }

  render(){
    const editMode = this.props.editMode;
    var defaultDate = new Date();
    defaultDate.setDate(defaultDate.getDate() + 30);
    const questOptions = this.getQuestOptions();
    return(
      <div style={this.viewStyle()}>
        {this.gap('4%')}

        {this.subTitle(['Title','標題','标题'])}
        {this.sep()}
        {this.inputs.inputField('title','text',['Please enter a title','請輸入標題','请输入标题'],
        this.publish.title, (e)=>{ this.onTitleChange(e.target.value); })}
        {this.gap('2%')}

        {this.subTitle(['Questionnaire','問卷','问卷'])}
        {this.sep()}
        {this.gap('2%')}
        {questOptions.length > 0 && this.inputs.optionBar('questionnaire', ['50%', this.bs.height * 0.04], questOptions, questOptions[0])}
        {questOptions.length === 0 && this.detailText(this.func.multiLang('No questionnaire is created yet!','沒有可用的問卷!','没有可用的问卷!'))}

        {this.gap('2%')}

        {this.subTitle(['School Code','學校代碼','学校代码'])}
        {this.sep()}
        {this.inputs.inputField('schoolCode','text',['Please enter school code','請輸入學校代碼','请输入学校代码'], editMode? this.publish.schoolCode:'')}
        {this.gap('2%')}

        {this.subTitle(['End date','結束日期','结束日期'])}
        {this.sep()}
        {this.inputs.inputField('endDate','date', ['',''], this.func.dateString(editMode? new Date(this.publish.endDate):defaultDate) , ()=>{ this.setState({modified: true})})}
        {this.gap('2%')}

        {this.buttons.rectGreen(['Submit','提交','提交'], ()=>{this.addPublish()})}
        {this.gap('8%')}
      </div>
    )
  }

  getQuestOptions(){
    const created = this.store.survey.createdQuestionnaires;
    var options = [];
    for(var i=0;i<created.length;i++){
      const quest = this.func.getById.questionnaire(created[i], this.store);
      options.push(quest.title);
    }
    return options;
  }

  onTitleChange(newTitle){
    var newPublish = {...this.publish, title: newTitle};
    this.actions.survey.viewPublish(newPublish);
  }

  addPublish(){
    const editMode = this.props.editMode;

    const title = document.getElementById('title').value;
    const schoolCode = document.getElementById('schoolCode').value;
    const endDate = document.getElementById('endDate').value;
    const questTitle = document.getElementById('questionnaire').value;
    const quests = this.store.survey.questionnaires;
    var questionnaire;
    for(var i=0;i<quests.length;i++){
      if(quests[i].title === questTitle){ questionnaire = quests[i]; }
    }

    if(!title){
      return this.failedMessage(['Failed to submit! Title is missing!', '提交失敗! 未有標題!','提交失败! 未有标题!'])
    }
    if(!schoolCode){
      return this.failedMessage(['Failed to submit! School code is missing!', '提交失敗! 未有學校代碼!','提交失败! 未有学校代码!'])
    }

    if(!editMode){
      this.actions.survey.addPublish({
        title: title,
        questionnaire: questionnaire,
        schoolCode: schoolCode,
        endDate: endDate,
        author: this.store.user._id
      });
    }else{
      this.actions.survey.editPublish({
        publish: this.publish,
        title: title,
        questionnaire: questionnaire,
        schoolCode: schoolCode,
        endDate: endDate,
        author: this.store.user._id
      });
    }

  }



}

export default AddPublish;

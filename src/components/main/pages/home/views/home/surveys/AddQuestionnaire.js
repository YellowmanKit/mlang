import React from 'react';
import View from 'components/main/pages/home/views/View';
import QuestEditor from './QuestEditor';

class AddQuestionnaire extends View {

  constructor(props){
    super(props);
    this.init(props);
    this.quest = this.store.survey.viewingQuestionnaire;
  }

  componentWillReceiveProps(newProps){
    this.init(newProps);
    this.quest = newProps.app.store.survey.viewingQuestionnaire;
  }

  render(){
    const editMode = this.props.editMode;

    return(
      <div style={this.viewStyle()}>
        {this.gap('4%')}

        {this.subTitle(['Title','標題','标题'])}
        {this.sep()}
        {this.inputs.inputField('title','text',['Please enter a title','請輸入標題','请输入标题'],
        this.quest.title, (e)=>{ this.onTitleChange(e.target.value); })}
        {this.gap('2%')}

        {this.subTitle(['Questions','問題','问题'])}
        {this.sep()}
        <QuestEditor defaultQuestions={editMode? this.quest.questions: null} app={this.app}/>
        {this.sep()}

        {this.buttons.rectGreen(['Submit','提交','提交'], ()=>{this.addQuestionnaire()})}
        {this.gap('8%')}
      </div>
    )
  }

  onTitleChange(newTitle){
    var newQuest = {...this.quest, title: newTitle};
    this.actions.survey.viewQuestionnaire(newQuest);
  }

  addQuestionnaire(){
    const editMode = this.props.editMode;

    if(!this.quest.title){
      return this.failedMessage(['Failed to submit! Title is missing!', '提交失敗! 未有標題!','提交失败! 未有标题!'])
    }
    const editQuestions = this.store.survey.editQuestions;
    if(editQuestions.length < 1){
      return this.failedMessage(['Failed to submit! Question is missing!', '提交失敗! 未有問題!','提交失败! 未有问题!'])
    }

    if(!editMode){
      this.actions.survey.addQuestionnaire({
        title: this.quest.title,
        editQuestions: editQuestions,
        author: this.store.user._id
      });
    }else{
      this.actions.survey.editQuestionnaire({
        questionnaire: this.quest,
        newTitle: this.quest.title,
        newEditQuestions: editQuestions
      });
    }

  }



}

export default AddQuestionnaire;

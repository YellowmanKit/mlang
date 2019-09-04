import React from 'react';
import View from 'components/main/pages/home/views/View';

import OptionSelector from './OptionSelector';

class Questionnaire extends View {

  constructor(props){
    super(props);
    this.init(props);
    this.quest = this.store.survey.viewingQuestionnaire;
    this.publish = this.store.survey.viewingPublish;
    this.submit =
    props.viewMode? this.store.survey.viewingSubmit:
    this.func.getById.submitByPublish(this.publish._id, this.store);

    this.state = {
      answers: this.submit? this.getRawAnswers(): {}
    }
  }

  getRawAnswers(){
    const answersId = this.submit.answers;
    var rawAnswers = {};
    for(var i=0;i<answersId.length;i++){
      const answer = this.func.getById.answer(answersId[i], this.store);
      rawAnswers[answer.question] = { answer: answer._id, value: answer.value };
    }
    //console.log(rawAnswers);
    return rawAnswers;
  }

  question(questionId, index){
    const style = {...this.ui.styles.containerY, ...{
      width: this.bs.width,
      height: '',
      flexShrink: 0
    }}
    const question = this.func.getById.question(questionId, this.store);
    const viewMode = this.props.viewMode;
    return(
      <div style={style} key={questionId}>
        {this.subTitle(['Question ' + (index + 1),'問題 ' + (index + 1),'问题 ' + (index + 1)])}
        {this.sep()}
        {this.textDisplay(question.title, [this.bs.width * 0.85, ''], '', 'center')}
        {this.gap(this.bs.height * 0.01)}

        {question.type === 'text' && !viewMode &&
        this.inputs.textArea(questionId, ['Please enter your answer','請輸入答案','请输入答案'],
        this.state.answers[questionId]? this.state.answers[questionId].value:'',
        (e)=>{this.onAnswer(e.target.value, questionId)}, [this.bs.width * 0.85, this.bs.height * 0.125])}

        {question.type === 'text' && viewMode &&
        this.detailText(this.state.answers[questionId]? this.state.answers[questionId].value:'')}

        {question.type === 'option' &&
        <OptionSelector app={this.app} options={question.options} qid={question._id}
        onSelect={this.onAnswer.bind(this)}
        selected={this.state.answers[question._id]?this.state.answers[question._id].value:''}
        disabled={viewMode}/>}
        {this.gap(this.bs.height * 0.05)}
      </div>
    )

  }

  onAnswer(answer, qid){
    var newAnswer = this.state.answers;
    newAnswer[qid] = {...newAnswer[qid], ...{ value: answer }};
    this.setState({ answers: newAnswer })
  }

  render(){
    this.init(this.props);
    return(
      <div style={this.viewStyle()}>
      {this.gap('4%')}

      {this.subTitle(['Title','標題','标题'])}
      {this.sep()}
      {this.detailText(this.quest.title)}
      {this.gap('4%')}

      {this.quest.questions.map((questionId,i)=>{ return this.question(questionId, i); })}

      {!this.props.viewMode && this.store.user.type === 'student' && this.buttons.rectGreen(
        this.submit? ['Resubmit','重新提交','重新提交']:['Submit','提交','提交']
        , ()=>{this.submitQuestionnaire()})}
      {this.gap('8%')}
      </div>
    )
  }

  submitQuestionnaire(){
    const answers = this.state.answers;
    var answerCount = 0;
    for(var key in answers){ if(answers[key]){ answerCount++; } }
    if(answerCount < this.quest.questions.length){
      return this.failedMessage(['Failed to submit! Not all questions are answered!!', '提交失敗! 仍有問題未作答!','提交失败! 仍有问题未作答!']);
    }
    if(this.submit){
      this.actions.survey.editSubmit({
        answers: answers,
        submit: this.submit._id,
        publish: this.publish._id,
        questionnaire: this.quest._id,
        submittedBy: this.store.user._id
      });
    }else{
      this.actions.survey.addSubmit({
        answers: answers,
        publish: this.publish._id,
        questionnaire: this.quest._id,
        submittedBy: this.store.user._id
      });
    }
  }

}

export default Questionnaire;

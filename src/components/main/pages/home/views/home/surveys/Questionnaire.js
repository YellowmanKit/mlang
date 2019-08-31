import React from 'react';
import View from 'components/main/pages/home/views/View';

import OptionSelector from './OptionSelector';

class Questionnaire extends View {

  constructor(props){
    super(props);
    this.init(props);
    this.quest = this.store.survey.viewingQuestionnaire;
    this.state = {
      selected: {}
    }
  }

  question(questionId, index){
    const style = {...this.ui.styles.containerY, ...{
      width: this.bs.width,
      height: '',
      flexShrink: 0
    }}
    const question = this.func.getById.question(questionId, this.store);
    return(
      <div style={style} key={questionId}>
        {this.subTitle(['Question ' + (index + 1),'問題 ' + (index + 1),'问题 ' + (index + 1)])}
        {this.sep()}
        {this.textDisplay(question.title, [this.bs.width * 0.85, ''], '', 'center')}
        {question.type === 'text' &&
        this.inputs.textArea(questionId, ['Please enter your answer','請輸入答案','请输入答案'], '',
        ()=>{}
        , [this.bs.width * 0.85, this.bs.height * 0.125])}
        {question.type === 'option' &&
        <OptionSelector app={this.app} options={question.options} qid={question._id}
        onSelect={this.onSelect.bind(this)}
        selected={this.state.selected[question._id]}/>}
        {this.gap(this.bs.height * 0.05)}
      </div>
    )

  }

  onSelect(selected, qid){
    var newSelected = this.state.selected;
    newSelected[qid] = selected;
    this.setState({ selected: newSelected })
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

      {this.gap('4%')}
      </div>
    )
  }

}

export default Questionnaire;

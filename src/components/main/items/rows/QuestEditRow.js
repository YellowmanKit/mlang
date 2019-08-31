import React from 'react';
import Row from './Row';
import Options from 'components/main/items/ui/Options';

import icon_cross from 'resources/images/buttons/buttonIcons/cross_grey.png';

class QuestEditRow extends Row {

  constructor(props){
    super(props);
    this.init(props);
    this.state = {
      fontSize: this.bs.height * 0.02
    }
  }

  content = (style)=>(
    <div key={this.props.editQuestion.key} style={{...this.bs, ...{
      width: this.bs.width * 0.9,
      height: style.height,
      opacity: style.opacity,
      backgroundColor: 'white',
      borderBottom: '5px solid ' + this.ui.colors.ultraLightGrey,
      flexShrink: 0
    }}}>
      {this.questBar(this.props.index, this.props.editQuestion)}
      {this.gap('1%')}
      {this.answerArea(this.props.editQuestion.type)}
    </div>
  )

  answerArea(type){
    const style = {...this.ui.styles.area, ...{
      width: this.bs.width * 0.9,
      height: this.bs.height * 0.12,
      justifyContent: 'center'
    }}
    const editQuestion = this.props.editQuestion;
    const scale = [this.bs.width * 0.85, this.bs.height * 0.1];
    return(
      <div style={style}>
        {type === 'text' && this.inputs.textArea('text', '', '', ()=>{}, scale, this.state.fontSize, true)}
        {type === 'option' && <Options app={this.app} index={this.props.index}
        options={editQuestion.options} onChange={(newOptions)=>{ this.onOptionsChange(newOptions); }}/>}
      </div>
    )
  }

  onOptionsChange(newOptions){
    this.actions.survey.setEditQuestion({index: this.props.index, editQuestion: {...this.props.editQuestion, ...{ options: newOptions }}})
  }

  questBar(i, lang){
    const barStyle = {...this.ui.styles.area, ...{
      width: this.bs.width * 0.9,
      height: this.bs.height * 0.065,
      alignItems: 'center'
    }}
    const editQuestion = this.props.editQuestion;
    return(
      <div style={barStyle}>
        {this.textDisplay('Q.'+ (this.props.index + 1), ['', ''], this.state.fontSize)}
        {this.filler()}
        {this.inputs.textArea('title',['Enter your question','輸入你的問題','输入你的问题'],
        editQuestion.title? editQuestion.title:'',
        (e)=>{ this.onQuestionChange(i, e.target.value)}, [this.bs.width * 0.7, this.bs.height * 0.04])}
        {this.filler()}
        {this.buttons.langBar(icon_cross, 0.1, [this.bs.height * 0.04, this.bs.height * 0.04],
          ()=>{this.actions.survey.killEditQuestionsItem(i)})}
        {this.verGap('1%')}
      </div>
    )
  }

  onQuestionChange(index, value){
    var editQuestion = this.props.editQuestion;
    editQuestion.title = value;
    this.actions.survey.setEditQuestion({index: index, editQuestion: editQuestion})
  }

  render() {
    this.init(this.props);
    return this.animatedRow(
      this.content.bind(this),
      this.bs.height * 0.185,
      this.props.editQuestion.killed? ()=>{this.actions.survey.removeEditQuestionsItem(this.props.index)}: null)
  }

}

export default QuestEditRow;

import React from 'react';
import UI from 'components/UI';

import QuestEditRow from 'components/main/items/rows/QuestEditRow';

class QuestEditor extends UI {

  componentDidMount(){
    this.init(this.props);
    this.editQuestions = this.store.survey.editQuestions;
    this.initRow();
  }

  initRow(){
    const defaultQuestions = this.props.defaultQuestions;

    if(defaultQuestions){
      for(var i=0;i<defaultQuestions.length;i++){
        const defaultQuestion = this.func.getById.question(defaultQuestions[i], this.store);
        var newEditQuestion = {
          _id: defaultQuestion._id,
          key: this.key(),
          title: defaultQuestion.title,
          type: defaultQuestion.type,
          options: this.setOptions(defaultQuestion.options)
        }
        this.actions.survey.pushEditQuestions(newEditQuestion);
      }
    }
  }

  setOptions(options){
    var returnOptions = [];
    for(var i=0;i<options.length;i++){ returnOptions.push({name: options[i], key: this.key()}) }
    return returnOptions;
  }

  pushNewRow(type){
    var newEditQuestion = {
      key: this.key(),
      type: type,
      options: [{ key: this.key(), name: '' }, { key: this.key(), name: '' }]
    }
    this.actions.survey.pushEditQuestions(newEditQuestion);
    this.actions.switches.setAnimation('row', true);
  }

  questEditRows(){
    return this.editQuestions.map((editQuestion,i)=>{
      return(
        <QuestEditRow app={this.app}
        editMode={this.props.editMode}
        key={editQuestion.key}
        index={i}
        editQuestion={editQuestion}/>
      )
    })
  }

  addButtons(){
    const style = {...this.ui.styles.area, ...{
      width: this.bs.width * 0.95,
      height: this.bs.height * 0.075,
      justifyContent: 'space-evenly'
    }}
    const scale = [this.bs.width * 0.44, this.bs.height * 0.075];
    return(
      <div style={style}>
        {this.buttons.listAdd(scale, ['ADD OPTIONAL QUESTIONS','增加選項問題','增加选项问题'], this.bs.height * 0.035,
        ()=>{this.pushNewRow('option')})}
        {this.buttons.listAdd(scale, ['ADD TEXT QUESTIONS','增加文字問題','增加文字问题'], this.bs.height * 0.035,
        ()=>{this.pushNewRow('text')})}
      </div>
    )
  }

  render(){
    this.init(this.props);
    this.editQuestions = this.store.survey.editQuestions;
    const editorStyle = {...this.bs, ...this.ui.styles.list, ...{
      width: this.bs.width * 1,
      height: '',
      flexShrink: 0,
      backgroundColor: this.ui.colors.ultraLightGrey
    }}
    return(
      <div style={editorStyle}>
        {this.questEditRows()}
        {this.addButtons()}
      </div>
    )
  }

}

export default QuestEditor;

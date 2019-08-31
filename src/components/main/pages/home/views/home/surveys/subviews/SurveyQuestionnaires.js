import React from 'react';
import SubView from 'components/main/pages/home/views/SubView';
import Questionnaires from 'components/main/pages/home/views/home/contents/Questionnaires';

class SurveyQuestionnaires extends SubView {

  onAdd(){ return this.buttons.cellAdd(()=>{
    this.actions.survey.viewQuestionnaire({});
    this.actions.survey.setEditQuestions([]);
    this.actions.content.pushView('addQuestionnaire');
  })}

  render(){
    this.init(this.props);
    return(
      <div style={this.subViewStyle()}>
        <Questionnaires
        app={this.app}
        data={this.func.getById.itemsByItemsId(this.store.survey.questionnaires, this.store.survey.createdQuestionnaires)}
        onAdd={this.onAdd.bind(this)}/>
      </div>
    )
  }

}

export default SurveyQuestionnaires;

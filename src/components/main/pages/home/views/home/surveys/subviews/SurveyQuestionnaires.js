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
    const userType = this.store.user.type;
    const data = this.getData(userType);
    return(
      <div style={this.subViewStyle()}>
        <Questionnaires
        app={this.app}
        data={data.questionnaires}
        publishes={data.publishes? data.publishes: null}
        onAdd={userType === 'developer'? this.onAdd.bind(this): null}/>
      </div>
    )
  }

  getData(userType){
    var questionnaires = [];
    if(userType === 'developer'){
      questionnaires = this.func.getById.itemsByItemsId(this.store.survey.questionnaires, this.store.survey.createdQuestionnaires);
      return { questionnaires };
    }else if(userType === 'student'){
      const assignedPublishes = this.store.survey.assignedPublishes;
      var publishes = [];
      for(var i=0;i<assignedPublishes.length;i++){
        const publish = this.func.getById.publish(assignedPublishes[i], this.store);
        const assignedQuestionnaire = this.func.getById.itemsByItemsId(this.store.survey.questionnaires, publish.questionnaire);

        questionnaires = [...questionnaires, ...assignedQuestionnaire];
        publishes = [...publishes, publish];
      }
      return { questionnaires, publishes };
    }
  }

}

export default SurveyQuestionnaires;

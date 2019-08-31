import React from 'react';
import SubView from 'components/main/pages/home/views/SubView';
import Publishes from 'components/main/pages/home/views/home/contents/Publishes';

class SurveyPublishes extends SubView {

  onAdd(){ return this.buttons.cellAdd(()=>{
    this.actions.survey.viewPublish({});
    this.actions.content.pushView('addPublish');
  })}

  render() {
    this.init(this.props);
    return(
      <div style={this.subViewStyle()}>
        <Publishes
        app={this.app}
        data={this.func.getById.itemsByItemsId(this.store.survey.publishes, this.store.survey.createdPublishes)}
        onAdd={this.onAdd.bind(this)}/>
      </div>
    )
  }


}

export default SurveyPublishes;

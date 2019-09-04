import React from 'react';
import SubView from 'components/main/pages/home/views/SubView';
import SubmitRow from 'components/main/items/rows/SubmitRow';

class PublishSubmitted extends SubView {

  constructor(props){
    super(props);
    this.init(props);
    this.publish = this.store.survey.viewingPublish;
    this.state = {
      submits: []
    }
  }

  componentDidMount(){
    this.init(this.props);
    this.initPublishSubmitted();
    this.setListScroll('publishSubmittedList');
  }

  componentWillReceiveProps(newProps){
    this.init(newProps);
    this.initPublishSubmitted();
  }

  initPublishSubmitted(){
    const submitsId = this.publish.submits;
    var submits = [];
    for(var i=0;i<submitsId.length;i++){
      const submit = this.func.getById.submit(submitsId[i], this.store);
      if(submit){ submits = [...submits, submit]; }
    }
    if(this.state.submits.length === 0){
      if(submits.length === submitsId.length){ this.setState({ submits: submits })}
      else{ this.actions.survey.getPublishSubmittedData(this.publish); }
    }
  }

  publishSubmittedList(){
    return this.state.submits.map((submit, i)=>{
      return(
      <SubmitRow
      app={this.app} submit={submit} key={submit._id}
      onClick={()=>{
        this.actions.survey.viewQuestionnaire(this.func.getById.questionnaire(submit.questionnaire, this.store));
        this.actions.survey.viewSubmit(submit);
        this.actions.content.pushView('viewSubmit'); }}/>)
    });
  }

  render() {
    this.init(this.props);
    return(
      <div style={this.subViewStyle()}>
        <div id={'publishSubmittedList'} onScroll={()=>{ this.onScroll('publishSubmittedList'); }} style={{...this.bs, ...this.ui.styles.list}}>
          {this.publishSubmittedList()}
        </div>
      </div>
    )
  }

}

export default PublishSubmitted;

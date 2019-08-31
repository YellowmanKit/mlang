import React from 'react';
import View from 'components/main/pages/home/views/View';

import SubNav from 'components/main/items/SubNav';
import SurveyQuestionnaires from './subviews/SurveyQuestionnaires';
import SurveyPublishes from './subviews/SurveyPublishes';


class Survey extends View {

  componentDidMount(){
    this.init(this.props);
    if(!this.store.content.subView.includes('survey')){
      this.actions.content.setSubView('surveyQuestionaire');
    }
  }

  subView(subView, animatedStyle){
    const app = {...this.app, ...{ animatedStyle: animatedStyle}}

    switch (subView) {
      case 'surveyQuestionaire':
        return <SurveyQuestionnaires app={app}/>;
      case 'surveyPublish':
        return <SurveyPublishes app={app}/>;
      default:
        return null;
    }
  }

  surveySubNav(){
    const options = [
      {
        tag:['Questionaire','問卷','問卷'],
        subView: 'surveyQuestionaire'
      }
    ]
    if(this.store.user.type === 'developer'){
      options.splice(1,0,
      {
        tag:['Publish','發佈','发布'],
        subView: 'surveyPublish'
      })
    }
    return <SubNav app={this.app} options={options} />
  }

  render(){
    this.init(this.props);
    const deadView = this.state.deadView;
    const view = this.state.view;
    return(
      <div style={this.viewStyle()}>
        {this.tabBar(['Survey', '問卷調查', '问卷调查'])}
        {this.surveySubNav()}
        {this.sep()}
        {this.animatedSubView(this.subView.bind(this), deadView? deadView: view, deadView? false: true)}
      </div>
    )
  }

}

export default Survey;

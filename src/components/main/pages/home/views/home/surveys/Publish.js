import React from 'react';
import View from 'components/main/pages/home/views/View';

import SubNav from 'components/main/items/SubNav';
import PublishDetail from './subviews/PublishDetail';
import PublishSubmitted from './subviews/PublishSubmitted';
import PublishStatistics from './subviews/PublishStatistics';


class Publish extends View {

  componentDidMount(){
    this.init(this.props);
    if(!this.store.content.subView.includes('publish')){
      this.actions.content.setSubView('publishDetail');
    }
  }

  subView(subView, animatedStyle){
    const app = {...this.app, ...{ animatedStyle: animatedStyle}}

    switch (subView) {
      case 'publishDetail':
        return <PublishDetail app={app}/>;
      case 'publishSubmitted':
        return <PublishSubmitted app={app}/>;
      case 'publishStatistics':
        return <PublishStatistics app={app}/>;
      default:
        return null;
    }
  }

  surveySubNav(){
    const options = [
      {
        tag:['Detail','詳細資訊','详细资讯'],
        subView: 'publishDetail'
      },
      {
        tag:['Submitted','已提交','已提交'],
        subView: 'publishSubmitted'
      },
      {
        tag:['Statistics','統計','统计'],
        subView: 'publishStatistics'
      }
    ]
    return <SubNav app={this.app} options={options} />
  }

  render(){
    this.init(this.props);
    const publish = this.store.survey.viewingPublish;

    const deadView = this.state.deadView;
    const view = this.state.view;
    return(
      <div style={this.viewStyle()}>
        {this.tabBar([publish.title, publish.title, publish.title])}
        {this.surveySubNav()}
        {this.sep()}
        {this.animatedSubView(this.subView.bind(this), deadView? deadView: view, deadView? false: true)}
      </div>
    )
  }

}

export default Publish;

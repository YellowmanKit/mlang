import React from 'react';
import View from 'components/main/pages/home/views/View';

import SubNav from 'components/main/items/SubNav';
import SubjectDetail from './subviews/SubjectDetail';
import SubjectProjects from './subviews/SubjectProjects';

class Subject extends View {

  constructor(props){
    super(props);
    this.init(this.props);
    this.subject = this.store.subjects.viewingSubject;
  }

  componentWillReceiveProps(newProps){
    this.init(newProps);
    this.subject = this.store.subjects.viewingSubject;
  }

  componentDidMount(){
    this.init(this.props);
    if(!this.store.content.subView.includes('subject')){
      this.actions.content.setSubView('subjectProjects');
    }
    if(this.store.user.type === 'student'){

    }
  }

  subView(){
    const subView = this.store.content.subView;

    switch (subView) {
      case 'subjectProjects':
        return <SubjectProjects app={this.app}/>
      case 'subjectDetail':
        return <SubjectDetail app={this.app}/>
      default:
        return null;
    }
  }

  subjectSubNav(){
    const _options = [
      {
        tag:['Project','專題研習','专题研习'],
        subView: 'subjectProjects'
      },
      {
        tag:['Detail','詳細資訊','详细资讯'],
        subView: 'subjectDetail'
      }
    ]
    return <SubNav app={this.app} options={_options} />
  }

  render(){
    this.init(this.props);
    return(
      <div style={this.viewStyle()}>
        {this.tabBar([this.subject.title, this.subject.title, this.subject.title])}
        {this.subjectSubNav()}
        {this.sep()}
        {this.subView()}
      </div>
    )
  }

}

export default Subject;

import React from 'react';
import SubView from 'components/main/pages/home/views/SubView';
import BarChart from 'components/main/items/graph/BarChart';

class PublishStatistics extends SubView {

  componentWillReceiveProps(newProps){
    if(!this.stat){ this.stat = this.store.content.statistics[this.store.survey.viewingPublish._id]; }
  }

  componentDidMount(){ this.getPublishStatistic(); }

  getPublishStatistic(){
    if(!this.stat){ this.actions.survey.getPublishStatistics(this.store.survey.viewingPublish._id); }
  }

  statTextDisplay(text){ return this.textDisplay(text, ['95%',''], '100%', 'center'); }

  questionAnswerStat(question, index){
    if(question.type === 'text'){ return null; }

    const style = {...this.ui.styles.areaY, ...{
      width: this.bs.width,
      height: '',
      justifyContent: 'center',
      flexShrink: 0
    }}
    const title = 'Q.' + (index + 1)
    return (
      <div style={style} key={question._id}>
        {this.subTitle([title,title,title])}
        {this.sep()}
        {this.statTextDisplay(question.title)}

        {this.answerStat(question)}

        {this.gap(this.bs.height * 0.04)}
      </div>
    )
  }

  answerStat(question){
    if(question.type === 'option'){
      const data = this.stat.answerOptionGraphData[question._id];
      return <BarChart app={this.app} yTitle={'Count'} data={data? data: []}/>
    }else if(question.type === 'text'){
      return null;
    }
  }

  render() {
    this.init(this.props);
    if(!this.stat){
      return(
        <div style={this.subViewStyle()}>
          {this.subTitle(['Loading...','載入中...','载入中...'])}
        </div>
      );
    }

    const questionnaire = this.func.getById.questionnaire(this.store.survey.viewingPublish.questionnaire, this.store);

    return(
      <div style={this.subViewStyle()}>
        {this.gap('4%')}

        {questionnaire.questions.map((q,i)=>{
          return this.questionAnswerStat(this.func.getById.question(q, this.store), i);
        })}


      </div>
    )
  }

}

export default PublishStatistics;

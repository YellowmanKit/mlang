import React from 'react';
import View from 'components/main/pages/home/views/View';

class PublishDetail extends View {

  constructor(props){
    super(props);
    this.init(props);
    this.publish = this.store.survey.viewingPublish;
    this.quest = this.func.getById.questionnaire(this.publish.questionnaire, this.store);
  }

  render(){
    this.init(this.props);
    const school = this.func.getById.school(this.publish.school, this.store);
    return(
      <div style={this.viewStyle()}>
      {this.gap('4%')}

      {this.subTitle(['Title','標題','标题'])}
      {this.sep()}
      {this.detailText(this.publish.title)}
      {this.gap('4%')}

      {this.subTitle(['Questionnaire','問卷','问卷'])}
      {this.sep()}
      {this.detailText(this.quest.title)}
      {this.gap('4%')}

      {this.subTitle(['School','學校','学校'])}
      {this.sep()}
      {this.detailText(school.name)}
      {this.gap('4%')}

      {this.subTitle(['End date','結束日期','结束日期'])}
      {this.sep()}
      {this.detailText(this.func.dateString(new Date(this.publish.endDate)), 'publishEndDate')}
      {this.gap('6%')}

      {this.gap('4%')}
      </div>
    )
  }

}

export default PublishDetail;

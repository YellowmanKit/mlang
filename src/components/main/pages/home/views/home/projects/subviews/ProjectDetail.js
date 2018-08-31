import React from 'react';
import SubView from 'components/main/pages/home/views/SubView';
import Image from 'components/main/items/ui/Image';

class ProjectDetail extends SubView {

  render() {
    this.init(this.props);
    const project = this.store.projects.viewingProject;
    const subject = this.func.getSubjectById(project.subject);
    return(
      <div style={this.subViewStyle()}>
        {this.gap('4%')}

        {this.subTitle(['Icon','照片','照片'])}
        {this.sep()}
        {this.gap('2%')}
        <Image app={this.app} filename={project.icon} type={'projectIcon'} size={this.bs.height * 0.22}/>
        {this.gap('2%')}

        {this.subTitle(['Subject','議題','议题'])}
        {this.sep()}
        {this.textDisplay(subject.title, ['100%',''], '125%', 'center')}
        {this.gap('2%')}

        {this.subTitle(['Title','標題','标题'])}
        {this.sep()}
        {this.textDisplay(project.title, ['100%',''], '125%', 'center')}
        {this.gap('2%')}

        {this.subTitle(['Description','描述','描述'])}
        {this.sep()}
        {this.textDisplay(project.description, ['100%',''], '125%', 'center')}
        {this.gap('2%')}

        {this.subTitle(['Start date','創建於','创建于'])}
        {this.sep()}
        {this.textDisplay(this.func.getDateString(new Date(project.createdAt)), ['100%',''], '125%', 'center')}
        {this.gap('2%')}

        {this.subTitle(['End date','結束日期','结束日期'])}
        {this.sep()}
        {this.textDisplay(this.func.getDateString(new Date(project.endDate)), ['100%',''], '125%', 'center')}
        {this.gap('6%')}
      </div>
    )
  }

}

export default ProjectDetail;

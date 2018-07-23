import React from 'react';
import SubView from 'components/main/pages/home/views/SubView';
import Image from 'components/main/items/ui/Image';

class ProjectDetail extends SubView {

  render() {
    const app = this.props.app;
    const func = app.functions;
    const project = app.store.projects.viewingProject;
    const bs = app.store.ui.basicStyle;

    return(
      <div style={this.subViewStyle()}>
        {this.gap('4%')}

        {this.subTitle(['Icon','照片'])}
        {this.sep()}
        {this.gap('2%')}
        <Image app={app} url={func.url(project.icon, 'projectIcon')} size={bs.height * 0.22}/>
        {this.gap('2%')}
        {this.sep()}
        {this.gap('2%')}

        {this.subTitle(['Title','班名'])}
        {this.sep()}
        {this.textDisplay(project.title, ['100%',''], '125%')}
        {this.gap('2%')}

        {this.subTitle(['Description','描述'])}
        {this.sep()}
        {this.textDisplay(project.description, ['100%',''], '125%')}
        {this.gap('2%')}

        {this.subTitle(['End date','結束日期'])}
        {this.sep()}
        {this.textDisplay(func.getDateString(new Date(project.endDate)), ['100%',''], '125%')}
        {this.gap('2%')}
      </div>
    )
  }

}

export default ProjectDetail;

import React from 'react';
import UI from 'components/UI';

class ProjectDetail extends UI {

  render() {
    const app = this.props.app;
    const func = app.functions;
    const project = app.store.projects.viewingProject;

    return(
      <div style={this.subViewStyle()}>
        {this.gap('4%')}

        {this.subTitle(['Icon','照片'])}
        {this.sep()}
        {this.gap('2%')}
        {this.image(func.url(project.icon, 'projectIcon'))}
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

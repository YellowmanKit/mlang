import React from 'react';
import UI from 'components/UI';

class CourseDetail extends UI {

  render() {
    const app = this.props.app;
    const func = app.functions;
    const course = app.store.courses.viewingCourse;

    return(
      <div style={this.subViewStyle()}>
        {this.gap('4%')}

        {this.subTitle(['Icon','照片'])}
        {this.sep()}
        {this.gap('2%')}
        {this.image(func.url(course.icon, 'courseIcon'))}
        {this.gap('2%')}
        {this.sep()}
        {this.gap('2%')}

        {this.subTitle(['Title','班名'])}
        {this.sep()}
        {this.textDisplay(course.title, ['100%',''], '125%')}
        {this.gap('2%')}

        {this.subTitle(['End date','結束日期'])}
        {this.sep()}
        {this.textDisplay(func.getDateString(new Date(course.endDate)), ['100%',''], '125%')}
        {this.gap('2%')}

        {this.subTitle(['Code','代碼'])}
        {this.sep()}
        {this.textDisplay(course.code, ['100%',''], '125%')}
        {this.gap('2%')}
      </div>
    )
  }

}

export default CourseDetail;

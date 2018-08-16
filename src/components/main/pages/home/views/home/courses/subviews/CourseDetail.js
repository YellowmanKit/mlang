import React from 'react';
import SubView from 'components/main/pages/home/views/SubView';
import Image from 'components/main/items/ui/Image';

class CourseDetail extends SubView {

  render() {
    this.init(this.props);
    const course = this.store.courses.viewingCourse;

    return(
      <div style={this.subViewStyle()}>
        {this.gap('4%')}

        {this.subTitle(['Icon','照片'])}
        {this.sep()}
        {this.gap('2%')}
        <Image app={this.app} filename={course.icon} type={'courseIcon'} size={this.bs.height * 0.22}/>
        {this.gap('2%')}
        {this.sep()}
        {this.gap('2%')}

        {this.subTitle(['Title','班名'])}
        {this.sep()}
        {this.textDisplay(course.title, ['100%',''], '125%', 'center')}
        {this.gap('2%')}

        {this.subTitle(['Start date','創建於'])}
        {this.sep()}
        {this.textDisplay(this.func.getDateString(new Date(course.createdAt)), ['100%',''], '125%', 'center')}
        {this.gap('2%')}

        {this.subTitle(['End date','結束日期'])}
        {this.sep()}
        {this.textDisplay(this.func.getDateString(new Date(course.endDate)), ['100%',''], '125%', 'center')}
        {this.gap('2%')}

        {this.subTitle(['Code','代碼'])}
        {this.sep()}
        {this.textDisplay(course.code, ['100%',''], '125%', 'center')}
        {this.gap('2%')}
      </div>
    )
  }

}

export default CourseDetail;

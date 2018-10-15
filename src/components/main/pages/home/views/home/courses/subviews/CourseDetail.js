import React from 'react';
import SubView from 'components/main/pages/home/views/SubView';
import Image from 'components/main/items/ui/Image';

class CourseDetail extends SubView {

  render() {
    this.init(this.props);
    const course = this.store.courses.viewingCourse;
    const teacher = this.func.getById.profileByUser(course.teacher, this.store);

    return(
      <div style={this.subViewStyle()}>
        {this.gap('4%')}

        {this.subTitle(['Icon','照片','照片'])}
        {this.sep()}
        {this.gap('2%')}
        <Image app={this.app} filename={course.icon} type={'courseIcon'} size={this.bs.height * 0.22}/>
        {this.gap('2%')}

        {this.subTitle(['Teacher','老師','老师'])}
        {this.sep()}
        {this.textDisplay(teacher? teacher.name: '', ['100%',''], '125%', 'center')}
        {this.gap('2%')}

        {this.subTitle(['Title','班名','班名'])}
        {this.sep()}
        {this.textDisplay(course.title, ['100%',''], '125%', 'center')}
        {this.gap('2%')}

        {this.subTitle(['Start date','創建於','创建于'])}
        {this.sep()}
        {this.textDisplay(this.func.dateString(new Date(course.createdAt)), ['100%',''], '125%', 'center')}
        {this.gap('2%')}

        {this.subTitle(['End date','結束日期','结束日期'])}
        {this.sep()}
        {this.textDisplay(this.func.dateString(new Date(course.endDate)), ['100%',''], '125%', 'center')}
        {this.gap('2%')}

        {this.subTitle(['Code','代碼','代码'])}
        {this.sep()}
        {this.textDisplay(course.code, ['100%',''], '125%', 'center')}
        {this.gap('6%')}
      </div>
    )
  }

}

export default CourseDetail;

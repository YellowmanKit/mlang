import React from 'react';
import SubView from 'components/main/pages/home/views/SubView';
import BarChart from 'components/main/items/graph/BarChart';


class CourseStatistics extends SubView {

  componentWillReceiveProps(newProps){
    if(!this.stat){
      this.stat = this.store.content.statistics[this.store.courses.viewingCourse._id];
    }
  }

  componentDidMount(){
    this.getCourseStatistic();
  }

  getCourseStatistic(){
    if(!this.stat){ this.actions.courses.getStatistics(this.store.courses.viewingCourse._id); }
  }

  statTextDisplay(text){
    return this.textDisplay(text, ['100%',''], '100%', 'center');
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

    return(
      <div style={this.subViewStyle()}>
        {this.gap('4%')}

        {this.subTitle(['Students','學生','学生'])}
        {this.sep()}
        {this.statTextDisplay(this.stat.courseStudents.length)}
        {this.gap('8%')}

        {this.subTitle(['Units','單元','单元'])}
        {this.sep()}
        {this.statTextDisplay(this.stat.course.subjects.length)}
        {this.gap('8%')}

        {this.subTitle(['Projects','專題研習','专题研习'])}
        {this.sep()}
        {this.statTextDisplay(this.stat.courseProjects.length)}
        {this.gap('8%')}

        {this.subTitle(['Cards (Featured)','卡片(精選)','卡片(精选)'])}
        {this.sep()}
        {this.statTextDisplay(this.stat.courseCards.length + ' (' + this.stat.featuredCount + ')')}
        {this.gap('8%')}

        {this.subTitle(['Card - Student Graph','卡片 - 學生圖表','卡片 - 学生图表'])}
        {this.sep()}
        <BarChart app={this.app} yTitle={'Card'} profiles={this.stat.profiles} data={this.stat.cardStudentGraphData}/>
        {this.gap('8%')}

        {this.subTitle(['Card - Date Graph','卡片 - 日期圖表','卡片 - 日期图表'])}
        {this.sep()}
        <BarChart app={this.app} yTitle={'Card'} data={this.stat.cardDateGraphData}/>
        {this.gap('8%')}

        {this.subTitle(['Card - Month Graph','卡片 - 月份圖表','卡片 - 月份图表'])}
        {this.sep()}
        <BarChart app={this.app} yTitle={'Card'} data={this.stat.cardMonthGraphData}/>
        {this.gap('8%')}

        {this.subTitle(['Langs','語言欄','语言栏'])}
        {this.sep()}
        {this.statTextDisplay(this.stat.courseLangs.length)}
        {this.gap('8%')}

      </div>
    )
  }

}

export default CourseStatistics;

import React from 'react';
import SubView from 'components/main/pages/home/views/SubView';
import BarChart from 'components/main/items/graph/BarChart';

class SchoolStatistics extends SubView {

  componentWillReceiveProps(newProps){
    if(!this.stat){
      this.stat = this.store.content.statistics[this.store.schools.viewingSchool._id];
    }
  }

  componentDidMount(){
    this.getSchoolStatistic();
  }

  getSchoolStatistic(){
    if(!this.stat){
      this.actions.schools.getStatistics(this.store.schools.viewingSchool._id);
    }
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

        {this.subTitle(['Teacher','老師','老师'])}
        {this.sep()}
        {this.statTextDisplay(this.stat.schoolTeachers.length)}
        {this.gap('8%')}

        {this.subTitle(['Student','學生','学生'])}
        {this.sep()}
        {this.statTextDisplay(this.stat.schoolStudents.length)}
        {this.gap('8%')}

        {this.subTitle(['Class','班別','班别'])}
        {this.sep()}
        {this.statTextDisplay(this.stat.schoolCourses.length)}
        {this.gap('8%')}

        {this.subTitle(['Unit','單元','单元'])}
        {this.sep()}
        {this.statTextDisplay(this.stat.schoolSubjects.length)}
        {this.gap('8%')}

        {this.subTitle(['Project','專題研習','专题研习'])}
        {this.sep()}
        {this.statTextDisplay(this.stat.schoolProjects.length)}
        {this.gap('8%')}

        {this.subTitle(['Card (Featured)','卡片(精選)','卡片(精选)'])}
        {this.sep()}
        {this.statTextDisplay(this.stat.schoolCards.length + ' (' + this.stat.featuredCount + ')')}
        {this.gap('8%')}

        {this.subTitle(['Card - Date Graph','卡片 - 日期圖表','卡片 - 日期图表'])}
        {this.sep()}
        <BarChart app={this.app} yTitle={'Card'} data={this.stat.cardDateGraphData}/>
        {this.gap('8%')}

        {this.subTitle(['Card - Month Graph','卡片 - 月份圖表','卡片 - 月份图表'])}
        {this.sep()}
        <BarChart app={this.app} yTitle={'Card'} data={this.stat.cardMonthGraphData}/>
        {this.gap('8%')}

        {this.subTitle(['Lang','語言欄','语言栏'])}
        {this.sep()}
        {this.statTextDisplay(this.stat.schoolLangs.length)}
        {this.gap('8%')}

        {this.subTitle(['Login - Date Graph','登入 - 日期圖表','登入 - 日期图表'])}
        {this.sep()}
        <BarChart app={this.app} yTitle={'Login'} data={this.stat.loginDateGraphData}/>
        {this.gap('8%')}
      </div>
    )
  }

}

export default SchoolStatistics;

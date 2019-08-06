import React from 'react';
import SubView from 'components/main/pages/home/views/SubView';

class StudentStatistics extends SubView {

  componentWillReceiveProps(newProps){
    if(!this.stat){ this.stat = this.store.content.statistics[this.store.profiles.viewingProfile.belongTo]; }
  }

  componentDidMount(){
    this.getStudentStatistic();
  }

  getStudentStatistic(){
    if(!this.stat){
      this.actions.profiles.getStatistics(this.store.profiles.viewingProfile.belongTo);
    }
  }

  statTextDisplay(text, key){ return this.textDisplay(text, ['100%',''], '100%', 'center', 'black', key); }

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

        {this.subTitle(['Courses','班別','班别'])}
        {this.sep()}
        {this.statTextDisplay(this.stat.userCourses.length)}
        {this.gap('8%')}

        {this.subTitle(['Units','單元','单元'])}
        {this.sep()}
        {this.statTextDisplay(this.stat.userSubjects.length)}
        {this.gap('8%')}

        {this.subTitle(['Projects','專題研習','专题研习'])}
        {this.sep()}
        {this.statTextDisplay(this.stat.userProjects.length)}
        {this.gap('8%')}

        {this.subTitle(['Cards','卡片','卡片'])}
        {this.sep()}
        {this.statTextDisplay(this.stat.userCards.length)}
        {this.gap('8%')}

        {this.subTitle(['Langs','語言欄','语言栏'])}
        {this.sep()}
        {this.statTextDisplay(this.stat.userLangs.length)}
        {this.gap('8%')}

        {this.subTitle(['Featured','精選','精选'])}
        {this.sep()}
        {this.statTextDisplay(this.stat.featuredCount)}
        {this.gap('8%')}

        {this.subTitle(['Characters','字數','字数'])}
        {this.sep()}
        {this.statTextDisplay(this.stat.langCharCount)}
        {this.gap('8%')}

        {this.subTitle(['Mostly Used Characters (Count)','常用字(次數)','常用字(次数)'])}
        {this.sep()}
        {Object.keys(this.stat.langCharFreq).map(key=>{
          const value = this.stat.langCharFreq[key];
          return this.statTextDisplay(
            this.func.langKeyToLangName(key) + ' : ' + this.langCharFreqText(value)
          , key)
        })}
        {this.gap('8%')}

      </div>
    )
  }

  langCharFreqText(langCharFreq){
    var finalText = '';
    Object.keys(langCharFreq).slice(0,5).map(key=>{
      const value = langCharFreq[key];
      finalText += key + '(' + value + ') ';
      return key;
    })
    return finalText;
  }

}

export default StudentStatistics;

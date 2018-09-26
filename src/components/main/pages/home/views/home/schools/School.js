import React from 'react';
import View from 'components/main/pages/home/views/View';

import SubNav from 'components/main/items/SubNav';
import SchoolDetail from './subviews/SchoolDetail';
import SchoolTeachers from './subviews/SchoolTeachers';
import SchoolStatistics from './subviews/SchoolStatistics';

class School extends View {

  componentDidMount(){
    if(!this.store.content.subView.includes('school')){
      //this.actions.content.setSubView(this.store.user.type === 'admin'?'schoolTeachers':'schoolDetail');
      if(this.store.user.type === 'admin' || this.store.user.type === 'teacher'){
        this.actions.content.setSubView('schoolTeachers');
      }else{
        this.actions.content.setSubView('schoolDetail');
      }
    }
  }

  subView(){
    const subView = this.store.content.subView;
    switch (subView) {
      case 'schoolTeachers':
        return <SchoolTeachers app={this.app}/>
      case 'schoolDetail':
        return <SchoolDetail app={this.app}/>
      case 'schoolStatistics':
        return <SchoolStatistics app={this.app}/>
      default:
        return null;
    }
  }

  schoolSubNav(){
    var options = [
      {
        tag:['Detail','詳細資訊','详细资讯'],
        subView: 'schoolDetail'
      }
    ];
    if(this.store.user.type === 'admin'){
      options = [
        { tag:['Statistics','統計','统计'],
          subView: 'schoolStatistics' }, ...options]
    }
    if(this.store.user.type === 'admin' || this.store.user.type === 'teacher'){
      options = [
        { tag:['Teachers','老師','老师'],
          subView: 'schoolTeachers' }, ...options]
    }


    return <SubNav app={this.app} options={options} />
  }

  render(){
    this.init(this.props);
    const school = this.store.schools.viewingSchool;
    return(
      <div style={this.viewStyle()}>
        {this.tabBar([school.name,school.name,school.name])}
        {this.schoolSubNav()}
        {this.sep()}
        {this.subView()}
      </div>
    )
  }
}

export default School;

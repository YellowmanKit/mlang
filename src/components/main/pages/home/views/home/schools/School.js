import React from 'react';
import View from 'components/main/pages/home/views/View';

import SubNav from 'components/main/items/SubNav';
import SchoolDetail from './subviews/SchoolDetail';
import SchoolTeachers from './subviews/SchoolTeachers';

class School extends View {

  componentDidMount(){
    if(!this.store.content.subView.includes('school')){
      this.actions.content.setSubView('schoolTeachers');
    }
  }

  subView(){
    const subView = this.store.content.subView;
    switch (subView) {
      case 'schoolTeachers':
        return <SchoolTeachers app={this.app}/>
      case 'schoolDetail':
        return <SchoolDetail app={this.app}/>
      default:
        return null;
    }
  }

  schoolSubNav(){
    const _options = [
      {
        tag:['Teachers','老師','老师'],
        subView: 'schoolTeachers'
      },
      {
        tag:['Detail','詳細資訊','详细资讯'],
        subView: 'schoolDetail'
      }
    ]
    return <SubNav app={this.app} options={_options} />
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

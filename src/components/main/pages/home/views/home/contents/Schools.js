import React from 'react';
import UI from 'components/UI';
import Cell from 'components/main/items/Cell';

class Schools extends UI {

  schools(){
    const onAdd =
    this.store.user.type === 'admin'? ()=>{this.actions.content.pushView('addSchool')}:
    this.store.user.type === 'teacher'? ()=>{this.actions.content.pushView('joinSchool')}:
    this.store.user.type === 'student'? ()=>{this.actions.content.pushView('joinSchool')}:
    [];

    /*const addBtnText =
    this.store.user.type === 'teacher'? ['ADD','創建']:
    this.store.user.type === 'student'?  ['JOIN','加入']:
    '';*/

    const areaStyle = {...this.ui.styles.area, ...{
      width: '100%',
      height: this.bs.height * 0.25,
      alignItems: 'center',
      overflow: 'auto'
    }}
    return(
      <div style={areaStyle}>
        {this.verGap('2%')}
        {this.schoolCells()}
        {this.verGap('5%')}
        {this.buttons.cellAdd(onAdd)}
        {this.verGap('5%')}
      </div>
    )
  }

  schoolCells(){
    const schools =
    this.store.user.type === 'admin'? this.store.schools.supervisingSchools:
    this.store.user.type === 'teacher'? this.store.profile.joinedSchools:
    this.store.user.type === 'student'? this.store.profile.joinedSchools:
    [];

    var schoolsData = [];
    schools.map(id=>{
      return schoolsData.push(this.func.getSchoolById(id));
    })
    return schoolsData.map((school, i)=>{
      return(
        <Cell key={i} app={this.app}
        type={'school'}
        data={school}
        onClick={()=>{ this.actions.schools.viewSchool(school); this.actions.content.pushView('school'); }}/>
      )
    });
  }

  render() {
    this.init(this.props);

    //const type = this.store.user.type;
    const title = ['Schools','學校','学校'];

    const containerStyle = {
      width: '100%',
      height: this.bs.height * 0.3,
      background: this.ui.colors.gradientBasic
    }

    return(
      <div style={containerStyle}>
        {this.tabBar(title)}
        {this.schools()}
      </div>
    )
  }
}

export default Schools;

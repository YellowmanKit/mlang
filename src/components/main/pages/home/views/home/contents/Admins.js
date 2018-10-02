import React from 'react';
import Content from './Content';

import Cell from 'components/main/items/Cell';

class Admins extends Content {

  componentDidMount(){
    this.setData();
    if(this.profilesData.length === 0 && !this.store.content.hide.profiles){
      this.actions.content.setHide('profiles', true);
      this.setHint();
    }
  }

  setData(){
    this.admins = this.store.profiles.admins

    this.profilesData = [];
    this.admins.map(id=>{
      return this.profilesData.push(this.func.getProfileById(id));
    })
  }

  content = style =>(
    <div style={{...this.areaStyle(), ...{ height: style.height, opacity: style.opacity}}}>
      {this.verGap('2%')}
      {this.coursesCells()}
      {this.verGap('2%')}
      {this.hidePassed && this.hasHided && this.buttons.showHidden(()=>{this.actions.content.setHide('passedCourses', false)})}
      {this.verGap('4%')}
      {this.buttons.cellAdd(this.onAdd)}
      {this.verGap('6%')}
    </div>
  )

  coursesCells(){
    this.setData();
    return this.profilesData.map((profile, i)=>{
      return(
        <Cell key={i} app={this.app}
        type={'profile'}
        data={profile}
        onClick={()=>{ this.actions.profiles.viewAdminProfile(profile); this.actions.content.pushView('admin'); }}/>
      )
    });
  }

  render() {
    this.init(this.props);
    const hide = this.store.content.hide.courses;

    const title = ['Admins','管理員','管理员']

    const containerStyle = {
      width: '100%',
      height:'',
      background: this.ui.colors.gradientBasic
    }

    this.onAdd = ()=>{};

    return(
      <div style={containerStyle}>
        {this.tabBar(title, hide, ()=>{this.actions.content.toggleHide('courses')})}
        {this.animatedContent('profiles', this.content.bind(this), !hide, this.bs.height * 0.27)}
      </div>
    )
  }
}

export default Admins;

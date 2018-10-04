import React from 'react';
import Content from './Content';

import Cell from 'components/main/items/Cell';

class Admins extends Content {

  setData(){
    this.admins = this.store.profiles.admins

    this.profilesData = [];
    this.admins.map(id=>{
      return this.profilesData.push(this.func.getProfileById(id));
    })
  }

  content = style =>(
    <div style={{...this.ui.styles.areaY,
      ...{ height: style.height, opacity: style.opacity}}}>
      {this.adminsCells()}
      {this.cellAdd(this.onAdd)}
    </div>
  )

  cellAdd(onAdd){
    const container = {...this.ui.styles.container, ...{
      width: this.bs.height * 0.2,
      height: this.bs.height * 0.225
    }}
    return (
      <div style={container}>
        {this.buttons.cellAdd(onAdd)}
      </div>
    )
  }

  adminsCells(){
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

    this.onAdd = ()=>{ this.actions.content.pushView('addAdmin'); };

    return(
      <div style={containerStyle}>
        {this.tabBar(title, hide, ()=>{this.actions.content.toggleHide('courses')})}
        {this.animatedContent('profiles', this.content.bind(this), !hide, this.bs.height * 0.87)}
      </div>
    )
  }
}

export default Admins;

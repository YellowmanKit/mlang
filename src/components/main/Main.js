import React from 'react';
import UI from 'components/UI';

import Pages from './pages/Pages';
import Modal from './Modal';
import Recording from './Recording';

import background from 'resources/images/general/background.png';

class Main extends UI {

  componentDidMount(){
    this.init(this.props);
    //localStorage.clear();
    //this.db.clear();
    this.actions.main.setStatus('waitForLogin');
    //actions.main.setStatus('ready');
  }

  componentWillReceiveProps(newProps){
    this.init(this.props);
    const previous = this.app.store.main.status;
    const next = newProps.app.store.main.status;
    //console.log(previous);
    //console.log(next);
    if(previous === 'waitForLogin' && next === 'ready'){
      const newUser = newProps.app.store.user;
      this.rememberLoginInfo(newUser.id, newUser.pw);
      //console.log(JSON.parse(localStorage.getItem('loginInfo')).id);
      this.initView(this.app.store.user.type);
    }

    const oldType = this.app.store.user.type;
    const newType = newProps.app.store.user.type;
    if(oldType !== newType){
      this.app.actions.content.clearView();
      this.initView(newType);
    }
  }

  rememberLoginInfo(id, pw){
    //localStorage.setItem('loginInfo', JSON.stringify({id: id, pw: pw}));
    this.db.set('loginInfo',{id: id, pw: pw});
    this.db.set('language',this.store.main.language);
  }

  initView(type){
    const initView =
    type === 'student'? 'studentHome':
    type === 'teacher'? 'teacherHome':
    '';
    this.actions.content.pushView(initView);

    const name = this.store.profile.name;
    if(!name || name === ''){
      this.actions.content.pushView('forceProfile');
    }
  }

  render() {
    this.init(this.props);

    const mainStyle = {
      width: this.ui.windowWidth,
      height: this.ui.windowHeight,
      minHeight: this.bs.height,
      backgroundImage: 'url(' + background + ')',
      backgroundSize: '10% 10%',
      display: 'flex',
      flexFlow: 'row nowrap',
      justifyContent: 'center',

      boxSizing: 'border-box',
      overflow: 'hidden'
    }
    return (
      <div style={mainStyle}>
        <Pages app={this.app}/>
        <Recording app={this.app}/>
        <Modal app={this.app}/>
      </div>
    )
  }

}

export default Main;

import React, { Component } from 'react';

import Pages from './pages/Pages';
import Modal from './Modal';
import Recording from './Recording';

import background from 'resources/images/general/background.png';

class Main extends Component {

  componentDidMount(){
    //localStorage.clear();
    const actions = this.props.app.actions;
    actions.main.setStatus('waitForLogin');
    //actions.main.setStatus('ready');
  }

  componentWillReceiveProps(newProps){
    const app = this.props.app;
    const previous = app.store.main.status;
    const next = newProps.app.store.main.status;
    //console.log(previous);
    //console.log(next);
    if(previous === 'waitForLogin' && next === 'ready'){
      const newUser = newProps.app.store.user;
      this.rememberLoginInfo(newUser.id, newUser.pw);
      //console.log(JSON.parse(localStorage.getItem('loginInfo')).id);
      this.initView(this.props.app.store.user.type);
    }

    const oldType = app.store.user.type;
    const newType = newProps.app.store.user.type;
    if(oldType !== newType){
      app.actions.content.clearView();
      this.initView(newType);
    }

  }

  rememberLoginInfo(id, pw){
    localStorage.setItem('loginInfo', JSON.stringify({id: id, pw: pw}));
  }

  initView(type){
    const app = this.props.app;

    const initView =
    type === 'student'? 'studentHome':
    type === 'teacher'? 'teacherHome':
    '';
    app.actions.content.pushView(initView);

    const name = app.store.profile.name;
    if(!name || name === ''){
      app.actions.content.pushView('forceProfile');
    }
    //app.actions.content.pushView('addCourse');
  }

  render() {
    const app = this.props.app;
    const ui = app.store.ui;
    const mainStyle = {
      width: ui.windowWidth,
      height: ui.windowHeight,
      minHeight: ui.basicStyle.height,
      backgroundImage: 'url(' + background + ')',
      backgroundSize: '10% 10%',
      display: 'flex',
      flexFlow: 'row nowrap',
      justifyContent: 'center'
    }
    return (
      <div style={mainStyle}>
        <Pages app={app}/>
        <Recording app={app}/>
        <Modal app={app}/>
      </div>
    )
  }

}

export default Main;

import React, { Component } from 'react';

import Pages from './pages/Pages';
import Modal from './Modal';

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
      const newStore = newProps.app.store;
      localStorage.setItem('loginInfo', JSON.stringify({id: newStore.user.id, pw: newStore.user.pw}));
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

  initView(type){
    const app = this.props.app;

    const initView =
    type === 'student'? 'studentHome':
    type === 'teacher'? 'teacherHome':
    '';
    app.actions.content.pushView(initView);
    //app.actions.content.pushView('addCourse');
  }

  render() {
    var ui = this.props.app.store.ui;
    var mainStyle = {
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
        <Modal app={this.props.app}/>
        <Pages app={this.props.app}/>
      </div>
    )
  }

}

export default Main;

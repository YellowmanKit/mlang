import React, { Component } from 'react';

import Pages from './pages/Pages';
import Modal from './items/Modal';

import background from 'resources/images/general/background.png';

class Main extends Component {

  componentDidMount(){
    //localStorage.clear();
    const actions = this.props.app.actions;
    //actions.main.setStatus('waitForLogin');
    actions.main.setStatus('ready');
  }

  componentWillReceiveProps(newProps){
    const previous = this.props.app.store.main.status;
    const next = newProps.app.store.main.status;
    //console.log(previous);
    //console.log(next);
    if(previous === 'waitForLogin' && next === 'ready'){
      const newStore = newProps.app.store;
      localStorage.setItem('loginInfo', JSON.stringify({id: newStore.user.id, pw: newStore.user.pw}));
      //console.log(JSON.parse(localStorage.getItem('loginInfo')).id);
    }
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

import React, { Component } from 'react';

import background2 from 'resources/images/general/background2.png';

import NavBar from './NavBar';
import Menu from './Menu';

import Account from './views/Account';

class Home extends Component {

  componentDidMount(){
    const app = this.props.app;
    const type = app.store.user.type;
    const initView =
    type === 'student'? 'studentHome':
    type === 'teacher'? 'teacherHome':
    '';
    app.actions.content.pushView(initView);
    app.actions.content.pushView('account');
  }

  views(){
    const app = this.props.app;
    const view = app.store.content.view;
    if(view === ''){
      return null;
    }
    switch (view) {
      case 'account':
        return <Account app={this.props.app}/>;
      case 'profile':
        return null;
      case 'setting':
        return null;
      case 'credit':
        return null;
      case 'studentHome':
        return null;
      case 'teacherHome':
        return null;
      default:
        return null;
    }
  }

  menu(){
    const app = this.props.app;
    if(app.store.content.menu === 'off'){
      return null;
    }
    return <Menu app={this.props.app}/>
  }

  render() {
    const app = this.props.app;
    const ui = app.store.ui;
    const pageStyle = Object.assign({},ui.basicStyle,{
      justifyContent: 'flex-start',
      backgroundImage: 'url(' + background2 + ')',
      backgroundSize: '100% 100%',
    })
    //const func = app.functions;
    return(
      <div style={pageStyle}>
        {this.menu()}
        <NavBar app={this.props.app}/>
        {this.views()}
      </div>
    )
  }

}

export default Home;

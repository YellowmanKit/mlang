import React, { Component } from 'react';

import background2 from 'resources/images/general/background2.png';

import NavBar from './NavBar';
import Menu from './Menu';

import Account from './views/menu/Account';
import Profile from './views/menu/Profile';
import Credit from './views/menu/Credit';

import TeacherHome from './views/home/TeacherHome';
import AddCourse from './views/home/courses/AddCourse';

class Home extends Component {

  componentDidMount(){
    const app = this.props.app;
    const type = app.store.user.type;
    const initView =
    type === 'student'? 'studentHome':
    type === 'teacher'? 'teacherHome':
    '';
    app.actions.content.pushView(initView);
    app.actions.content.pushView('addCourse');
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
        return <Profile app={this.props.app}/>;
      /*case 'setting':
        return null;*/
      case 'credit':
        return <Credit app={this.props.app}/>;
      case 'teacherHome':
        return <TeacherHome app={this.props.app}/>;
      case 'studentHome':
        return null;
      case 'addCourse':
        return <AddCourse app={this.props.app}/>;
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
        <NavBar app={this.props.app}/>
        {this.views()}
        {this.menu()}
      </div>
    )
  }

}

export default Home;

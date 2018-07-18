import React, { Component } from 'react';

import background2 from 'resources/images/general/background2.png';

import NavBar from './NavBar';
import Menu from './Menu';

import Account from './views/menu/Account';
import Profile from './views/menu/Profile';
import Credit from './views/menu/Credit';

import TeacherHome from './views/home/TeacherHome';
import AddCourse from './views/home/courses/AddCourse';
import JoinCourse from './views/home/courses/JoinCourse';
import Course from './views/home/courses/Course';

import AddProject from './views/home/projects/AddProject';
import Project from './views/home/projects/Project';

import AddCard from './views/home/cards/AddCard';

import StudentHome from './views/home/StudentHome';

class Home extends Component {

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
        return <StudentHome app={this.props.app}/>;
      case 'addCourse':
        return <AddCourse app={this.props.app}/>;
      case 'joinCourse':
        return <JoinCourse app={this.props.app}/>;
      case 'course':
        return <Course app={this.props.app}/>;
      case 'addProject':
        return <AddProject app={this.props.app}/>;
      case 'project':
        return <Project app={this.props.app}/>;
      case 'addCard':
        return <AddCard app={this.props.app}/>;
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

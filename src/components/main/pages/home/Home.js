import React, { Component } from 'react';

import background2 from 'resources/images/general/background2.png';

import NavBar from './NavBar';
import Menu from './Menu';
import Enlarger from './Enlarger';

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
import ViewCards from './views/home/cards/ViewCards';
import GradingCards from './views/home/cards/gradingCards/GradingCards';


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
        return <Account app={app}/>;
      case 'profile':
        return <Profile app={app}/>;
      case 'forceProfile':
        return <Profile app={app}/>;
      /*case 'setting':
        return null;*/
      case 'credit':
        return <Credit app={app}/>;
      case 'teacherHome':
        return <TeacherHome app={app}/>;
      case 'studentHome':
        return <StudentHome app={app}/>;
      case 'addCourse':
        return <AddCourse app={app}/>;
      case 'joinCourse':
        return <JoinCourse app={app}/>;
      case 'course':
        return <Course app={app}/>;
      case 'addProject':
        return <AddProject app={app}/>;
      case 'project':
        return <Project app={app}/>;
      case 'addCard':
        return <AddCard app={app}/>;
      case 'viewCards':
        return <ViewCards app={app}/>;
      case 'gradingCards':
        return <GradingCards app={app}/>;
      default:
        return null;
    }
  }

  menu(){
    const app = this.props.app;
    if(app.store.content.menu === 'off'){
      return null;
    }
    return <Menu app={app}/>
  }

  render() {
    const app = this.props.app;
    const ui = app.store.ui;
    const pageStyle = {...ui.basicStyle, ...{
      justifyContent: 'flex-start',
      backgroundImage: 'url(' + background2 + ')',
      backgroundSize: '100% 100%',
    }}
    return(
      <div style={pageStyle}>
        <NavBar app={app}/>
        {this.views()}
        {this.menu()}
        <Enlarger app={app}/>
      </div>
    )
  }

}

export default Home;

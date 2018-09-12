import React from 'react';
import UI from 'components/UI';

import background2 from 'resources/images/general/background2.png';

import NavBar from './NavBar';
import Menu from './Menu';
import Enlarger from './Enlarger';

import Account from './views/menu/Account';
import Profile from './views/menu/Profile';
import Credit from './views/menu/Credit';

import TeacherHome from './views/home/TeacherHome';
import StudentHome from './views/home/StudentHome';
import AdminHome from './views/home/AdminHome';

import AddCourse from './views/home/courses/AddCourse';
import JoinCourse from './views/home/courses/JoinCourse';
import Course from './views/home/courses/Course';

import AddSubject from './views/home/subjects/AddSubject';
import Subject from './views/home/subjects/Subject';

import AddProject from './views/home/projects/AddProject';
import Project from './views/home/projects/Project';

import AddCard from './views/home/cards/AddCard';
import ViewCards from './views/home/cards/ViewCards';
import SlideShow from './views/home/cards/SlideShow';
import GradingCards from './views/home/cards/gradingCards/GradingCards';

import Student from './views/home/student/Student';
import StudentSubject from './views/home/student/StudentSubject';
import StudentProject from './views/home/student/StudentProject';

import AddSchool from './views/home/schools/AddSchool';
import JoinSchool from './views/home/schools/JoinSchool';
import School from './views/home/schools/School';

import Teacher from './views/home/teacher/Teacher';

import Footer from './Footer';

class Home extends UI {

  views(){
    const app = this.app;
    const view = this.app.store.content.view;
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
      case 'adminHome':
        return <AdminHome app={app}/>;
      case 'addCourse':
        return <AddCourse app={app}/>;
      case 'editCourse':
        return <AddCourse editMode={true} app={app}/>;
      case 'joinCourse':
        return <JoinCourse app={app}/>;
      case 'course':
        return <Course app={app}/>;
      case 'subject':
        return <Subject app={app}/>;
      case 'addSubject':
        return <AddSubject app={app}/>;
      case 'editSubject':
        return <AddSubject editMode={true} app={app}/>;
      case 'addProject':
        return <AddProject app={app}/>;
      case 'editProject':
        return <AddProject editMode={true} app={app}/>;
      case 'project':
        return <Project app={app}/>;
      case 'addCard':
        return <AddCard app={app}/>;
      case 'editCard':
        return <AddCard editMode={true} app={app}/>;
      case 'resubmitCard':
        return <AddCard editMode={true} resubmit={true} app={app}/>;
      case 'viewCards':
        return <ViewCards app={app}/>;
      case 'gradingCards':
        return <GradingCards app={app}/>;
      case 'slideShow':
        return <SlideShow app={app}/>;
      case 'student':
        return <Student app={app}/>;
      case 'studentSubject':
        return <StudentSubject app={app}/>;
      case 'studentProject':
        return <StudentProject app={app}/>;
      case 'addSchool':
        return <AddSchool app={app}/>;
      case 'editSchool':
        return <AddSchool editMode={true} app={app}/>;
      case 'joinSchool':
        return <JoinSchool app={app}/>;
      case 'school':
        return <School app={app}/>;
      case 'teacher':
       return <Teacher app={app}/>;
      default:
        return null;
    }
  }

  render() {
    this.init(this.props);
    const pageStyle = {...this.ui.basicStyle, ...{
      justifyContent: 'flex-start',
      backgroundImage: 'url(' + background2 + ')',
      backgroundSize: '100% 100%',
      position: 'relative'
    }}

    return(
      <div style={pageStyle}>
        <NavBar app={this.app}/>
        {this.views()}
        <Footer app={this.app}/>
        <Menu app={this.app}/>
        <Enlarger app={this.app}/>
      </div>
    )
  }

}

export default Home;

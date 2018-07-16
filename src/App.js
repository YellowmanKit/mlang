import React, { Component } from 'react';
import { bindActionCreators} from 'redux';
import { connect } from "react-redux";
import * as mainActions from './redux/actions/main';
import * as uiActions from './redux/actions/ui';
import * as userActions from './redux/actions/user';
import * as contentActions from './redux/actions/content';
import * as modalActions from './redux/actions/modal';
import * as profileActions from './redux/actions/profile';
import * as coursesActions from './redux/actions/courses';

import Main from './components/main/Main';

class App extends Component {

  addZeroIfSingle(num){
    if(num < 10){
      return '0' + String(num);
    }else{
      return '' + String(num);
    }
  }

  getDateString(date) {
    let year = date.getFullYear();
    let monthIndex = date.getMonth() + 1;
    let day = date.getDate();

    let dateStr = year + '-' + this.addZeroIfSingle(monthIndex) + '-' + this.addZeroIfSingle(day);
    //console.log(dateStr);
    //return '2018-02-08';
    return dateStr;
  }

  multiLang(eng,chi){
    switch (this.props.store.main.language) {
      case 'english':
        return eng;
      case 'chinese':
        return chi;
      default:
        return eng;
    }
  }

  render() {
    const _app = {
      store: this.props.store,
      actions: this.props.actions,
      functions: {
        multiLang: this.multiLang.bind(this),
        getDateString: this.getDateString.bind(this)
      }
    }
    return (
      <Main app={_app}/>
    );
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions.bind(this));
  }

  updateWindowDimensions() {
    this.props.actions.ui.setDimension({width: window.innerWidth,height: window.innerHeight});
  }

}

function mapStateToProps(state, props) {
  return { store: state }
}

function mapDispatchToProps(dispatch){
  return {
    actions: {
      main: bindActionCreators(mainActions, dispatch),
      user: bindActionCreators(userActions, dispatch),
      ui: bindActionCreators(uiActions, dispatch),
      content: bindActionCreators(contentActions, dispatch),
      modal: bindActionCreators(modalActions, dispatch),
      profile: bindActionCreators(profileActions, dispatch),
      courses: bindActionCreators(coursesActions, dispatch)
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);

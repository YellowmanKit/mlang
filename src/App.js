import React, { Component } from 'react';
import { bindActionCreators} from 'redux';
import { connect } from "react-redux";
import * as mainActions from './redux/actions/main';
import * as uiActions from './redux/actions/ui';
import * as userActions from './redux/actions/user';
import * as contentActions from './redux/actions/content';
import * as modalActions from './redux/actions/modal';
import * as profileActions from './redux/actions/profile';

import Main from './components/main/Main';

class App extends Component {

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
        multiLang: this.multiLang.bind(this)
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
      profile: bindActionCreators(profileActions, dispatch)
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);

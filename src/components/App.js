import React, { Component } from 'react';
import { bindActionCreators} from 'redux';
import { connect } from "react-redux";
import * as mainActions from '../redux/actions/main';
import * as uiActions from '../redux/actions/ui';
import * as userActions from '../redux/actions/user';
import * as contentActions from '../redux/actions/content';
import * as modalActions from '../redux/actions/modal';

import Main from './main/Main';

class App extends Component {

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
  return {
    store: state
  }
}

function mapDispatchToProps(dispatch){
  return {
    actions: {
      main: bindActionCreators(mainActions, dispatch),
      user: bindActionCreators(userActions, dispatch),
      ui: bindActionCreators(uiActions, dispatch),
      content: bindActionCreators(contentActions, dispatch),
      modal: bindActionCreators(modalActions, dispatch)
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);

import React, { Component } from 'react';
import { bindActionCreators} from 'redux';
import { connect } from "react-redux";
import * as mainActions from '../redux/actions/main';
import * as uiActions from '../redux/actions/ui';
import * as userActions from '../redux/actions/ui';

import Main from './main/Main';

class App extends Component {

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

  render() {
    return (
      <Main store={this.props.store} actions={this.props.actions}/>
    );
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
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);

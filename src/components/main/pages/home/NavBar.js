import React, { Component } from 'react';

import topBar from 'resources/images/general/top_bar.png';
import back_arrow from 'resources/images/buttons/buttonIcons/back_arrow.png';
import menu from 'resources/images/buttons/buttonIcons/menu.png';
//import search from 'resources/images/buttons/buttonIcons/search.png';

class NavBar extends Component {

  constructor(props){
    super(props);
    this.state = {}
  }

  componentDidMount(){
    this.init(this.props);
  }

  componentWillReceiveProps(newProp){
    this.init(newProp);
  }

  init(newProp){
    const app = newProp.app;
    const func = app.functions;
    const action = app.actions.content;
    const view = app.store.content.view;

    var leftOnClick, rightOnClick, leftIcon, rightIcon, title;

    leftOnClick = action.pullView;
    rightOnClick = this.none;
    leftIcon = back_arrow;

    if(view === 'studentHome' ||  view === 'teacherHome'){
      leftOnClick = action.toggleMenu;
      leftIcon = menu;
      //rightIcon = search;
      title = ['HOME','主頁'];
    }else{
      switch (view) {
        case 'account':
          title = ['ACCOUNT','帳號資訊'];
          break;
        case 'profile':
          title = ['PROFILE','個人檔案'];
          break;
        case 'setting':
          title = ['SETTING','設定'];
          break;
        case 'credit':
          title = ['CREDIT','鳴謝'];
          break;
        case 'addCourse':
          title = ['ADD COURSE','創建班別'];
          break;
        case 'joinCourse':
          title = ['JOIN COURSE', '加入班別'];
          break;
        case 'course':
          title = ['COURSE', '班別'];
          break;
        case 'addProject':
          title = ['ADD PROJECT', '創建專題研習'];
          break;
        case 'project':
          title = ['PROJECT', '專題研習'];
          break;
        case 'addCard':
          title = ['ADD CARD', '提交卡片'];
          break;
        default:
          title = ['','']
          break;
      }
    }
    this.setState({
      leftNav: ()=>{return this.navButton(leftIcon, ()=>{ leftOnClick();});},
      rightNav: ()=>{return this.navButton(rightIcon, ()=>{ rightOnClick();});},
      titleArea: ()=>{return this.titleArea(func.multiLang(title[0], title[1]));},
      init: true
    });
  }

  navButton(icon, _onClick){
    const app = this.props.app;
    const ui = app.store.ui;
    const bs = ui.basicStyle;

    const buttonStyle = Object.assign({}, ui.buttonStyle, {
      width: bs.height * 0.06,
      height: bs.height * 0.06,
      margin: bs.width * 0.015,
      backgroundImage: 'url(' + icon + ')'
    });
    return <button style={buttonStyle} onClick={_onClick}/>
  }

  titleArea(title){
    const titleAreaStyle = {
      flexGrow: 5,
      textAlign: 'center',
      color: 'white',
      fontSize: '225%',
      fontWeight: 'bold'
    }
    return <div style={titleAreaStyle}>{title}</div>
  }

  render() {
    const app = this.props.app;
    const ui = app.store.ui;
    const bs = ui.basicStyle;
    const view = app.store.content.view;
    if(view === '' || !this.state.init){
      return null;
    }

    const navBarStyle = {
      width: '100%',
      height: bs.height * 0.08,
      backgroundImage: 'url(' + topBar + ')',
      backgroundSize: '100% 100%',
      display: 'flex',
      flexFlow: 'row nowrap',
      alignItems: 'center'
    }
    return(
      <div style={navBarStyle}>
        {this.state.leftNav()}
        {this.state.titleArea()}
        {this.state.rightNav()}
      </div>
    )
  }

  none(){}

}

export default NavBar;

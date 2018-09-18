import React, { Component } from 'react';
import URL from './URL';
import Button from 'components/main/items/ui/Button';
import Input from 'components/main/items/ui/Input';

import tab_bar from 'resources/images/general/tab_bar.png';
import triangle from 'resources/images/general/triangle.png';
import triangle_down from 'resources/images/general/triangle_down.png';
import icon_comment from 'resources/images/buttons/buttonIcons/edit_black.png';
import icon_audioComment from 'resources/images/buttons/buttonIcons/audioComment_black.png';

class UI extends Component {
  url = new URL(this.props.app);
  buttons = new Button(this.props.app)
  inputs = new Input(this.props.app)

  componentWillReceiveProps(newProps){
    this.init(newProps);
    this.checkUrl();
  }

  checkUrl(){
    if(this.state && this.state.filename){
      this.url.getUrl(this.state.filename, this.state.type);
      //console.log('getting url');
    }
  }

  init(props){
    this.app = props.app;
    this.ui = this.app.store.ui;
    this.bs = this.ui.basicStyle;
    this.store = this.app.store;
    this.func = this.app.functions;
    this.db = this.app.database;
    this.actions = this.app.actions;

    this.buttons.init(props.app);
    this.inputs.init(props.app);

    this.url.init(props.app);
    this.checkUrl();
  }

  translateUserType(type){
    const language = this.store.main.language;
    switch (type) {
      case 'student':
        return(
        language === 'english'? 'student':
        language === 'chinese'? '學生':
        language === 'simplified_chinese'? '学生':
        '')
      case 'teacher':
        return(
        language === 'english'? 'teacher':
        language === 'chinese'? '老師':
        language === 'simplified_chinese'? '老师':
        '')
      case 'admin':
        return(
        language === 'english'? 'admin':
        language === 'chinese'? '管理員':
        language === 'simplified_chinese'? '管理员':
        '')
      default:
    }
  }

  clearAlert(projectId){
    if(this.store.user.type === 'student'){
      const studentProject = this.func.getStudentProject(this.store.user._id, projectId);
      if(studentProject && studentProject.studentAlert){
        this.actions.studentProjects.clearAlert(studentProject._id);
      }
    }
  }

  cardTags(commented, audioCommented){
    const width = this.bs.width * 0.05;
    const style = {...this.bs, ...{
      position: 'absolute',
      bottom: 0,
      right: 0,
      width: width,
      height: width * 2,
      justifyContent: 'flex-end'
    }}
    return(
      <div style={style}>
        {this.icon(icon_comment, [width, width], commented? 0.85:0.1)}
        {this.icon(icon_audioComment, [width, width], audioCommented? 0.85:0.1)}
      </div>
    )
  }

  icon(url, scale, opacity){
    const iconStyle = {
      width: scale[0],
      height: scale[1],
      opacity: opacity,
      backgroundImage: 'url(' + url + ')',
      backgroundSize: '100% 100%'
    }
    return <div style={iconStyle}/>
  }

  tabBar(title, hide, onClick){
    const barStyle = {
      backgroundImage: 'url(' + tab_bar + ')',
      backgroundSize: '100% 100%',
      width: '100%',
      height: this.bs.height * 0.05,
      display: 'flex',
      alignItems: 'center',
      flexShrink: 0,
      cursor: onClick? 'pointer':''
    }
    const textStyle = {
      width: '90%',
      fontSize: this.bs.width * 0.03,
      fontWeight: 'bold',
      margin: '3%'
    }
    const tagSize = this.bs.height * 0.03;
    return(
      <div style={barStyle} onClick={onClick}>
       <div style={textStyle}>
        {this.func.multiLang(title[0], title[1], title[2])}
       </div>
       {onClick && <img src={hide? triangle:triangle_down} style={{opacity: 0.15, height: tagSize, width: tagSize}} alt=''/>}
      </div>
    )
  }

  textDisplay(text, scale, fontSize, textAlign, color){
    const style = {
      width: scale? scale[0]: '100%',
      height: scale? scale[1]: '15%',
      margin: '1%',
      fontSize: fontSize? fontSize: '100%',
      fontWeight: 'bold',
      textAlign: textAlign? textAlign: 'center',
      overflow: 'hidden',
      overflowWrap: 'break-word',
      color: color? color: 'black',
      flexShrink: 0
    }
    return <div style={style}>{text}</div>
  }

  subTitle(title, fontSize){
    const subTitleStyle = {
      width: '100%',
      color: this.ui.colors.mlangGreen,
      fontSize: fontSize? fontSize:'110%',
      fontWeight: 'bold',
      textAlign: 'center'
    }
    return <div style={subTitleStyle}>{this.func.multiLang(title[0], title[1], title[2])}</div>
  }

  gap(height){
    return <div style={{height: height, width: '100%', flexShrink: 0}} />
  }

  sep(){
    return <div style={{height: '1px', width: '100%', backgroundColor:'black', opacity: 0.15, flexShrink: 0}} />
  }

  verGap(width){
    return <div style={{minWidth: width, height: '100%', flexShrink: 0}}/>
  }

  verSep(color, height){
    return <div style={{backgroundColor: color, width: '1px', height: height, flexShrink: 0}}/>
  }

  failedMessage(message){
    this.actions.modal.message([message[0], message[1], message[2]]);
    this.actions.modal.showModalButton();
  }

}

export default UI;

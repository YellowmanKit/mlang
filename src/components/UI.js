import React, { Component } from 'react';
import URL from './URL';
import Button from 'components/main/items/ui/Button';
import Input from 'components/main/items/ui/Input';

import tab_bar from 'resources/images/general/tab_bar.png';
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
    if(this.state && this.state.filename){ this.url.getUrl(this.state.filename, this.state.type); }
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

  tabBar(title){
    const barStyle = {
      backgroundImage: 'url(' + tab_bar + ')',
      backgroundSize: '100% 100%',
      width: '100%',
      height: this.bs.height * 0.05,
      display: 'flex',
      alignItems: 'center'
    }
    const textStyle = {
      width: '100%',
      fontSize: '100%',
      fontWeight: 'bold',
      margin: '3%'
    }
    return(
      <div style={barStyle}>
       <div style={textStyle}>
        {this.func.multiLang(title[0], title[1])}
       </div>
      </div>
    )
  }

  textDisplay(text, scale, fontSize, textAlign, color){
    const style = {
      width: scale[0],
      height: scale[1],
      margin: '1%',
      fontSize: fontSize,
      fontWeight: 'bold',
      textAlign: textAlign,
      overflow: 'hidden',
      overflowWrap: 'break-word',
      color: color !== undefined? color: 'black'
    }
    return <div style={style}>{text}</div>
  }

  subTitle(title, fontSize){
    const subTitleStyle = {
      width: this.bs.width,
      color: this.ui.colors.mlangGreen,
      fontSize: fontSize? fontSize:'110%',
      fontWeight: 'bold',
      textAlign: 'center'
    }
    return <div style={subTitleStyle}>{this.func.multiLang(title[0], title[1])}</div>
  }

  gap(height){
    return <div style={{height: height, width: '100%', flexShrink: 0}} />
  }

  sep(){
    return <div style={{height: '1px', width: '100%', backgroundColor:'black', opacity: 0.15}} />
  }

  verGap(width){
    return <div style={{minWidth: width, height: '100%'}}/>
  }

  verSep(color, height){
    return <div style={{backgroundColor: color, width: '1px', height: height}}/>
  }

  failedMessage(message){
    this.actions.modal.message([message[0], message[1]]);
    this.actions.modal.showModalButton();
  }

}

export default UI;

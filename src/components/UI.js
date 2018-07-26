import React, { Component } from 'react';
import Button from 'components/main/items/ui/Button';
import Input from 'components/main/items/ui/Input';

import tab_bar from 'resources/images/general/tab_bar.png';

class UI extends Component {
  buttons = new Button(this.props.app)
  inputs = new Input(this.props.app)

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
    const app = this.props.app;
    const bs = app.store.ui.basicStyle;
    const func = app.functions;
    const barStyle = {
      backgroundImage: 'url(' + tab_bar + ')',
      backgroundSize: '100% 100%',
      width: '100%',
      height: bs.height * 0.05,
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
        {func.multiLang(title[0], title[1])}
       </div>
      </div>
    )
  }

  textDisplay(text, scale, fontSize, textAlign, color){
    const countStyle = {
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
    return <div style={countStyle}>{text}</div>
  }

  subTitle(title){
    const app = this.props.app;
    const ui = app.store.ui;
    const bs = ui.basicStyle;
    const func = app.functions;
    const subTitleStyle = {
      width: bs.width,
      color: ui.colors.mlangGreen,
      fontSize: '110%',
      fontWeight: 'bold',
      textAlign: 'center'
    }
    return <div style={subTitleStyle}>{func.multiLang(title[0], title[1])}</div>
  }

  gap(height){
    return <div style={{height: height, width: '100%'}} />
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
    const actions = this.props.app.actions;
    actions.modal.message([message[0], message[1]]);
    actions.modal.showModalButton();
  }

}

export default UI;

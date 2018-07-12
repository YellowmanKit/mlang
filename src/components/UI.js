import React, { Component } from 'react';

import tab_bar from 'resources/images/general/tab_bar.png';


class UI extends Component {

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
      height: '50%',
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

  failedMessage(message){
    const actions = this.props.app.actions;
    actions.modal.message({eng: message[0], chi: message[1]});
    actions.modal.showModalButton();
  }

  textDisplay(text){
    const countStyle = {
      width: '50%',
      height: '6%',
      margin: '1%',
      fontSize: '150%',
      fontWeight: 'bold',
      textAlign: 'center'
    }
    return <div style={countStyle}>{text}</div>
  }

  optionBar(_id, options, selectedId){

    const barStyle = {
      width: '25%',
      height: '6%',
      margin: '2%',
      fontSize: '100%',
      display: 'flex',
      flexFlow: 'row nowrap',
      justifyContent: 'center',
      backgroundColor: 'transparent'
    }

    return(
      <select id={_id} style={barStyle} defaultValue={selectedId}>
        {options.map((option, i)=>{
          return <option key={i}>{option}</option>
        })}
      </select>
    )

  }

  absoluteButton(text, _onClick){
    const app = this.props.app;
    const ui = app.store.ui;
    const bs = ui.basicStyle;

    const buttonStyle = Object.assign({}, ui.buttonStyle, ui.absoluteBtnStyle, {
      width: bs.width * 0.15,
      height: bs.height * 0.06
    });

    return <button style={buttonStyle} onClick={_onClick}>{text}</button>
  }

  button(text, imageUrl, _onClick){
    const app = this.props.app;
    const ui = app.store.ui;
    const func = app.functions;
    const buttonStyle = Object.assign({}, ui.buttonStyle, ui.eventBtnStyle, {
      backgroundImage: 'url(' + imageUrl + ')',
      marginTop: '5%'
    });
    return <button style={buttonStyle}  onClick={_onClick}>{func.multiLang(text[0],text[1])}</button>
  }

  subTitle(title){
    const app = this.props.app;
    const ui = app.store.ui;
    const bs = ui.basicStyle;
    const func = app.functions;
    const subTitleStyle = {
      width: bs.width,
      color: ui.mlangGreen,
      fontSize: '110%',
      fontWeight: 'bold',
      textAlign: 'center'
    }
    return <div style={subTitleStyle}>{func.multiLang(title[0], title[1])}</div>
  }

  inputField(_id, _type, _placeholder, _value){
    const app = this.props.app;
    const func = app.functions;
    const inputStyle = {
      width: '50%',
      height: '4%',
      fontSize: '100%',
      margin: '2%'
    }
    return <input id={_id} type={_type} placeholder={func.multiLang(_placeholder[0], _placeholder[1])} defaultValue={_value} style={inputStyle} />
  }

  gap(_height){
    return <div style={{height: _height, width: '100%'}} />
  }

  sep(){
    return <div style={{height: '1px', width: '100%', backgroundColor:'black', opacity: 0.15}} />
  }

  viewStyle(){
    const app = this.props.app;
    const ui = app.store.ui;
    return Object.assign({}, ui.basicStyle, ui.viewStyle, {
      height: ui.basicStyle.height * 0.92
    });
  }

}

export default UI;

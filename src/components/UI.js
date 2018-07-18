import React, { Component } from 'react';
import no_image from 'resources/images/general/no_image.png';
import tab_bar from 'resources/images/general/tab_bar.png';

import btn_add from 'resources/images/buttons/btn_add.png';

import icon_file from 'resources/images/buttons/buttonIcons/file.png';
import icon_add from 'resources/images/buttons/buttonIcons/add.png';
import icon_camera from 'resources/images/buttons/buttonIcons/camera.png';

class UI extends Component {

  rowIcon(url){
    const app = this.props.app;
    const ui = app.store.ui;
    const bs = ui.basicStyle;

    const iconStyle = Object.assign({}, ui.borderStyle, {
      width: bs.height * 0.12,
      height: bs.height * 0.12,
      backgroundColor: ui.lightGrey,
      backgroundImage: 'url(' + (url !== null? url: no_image) + ')',
      backgroundSize: '100% 100%'
    })
    return <div style={iconStyle}></div>
  }

  icon(url, scale){
    const iconStyle = {
      width: scale[0],
      height: scale[1],
      backgroundImage: 'url(' + url + ')',
      backgroundSize: '100% 100%'
    }
    return <div style={iconStyle}/>
  }

  image(url){
    const app = this.props.app;
    const ui = app.store.ui;
    const bs = ui.basicStyle;

    const containerSize = bs.height * 0.23;
    const containerStyle = Object.assign({} ,ui.borderStyle ,ui.containerStyle,{
      width: containerSize,
      height: containerSize,
      backgroundColor: 'white'
    });
    const imgBg = url === null? no_image: null;
    const size = bs.height * 0.22;
    const backgroundStyle = Object.assign({}, ui.containerStyle,{
      width: size,
      height: size,
      backgroundImage: 'url(' + imgBg + ')'
    });
    const imageStyle = Object.assign({}, {
      maxHeight: size,
      maxWidth: size,
      backgroundColor: 'white'
    });
    const buttonStyle = Object.assign({}, ui.buttonStyle, {
      width: containerSize,
      height: containerSize,
      position: 'absolute',
      opacity: 0
    });

    return(
      <div style={containerStyle}>
        <div style={backgroundStyle}>
          <img style={imageStyle} src={url} alt=''/>
          <button style={buttonStyle}/>
        </div>
      </div>
    )
  }

  takePictureButton(){
    const app = this.props.app;
    const ui = app.store.ui;
    const bs = ui.basicStyle;
    const buttonStyle = Object.assign({}, ui.buttonStyle, {
      width: bs.width * 0.15,
      height: bs.width * 0.15,
      margin: '5%',
      backgroundImage: 'url(' + icon_camera + ')'
    });
    return <button style={buttonStyle} onClick={()=>{app.actions.main.setStatus('capture')}}/>
  }

  mobileTakePictureButton(){
    const app = this.props.app;
    const ui = app.store.ui;
    const bs = ui.basicStyle;
    const buttonStyle = Object.assign({}, ui.buttonStyle, {
      width: bs.width * 0.15,
      height: bs.width * 0.15,
      margin: '5%',
      backgroundImage: 'url(' + icon_camera + ')',
      boxSizing: 'border-box',
      paddingTop: bs.width * 0.15,
      overflow: 'hidden'
    });
    return <input type="file" accept="image/*" capture="camera" style={buttonStyle} alt='' onChange={event=>{app.actions.main.setPhoto({blob: event.target.files[0], url: URL.createObjectURL(event.target.files[0])})}}/>
  }

  selectImageButton(){
    const app = this.props.app;
    const ui = app.store.ui;
    const bs = ui.basicStyle;
    const buttonStyle = Object.assign({}, ui.buttonStyle, {
      width: bs.width * 0.15,
      height: bs.width * 0.15,
      margin: '5%',
      backgroundImage: 'url(' + icon_file + ')',
      boxSizing: 'border-box',
      paddingTop: bs.width * 0.15,
      overflow: 'hidden'
    });
    return <input type="file" accept="image/*" style={buttonStyle} alt='' onChange={event=>{app.actions.main.setPhoto({blob: event.target.files[0], url: URL.createObjectURL(event.target.files[0])})}}/>
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

  failedMessage(message){
    const actions = this.props.app.actions;
    actions.modal.message({eng: message[0], chi: message[1]});
    actions.modal.showModalButton();
  }

  textDisplay(text, scale, _fontSize, _color){
    const countStyle = {
      width: scale[0],
      height: scale[1],
      margin: '1%',
      fontSize: _fontSize,
      fontWeight: 'bold',
      textAlign: 'center',
      overflow: 'hidden',
      color: _color !== undefined? _color: 'black'
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
    const func = app.functions;
    const ui = app.store.ui;
    const bs = ui.basicStyle;

    const buttonStyle = Object.assign({}, ui.buttonStyle, ui.absoluteBtnStyle, {
      width: bs.width * 0.3,
      height: bs.width * 0.1,
      fontSize: '150%'
    });

    return <button style={buttonStyle} onClick={_onClick}>{func.multiLang(text[0],text[1])}</button>
  }

  listAddButton(scale, _onClick){
    const app = this.props.app;
    const ui = app.store.ui;
    const bs = ui.basicStyle;
    const buttonStyle = Object.assign({}, ui.containerStyle, ui.buttonStyle, {
      width: scale[0],
      height: scale[1],
      backgroundColor: ui.ultraLightGrey
    });
    return <button onClick={_onClick} style={buttonStyle}>{this.icon(icon_add,[bs.height * 0.05, bs.height * 0.05])}</button>
  }

  addButton(_onClick){
    const app = this.props.app;
    const ui = app.store.ui;
    const bs = ui.basicStyle;
    const buttonStyle = Object.assign({}, ui.buttonStyle, {
      width: bs.width * 0.075,
      height: bs.width * 0.075,
      opacity: 0.75,
      fontWeight: 'bold',
      color: 'white',
    });
    return this.button(buttonStyle, ['', ''], btn_add, _onClick)
  }

  eventButton(text, imageUrl, _onClick){
    const app = this.props.app;
    const ui = app.store.ui;
    return this.button(ui.eventBtnStyle, text, imageUrl, _onClick)
  }

  button(customStyle, text, imageUrl, _onClick){
    const app = this.props.app;
    const ui = app.store.ui;
    const func = app.functions;
    const buttonStyle = Object.assign({}, ui.buttonStyle, customStyle, {
      backgroundImage: 'url(' + imageUrl + ')'
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

  dateField(_id, _type, _value){
    const inputStyle = {
      width: '50%',
      height: '4%',
      fontSize: '100%',
      margin: '2%'
    }
    return <input id={_id} type={_type} defaultValue={_value} style={inputStyle} />
  }

  textArea(_id, scale, size, value){
    const textAreaStyle = {
      width: scale[0],
      height: scale[1],
      fontSize: '100%',
      margin: '2%'
    }
    return <textarea id={_id} style={textAreaStyle} row={size[0]} cols={size[1]} defaultValue={value}/>
  }

  inputField(_id, _type, _placeholder, _value){
    const app = this.props.app;
    const func = app.functions;
    const inputStyle = {
      width: '67%',
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

  verGap(_width){
    return <div style={{minWidth: _width, height: '100%'}}/>
  }

  verSep(_color, _height){
    return <div style={{backgroundColor: _color, width: '1px', height: _height}}/>
  }

  viewStyle(){
    const app = this.props.app;
    const ui = app.store.ui;
    return Object.assign({}, ui.basicStyle, ui.viewStyle, {
      height: ui.basicStyle.height * 0.92
    });
  }

  subViewStyle(){
    const app = this.props.app;
    const ui = app.store.ui;
    return Object.assign({}, ui.basicStyle, ui.viewStyle, {
      height: ui.basicStyle.height * 0.82
    });
  }

}

export default UI;
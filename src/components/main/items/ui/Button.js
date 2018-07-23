import React from 'react';

import btn_green from 'resources/images/buttons/btn_green.png';
import btn_red from 'resources/images/buttons/btn_red.png';
import btn_yellow from 'resources/images/buttons/btn_yellow.png';

import icon_file from 'resources/images/buttons/buttonIcons/file.png';
import icon_camera from 'resources/images/buttons/buttonIcons/camera.png';
import icon_cross from 'resources/images/buttons/buttonIcons/cross.png';

class Button {

  constructor(app){
    this.app = app;
    this.ui = app.store.ui;
    this.bs = this.ui.basicStyle;
    this.func = app.functions;
    this.actions = app.actions;
  }

  absoluteClose(onClick){
    return this.button(this.dynamicStyles('absoluteClose'), ['',''], icon_cross, onClick)
  }

  modal(text, onClick){
    const style = {...this.ui.styles.button, ...{
      width: '50%',
      height: '75%',
      backgroundColor: 'rgba(100, 100, 100, 0.5)',
      color: 'white',
      fontSize: '100%',
      fontWeight: 'bold',
      textAlign: 'center',
      borderRadius: '5px',
    }}
    return this.button(style, text, '', onClick)
  }

  absolute(text, onClick){
    const style = {...styles.button, ...{
      position: 'absolute',
      bottom: '10%',
      backgroundColor: 'rgba(100, 100, 100, 0.5)',
      textAlign: 'center',
      borderRadius: '5px',
      width: this.bs.width * 0.3,
      height: this.bs.width * 0.1,
      fontSize: '150%'
    }}

    return this.button(style, text, '', onClick)
  }

  langBar(icon, opacity, scale, onClick){
    const style = {...styles.button, ...{
      width: scale[0],
      height: scale[1],
      opacity: opacity
    }}
    return this.button(style, ['', ''], icon, onClick)
  }

  takePicture(size){
    const buttonStyle = {...styles.button, ...{
      width: size,
      height: size,
      margin: '5%',
      backgroundImage: 'url(' + icon_camera + ')'
    }}
    return <button style={buttonStyle} onClick={()=>{this.actions.main.setStatus('capture')}}/>
  }

  mobileTakePicture(size){
    const style = {...styles.button, ...styles.fileInput, ...{
      width: size,
      height: size,
      margin: '5%',
      backgroundImage: 'url(' + icon_camera + ')',
      paddingTop: size
    }}
    return <input type="file" accept="image/*" capture="camera" style={style} alt='' onChange={event=>{this.actions.main.setPhoto({blob: event.target.files[0], url: URL.createObjectURL(event.target.files[0])})}}/>
  }

  selectImage(size){
    const style ={...styles.button, ...styles.fileInput, ...{
      width: size,
      height: size,
      margin: '5%',
      backgroundImage: 'url(' + icon_file + ')',
      paddingTop: size
    }}
    return <input type="file" accept="image/*" style={style} alt='' onChange={event=>{this.actions.main.setPhoto({blob: event.target.files[0], url: URL.createObjectURL(event.target.files[0])})}}/>
  }

  listAdd(scale, text, fontSize, onClick){
    const style = {...this.ui.containerStyle, ...styles.button, ...{
      width: scale[0],
      height: scale[1],
      fontSize: fontSize,
      backgroundColor: this.ui.darkGrey,
      flexShrink: 0
    }}
    return this.button(style, text, '', onClick)
  }

  nav(icon, onClick){
    return this.button(this.dynamicStyles('nav'), ['',''], icon, onClick);
  }

  rectGreen(text, onClick){
    return this.button(styles.rect, text, btn_green, onClick);
  }

  rectRed(text, onClick){
    return this.button(styles.rect, text, btn_red, onClick);
  }

  rectYellow(text, onClick){
    return this.button(styles.rect, text, btn_yellow, onClick);
  }

  button(customStyle, text, imageUrl, onClick){
    const style = {...styles.button, ...customStyle, ...{ backgroundImage: 'url(' + imageUrl + ')' }}
    return <button style={style}  onClick={onClick}>{this.func.multiLang(text[0],text[1])}</button>
  }

  dynamicStyles(name){
    switch (name) {
      case 'nav':
        return {...this.ui.styles.button, ...{
          width: this.bs.height * 0.06,
          height: this.bs.height * 0.06,
          margin: this.bs.width * 0.015
        }}
      case 'absoluteClose':
        return {...this.ui.styles.button, ...{
          width: this.bs.height * 0.06,
          height: this.bs.height * 0.06,
          margin: this.bs.width * 0.015,
          position: 'absolute',
          top: 0,
          right: 0
        }}
      default:
        return {}
    }
  }
}

const styles = {
  button:{
    border: 'none',
    cursor: 'pointer',
    backgroundSize: '100% 100%',
    backgroundColor: 'transparent',
    fontWeight: 'bold',
    fontSize: '100%',
    color: 'white'
  },
  rect: {
    width: '67%',
    height: '5%',
    marginTop: '5%'
  },
  fileInput: {
    boxSizing: 'border-box',
    overflow: 'hidden'
  }
}

export default Button;

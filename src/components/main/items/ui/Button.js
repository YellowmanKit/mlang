import React from 'react';

import btn_listAdd from 'resources/images/buttons/btn_listAdd.png';
import btn_green from 'resources/images/buttons/btn_green.png';
import btn_red from 'resources/images/buttons/btn_red.png';
import btn_yellow from 'resources/images/buttons/btn_yellow.png';

import icon_file from 'resources/images/buttons/buttonIcons/file.png';
import icon_camera from 'resources/images/buttons/buttonIcons/camera.png';
import icon_cross from 'resources/images/buttons/buttonIcons/cross.png';
import icon_arrow from 'resources/images/buttons/buttonIcons/arrow.png';
import icon_arrow_reverse from 'resources/images/buttons/buttonIcons/arrow_reverse.png';
import icon_arrow2 from 'resources/images/buttons/buttonIcons/arrow2.png';
import icon_arrow2_reverse from 'resources/images/buttons/buttonIcons/arrow2_reverse.png';

import icon_passed from 'resources/images/buttons/buttonIcons/tick.png';
import icon_featured from 'resources/images/buttons/buttonIcons/star2.png';
import icon_comment from 'resources/images/buttons/buttonIcons/edit.png';
import icon_audioComment from 'resources/images/buttons/buttonIcons/audioComment.png';
import icon_swipeLeft from 'resources/images/buttons/buttonIcons/swipeLeft.png';
import icon_swipeRight from 'resources/images/buttons/buttonIcons/swipeRight.png';
import icon_slideshow from 'resources/images/buttons/buttonIcons/slideshow.png';
import icon_add_grey from 'resources/images/buttons/buttonIcons/add_grey.png';

class Button {

  constructor(app){
    this.init(app);
  }

  init(app){
    this.app = app;
    this.ui = app.store.ui;
    this.bs = this.ui.basicStyle;
    this.func = app.functions;
    this.actions = app.actions;
  }

  cellAdd(onClick){
    const style = {...this.ui.styles.border, ...{
      width: this.bs.width * 0.12,
      height: this.bs.width * 0.12,
      backgroundColor: 'white',
      opacity: 0.5
    }}
    return this.button(style, ['', ''], icon_add_grey, onClick)
  }

  slideNext(onClick){
    const style = {
      position: 'absolute',
      top: 0,
      right: 0,
      width: this.bs.width * 0.15,
      height: this.bs.height * 0.5,
      opacity: 0.15
    }
    return this.button(style, ['', ''], icon_arrow_reverse, onClick)
  }

  slideBack(onClick){
    const style = {
      position: 'absolute',
      top: 0,
      left: 0,
      width: this.bs.width * 0.15,
      height: this.bs.height * 0.5,
      opacity: 0.15
    }
    return this.button(style, ['', ''], icon_arrow, onClick)
  }

  barSlideShow(onClick, active){
    return this.bar(icon_slideshow, onClick, active);
  }

  barSwipeLeft(onClick, active){
    return this.bar(icon_swipeLeft, onClick, active);
  }

  barSwipeRight(onClick, active){
    return this.bar(icon_swipeRight, onClick, active);
  }

  barAudioComment(onClick, active){
    return this.bar(icon_audioComment, onClick, active);
  }

  barComment(onClick, active){
    return this.bar(icon_comment, onClick, active);
  }

  barExpend(onClick){
    return this.bar(icon_arrow2, onClick, true);
  }

  barCollapse(onClick){
    return this.bar(icon_arrow2_reverse, onClick, true);
  }

  bar(icon, onClick, active){
    const style = {
      width: this.bs.width * 0.09,
      height: this.bs.width * 0.09,
      opacity: active? 1: 0.1
    }
    return this.button(style, ['',''], icon, active? onClick: null)
  }

  gradingFailed(onClick){
    const style = {
      width: '60%',
      height: '60%'
    }
    return this.grading(icon_cross, style, '#ce0000', onClick)
  }

  gradingPassed(onClick){
    const style = {
      width: '70%',
      height: '70%'
    }
    return this.grading(icon_passed, style, '#09ba00', onClick)
  }

  gradingFeatured(onClick){
    const style = {
      width: '75%',
      height: '75%'
    }
    return this.grading(icon_featured, style, '#e0d800', onClick)
  }

  gradingComment(onClick){
    const style = {
      width: '65%',
      height: '65%'
    }
    return this.grading(icon_comment, style, '#444444', onClick)
  }

  gradingAudioComment(onClick){
    const style = {
      width: '65%',
      height: '65%'
    }
    return this.grading(icon_audioComment, style, '#7f7f7f', onClick)
  }

  grading(icon, iconStyle, color, onClick){
    const buttonStyle = {...this.ui.styles.button,...this.ui.styles.border, ...this.ui.styles.container, ...styles.grading, ...{
      background: 'linear-gradient(to top left, '+ color + ' 0%, #ffffff 125%)',
      borderColor: color
    }}
    return(
      <button style={buttonStyle} onClick={onClick}>
        <img style={iconStyle} src={icon} alt=''/>
      </button>
    )
  }

  next(onClick){
    return this.button({...this.dynamicStyles('next'), ...this.dynamicStyles('arrow')}, ['',''], icon_arrow_reverse, onClick)
  }

  previous(onClick){
    return this.button({...this.dynamicStyles('previous'), ...this.dynamicStyles('arrow')}, ['',''], icon_arrow, onClick)
  }

  absoluteClose(onClick){
    return this.button(this.dynamicStyles('absoluteClose'), ['',''], icon_cross, onClick)
  }

  modal(text, onClick){
    const style = {
      width: '50%',
      height: '75%',
      backgroundColor: 'rgba(100, 100, 100, 0.5)',
      color: 'white',
      fontSize: '100%',
      fontWeight: 'bold',
      textAlign: 'center',
      borderRadius: '5px',
    }
    return this.button(style, text, '', onClick)
  }

  absolute(text, onClick){
    const style = {
      position: 'absolute',
      bottom: '10%',
      backgroundColor: 'rgba(100, 100, 100, 0.5)',
      textAlign: 'center',
      borderRadius: '5px',
      width: this.bs.width * 0.3,
      height: this.bs.width * 0.1,
      fontSize: '150%'
    }

    return this.button(style, text, '', onClick)
  }

  langBar(icon, opacity, scale, onClick){
    const style = {
      width: scale[0],
      height: scale[1],
      opacity: opacity
    }
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
    const style = {...styles.button,...styles.fileInput, ...{
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
    const style = {...this.ui.containerStyle, ...{
      width: scale[0],
      height: scale[1],
      fontSize: fontSize,
      backgroundColor: this.ui.darkGrey,
      flexShrink: 0
    }}
    return this.button(style, text, btn_listAdd, onClick)
  }

  nav(icon, onClick){
    return this.button(this.dynamicStyles('nav'), ['',''], icon, onClick);
  }

  rectGreen(text, onClick){
    return this.button(this.dynamicStyles('rect'), text, btn_green, onClick);
  }

  rectRed(text, onClick){
    return this.button(this.dynamicStyles('rect'), text, btn_red, onClick);
  }

  rectYellow(text, onClick){
    return this.button(this.dynamicStyles('rect'), text, btn_yellow, onClick);
  }

  button(customStyle, text, imageUrl, onClick){
    var style = {...styles.button, ...customStyle }
    if(imageUrl && imageUrl !== ''){
      style = {...style, ...{ backgroundImage: 'url(' + imageUrl + ')' }}
    }
    return <button style={style}  onClick={onClick}>{this.func.multiLang(text[0],text[1], text[2])}</button>
  }

  dynamicStyles(name){
    switch (name) {
      case 'rect':
        return {
            width: this.bs.width * 0.67,
            height: this.bs.width * 0.065,
            marginTop: '5%'
        }
      case 'nav':
        return {
          width: this.bs.height * 0.06,
          height: this.bs.height * 0.06,
          margin: this.bs.width * 0.015
        }
      case 'absoluteClose':
        return {
          width: this.bs.height * 0.06,
          height: this.bs.height * 0.06,
          margin: this.bs.width * 0.015,
          position: 'absolute',
          top: 0,
          right: 0,
          opacity: 0.25
        }
      case 'arrow':
        return {
          width: this.bs.width * 0.08,
          height: this.bs.height * 0.5,
          opacity: 0.25
        }
      case 'previous':
        return {
          position: 'absolute',
          top: this.bs.height * 0.21,
          left: 0
        }
      case 'next':
        return {
          position: 'absolute',
          top: this.bs.height * 0.21,
          right: 0
        }
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
    color: 'white',
    flexShrink: 0
  },
  fileInput: {
    boxSizing: 'border-box',
    overflow: 'hidden'
  },
  grading: {
    width: '80%',
    height: '80%',
    borderRadius: '15px'
  }
}

export default Button;

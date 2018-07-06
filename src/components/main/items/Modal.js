import React, { Component } from 'react';

//import background2 from 'resources/images/general/background2.png';

class Modal extends Component {

  board(){
    const bs = this.props.app.store.ui.basicStyle;
    const boardStyle = {
      width: '60%',
      height: '30%',
      minWidth: bs.minWidth * 0.6,
      maxWidth: bs.maxWidth * 0.6,
      minHeight: bs.minHeight * 0.3,
      maxHeight: bs.maxHeight * 0.3,
      backgroundColor: 'rgba(0, 0, 0, 0.9)',
      borderRadius: '20px',
      display: 'flex',
      flexFlow: 'column nowrap',
      alignItems: 'center'
    }
    return(
      <div style={boardStyle}>
        <div style={{height: '10%'}} />
        {this.message()}
        {this.buttonsArea()}
      </div>
    )
  }

  message(){
    const app = this.props.app;
    const status = app.store.main.modal;
    const func = app.functions;
    const text =
    status === 'loggingIn'? func.multiLang('Logging in...','登入中...'):
    status === 'loginFailed'? func.multiLang('Login failed!','登入失敗!'):
    status;

    const messageStyle = {
      width: '85%',
      height: '55%',
      backgroundColor: 'transparent',
      color: 'white',
      fontSize: '200%',
      fontWeight: 'bold',
      textAlign: 'center',
      justifyContent: 'center'
    }
    return <div style={messageStyle}>{text}</div>
  }

  buttonsArea(){
    const app = this.props.app;
    const func = app.functions;

    const areaStyle = {
      width: '85%',
      height: '25%',
      backgroundColor: 'transparent',
      display: 'flex',
      flexFlow: 'row nowrap',
      justifyContent: 'center',
      alignItems: 'center'
    }
    return(
      <div style={areaStyle}>
        {this.button(func.multiLang('Confirm','確定'), ()=>{app.actions.main.setModal('off')})}
      </div>
    )
  }

  button(text, _onClick){

    const buttonStyle = {
      width: '50%',
      height: '75%',
      backgroundColor: 'rgba(100, 100, 100, 0.5)',
      border: 'none',
      color: 'white',
      fontSize: '100%',
      fontWeight: 'bold',
      textAlign: 'center',
      borderRadius: '5px'
    }
    return <button style={buttonStyle} onClick={_onClick}>{text}</button>
  }

  render() {
    const app = this.props.app;
    const status = app.store.main.modal;
    if(status === 'off'){
      return null;
    }

    const ui = app.store.ui;
    const modalStyle = {
      position: 'absolute',
      width: ui.basicStyle.width,
      height: ui.basicStyle.height,
      minHeight: ui.basicStyle.minHeight,
      backgroundColor: 'transparent',
      opacity: 1,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }
    return(
      <div style={modalStyle}>
        {this.board()}
      </div>
    )
  }

}

export default Modal;

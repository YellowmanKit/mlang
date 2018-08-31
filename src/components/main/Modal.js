import React from 'react';
import UI from 'components/UI';

class Modal extends UI {

  board(){
    const boardStyle = {
      width: this.bs.width * 0.6,
      height:  this.bs.height * 0.3,
      backgroundColor: 'rgba(0, 0, 0, 0.95)',
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
    const modal = this.store.modal;
    const lang = this.store.main.language;
    const text = modal[lang];

    const messageStyle = {
      width: '85%',
      height: '55%',
      color: 'white',
      fontSize: '100%',
      fontWeight: 'bold',
      textAlign: 'center',
      justifyContent: 'center'
    }
    return <div style={messageStyle}>{text}</div>
  }

  buttonsArea(){
    const status = this.store.modal.button;
    if(status === 'off'){
      return null;
    }

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
        {this.buttons.modal(['Confirm','確定','确定'], ()=>{this.actions.modal.hideModal()})}
      </div>
    )
  }

  render() {
    this.init(this.props);
    const status = this.store.modal.status;
    if(status === 'off'){
      return null;
    }

    const modalStyle = {
      position: 'absolute',
      width: this.bs.width,
      height: this.bs.height,
      minHeight: this.bs.minHeight,
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

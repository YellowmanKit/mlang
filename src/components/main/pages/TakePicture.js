import React, { Component } from 'react';

import background2 from 'resources/images/general/background2.png';

class TakePicture extends Component {

  image(){
    const app = this.props.app;
    const bs = app.store.ui.basicStyle;
    const imgStyle = {
      maxWidth: bs.maxWidth,
      maxHeight: bs.maxHeight
    }
    return <img style={imgStyle} src={app.store.main.photo} alt='' />
  }

  button(text, _onClick){
    const app = this.props.app;
    const bs = app.store.ui.basicStyle;

    const buttonStyle = {
      position: 'absolute',
      bottom: '10%',
      width: bs.width * 0.15,
      height: bs.height * 0.06,
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
    const ui = app.store.ui;
    const pageStyle = Object.assign({},ui.basicStyle,{
      justifyContent: 'center',
      backgroundImage: 'url(' + background2 + ')',
      backgroundSize: '100% 100%',
    })
    //const func = app.functions;
    return(
      <div style={pageStyle}>
        {this.image()}
        {this.button('take picture', ()=>{ app.actions.main.setStatus('capture'); })}
      </div>
    )
  }

}

export default TakePicture;

import React from 'react';
import UI from 'components/UI';

import Camera from 'react-camera';

import background2 from 'resources/images/general/background2.png';

class Capture extends UI {

  onCapture(_blob){
    const app = this.props.app;
    app.actions.main.setPhoto({blob: _blob, url: URL.createObjectURL(_blob)});
    app.actions.main.setStatus('ready');
  }

  takePicture() {
    this.camera.capture()
    .then(blob => {
      this.onCapture(blob)
    });
  }

  render() {
    const app = this.props.app;
    const ui = app.store.ui;
    const pageStyle = Object.assign({},ui.basicStyle,{
      justifyContent: 'center',
      backgroundImage: 'url(' + background2 + ')',
      backgroundSize: '100% 100%',
    })
    return(
      <div style={pageStyle}>
        <Camera style={{}} ref={_camera=>{this.camera = _camera}} />
        {this.absoluteButton(['Capture','拍照'], ()=>{ this.takePicture(); })}
      </div>
    )
  }

}

export default Capture;

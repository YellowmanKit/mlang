import React from 'react';
import UI from 'components/UI';

import Camera from 'react-camera';
import MediaQuery from 'react-responsive';

import background2 from 'resources/images/general/background2.png';

class Capture extends UI {

  onCapture(blob){
    const app = this.props.app;
    app.actions.main.setPhoto(URL.createObjectURL(blob));
    app.actions.main.setStatus('takePicture');
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
    //const func = app.functions;
    return(
      <div style={pageStyle}>
        <MediaQuery minDeviceWidth={1224}>
            <Camera style={{}} ref={_camera=>{this.camera = _camera}} />
            {this.absoluteButton('capture', ()=>{ this.takePicture(); })}
        </MediaQuery>
        <MediaQuery maxDeviceWidth={1224}>
          <input type="file" accept="image/*" capture="camera" onChange={event=>{this.onCapture(event.target.files[0])}}/>
        </MediaQuery>
      </div>
    )
  }

}

export default Capture;

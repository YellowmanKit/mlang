import React from 'react';
import UI from 'components/UI';

import Camera from 'react-camera';

import background2 from 'resources/images/general/background2.png';

class Capture extends UI {

  onCapture(_blob){
    this.actions.main.setPhoto({blob: _blob, url: URL.createObjectURL(_blob)});
    this.actions.main.setStatus('ready');
  }

  takePicture() {
    this.camera.capture()
    .then(blob => {
      this.onCapture(blob)
    });
  }

  render() {
    this.init(this.props);
    const pageStyle = {...this.bs, ...{
      justifyContent: 'center',
      backgroundImage: 'url(' + background2 + ')',
      backgroundSize: '100% 100%',
    }}
    return(
      <div style={pageStyle}>
        <Camera style={{}} ref={_camera=>{this.camera = _camera}} />
        {this.buttons.absolute(['Capture','拍照'], ()=>{ this.takePicture(); })}
      </div>
    )
  }

}

export default Capture;

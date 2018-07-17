import React from 'react';
import UI from 'components/UI';
import MediaQuery from 'react-responsive';

class ImagePicker extends UI {

  render() {
    const app = this.props.app;
    const ui = app.store.ui;
    const bs = ui.basicStyle;

    const pickerStyle = {
      width: '100%',
      height: bs.height * 0.25,
      backgroundColor: ui.lightGrey,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }
    const toolBarStyle = {
      width: '25%',
      height: '100%',
      display: 'flex',
      flexFlow: 'column nowrap',
      marginLeft: '2%'
    }
    return(
      <div style={pickerStyle}>
        <div style={toolBarStyle}/>
        {this.image(app.store.main.photoUrl)}
        {this.verGap('2%')}
        {this.verSep('white', '90%')}
        <div style={toolBarStyle}>
          {this.selectImageButton()}
          <MediaQuery minDeviceWidth={1224}>
            {this.takePictureButton()}
          </MediaQuery>
          <MediaQuery maxDeviceWidth={1224}>
            {this.mobileTakePictureButton()}
          </MediaQuery>
        </div>
      </div>
    )
  }
}

export default ImagePicker;

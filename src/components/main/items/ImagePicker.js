import React from 'react';
import MediaQuery from 'react-responsive';

import UI from 'components/UI';
import Image from 'components/main/items/ui/Image';

class ImagePicker extends UI {

  render() {
    this.init(this.props);

    const pickerStyle = {
      width: '100%',
      height: this.bs.height * 0.25,
      backgroundColor: this.ui.colors.lightGrey,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexShrink: 0
    }
    const toolBarStyle = {
      width: this.bs.height * 0.13,
      height: '100%',
      display: 'flex',
      flexFlow: 'column nowrap',
      justifyContent: 'center',
      marginLeft: '2%'
    }
    const imgUrl =
    this.store.main.photoUrl? this.store.main.photoUrl:
    this.props.defaultUrl? this.props.defaultUrl:
    null;

    return(
      <div style={pickerStyle}>
        <div style={toolBarStyle}>
          {this.buttons.selectDefaultImage(this.bs.height * 0.1)}
        </div>
        {this.verSep('white', '90%')}
        {this.verGap('2%')}
        <Image app={this.app} photoUrl={imgUrl} size={this.bs.height * 0.22}/>
        {this.verGap('2%')}
        {this.verSep('white', '90%')}
        <div style={toolBarStyle}>
          {this.buttons.selectImage(this.bs.height * 0.1)}
          <MediaQuery minDeviceWidth={1224}>
            {this.buttons.takePicture(this.bs.height * 0.1)}
          </MediaQuery>
          <MediaQuery maxDeviceWidth={1224}>
            {this.buttons.mobileTakePicture(this.bs.height * 0.1)}
          </MediaQuery>
        </div>
      </div>
    )
  }
}

export default ImagePicker;

import React from 'react';
import UI from 'components/UI';

import no_image from 'resources/images/general/no_image.png';

class Image extends UI {

  image(url, size){
    const app = this.props.app;
    const ui = app.store.ui;

    const containerSize = size;
    const containerStyle = Object.assign({} ,ui.borderStyle ,ui.containerStyle,{
      width: containerSize,
      height: containerSize,
      backgroundColor: 'white'
    });
    const imgBg = url === null? no_image: null;
    const imgSize = size * 0.95;
    const backgroundStyle = Object.assign({}, ui.containerStyle,{
      width: imgSize,
      height: imgSize,
      backgroundImage: 'url(' + imgBg + ')'
    });
    const imageStyle = Object.assign({}, {
      maxHeight: imgSize,
      maxWidth: imgSize,
      backgroundColor: 'white'
    });
    const buttonStyle = Object.assign({}, ui.buttonStyle, {
      width: containerSize,
      height: containerSize,
      position: 'absolute',
      opacity: 0
    });

    return(
      <div style={containerStyle}>
        <div style={backgroundStyle}>
          <img style={imageStyle} src={url} alt=''/>
          {this.button(buttonStyle,['',''],'',()=>{this.onImageClick()})}
        </div>
      </div>
    )
  }

  onImageClick(){
    const actions = this.props.app.actions;
    actions.main.enlargeImage(this.props.url);
  }

  render(){
    return this.image(this.props.url, this.props.size);
  }

}

export default Image;

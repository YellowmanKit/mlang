import React from 'react';
import UI from 'components/UI';

import no_image from 'resources/images/general/no_image.png';

class Image extends UI {

  render(){
    const url = this.props.url;
    const size = this.props.size;

    const app = this.props.app;
    const ui = app.store.ui;

    const containerStyle = {...ui.styles.border , ...ui.styles.container, ...{
      width: size,
      height: size,
      backgroundColor: 'white'
    }}
    const imgBg = url === null? no_image: null;
    const imgSize = size * 0.95;
    const backgroundStyle = {...ui.styles.container, ...{
      width: imgSize,
      height: imgSize,
      backgroundImage: 'url(' + imgBg + ')'
    }}
    const buttonStyle = {...ui.styles.button, ...{
      width: size,
      height: size,
      position: 'absolute',
      opacity: 0
    }}

    return(
      <div style={containerStyle}>
        <div style={backgroundStyle}>
          {this.image(url, imgSize)}
          {url !== null && this.buttons.button(buttonStyle, ['',''], '',()=>{this.onImageClick()})}
        </div>
      </div>
    )
  }

  image(url, size){
    const style = {
      maxHeight: size,
      maxWidth: size,
      backgroundColor: 'white'
    }
    return <img style={style} src={url} alt=''/>
  }

  onImageClick(){
    const actions = this.props.app.actions;
    actions.main.enlargeImage(this.props.url);
  }

}

export default Image;

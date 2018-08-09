import React from 'react';
import UI from 'components/UI';

import no_image from 'resources/images/general/no_image.png';

class Image extends UI {

  constructor(props){
    super(props);
    this.init(props);
    this.state = {
      url: null
    }
    this.getIconUrl(this.props);
  }

  componentWillReceiveProps(newProps){
    this.init(newProps);
    this.getIconUrl(newProps);
  }

  async getIconUrl(props){
    if(!props.filename){ return; }
    const url = await this.func.url(props.filename, props.type);
    this.setState({
      url: url
    });
  }

  render(){
    this.init(this.props);
    const url = this.props.photoUrl? this.props.photoUrl: this.state.url;
    const size = this.props.size;

    const containerStyle = {...this.ui.styles.border , ...this.ui.styles.container, ...{
      width: size,
      height: size,
      backgroundColor: 'white'
    }}
    const imgBg = url? null: no_image;
    const imgSize = size * 0.95;
    const backgroundStyle = {...this.ui.styles.container, ...{
      width: imgSize,
      height: imgSize,
      backgroundImage: 'url(' + imgBg + ')'
    }}
    const buttonStyle = {...this.ui.styles.button, ...{
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
    if(!this.props.photoUrl && !this.state.url){ return; }
    this.actions.main.enlargeImage(this.props.photoUrl?this.props.photoUrl:this.state.url);
  }

}

export default Image;

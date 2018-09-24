import React from 'react';
import UI from 'components/UI';
import {Motion, spring}  from 'react-motion';

import ImageCell from 'components/main/items/ImageCell';

import avatar1 from 'resources/images/default/profile/avatar1.png';
import avatar2 from 'resources/images/default/profile/avatar2.png';
import avatar3 from 'resources/images/default/profile/avatar3.png';
import avatar4 from 'resources/images/default/profile/avatar4.png';

import ycis from 'resources/images/default/school/ycis.jpg';

class DefaultImagePicker extends UI {

  constructor(props){
    super(props);
    this.init(props);
    this.state = {
      defaultImages: {
        profile: [[avatar1, avatar2, avatar3, avatar4]],
        school: [[ycis]],
        course: [[avatar1, avatar2, avatar3, avatar4]],
        subject: [[avatar1, avatar2, avatar3, avatar4]],
        project: [[avatar1, avatar2, avatar3, avatar4]],
        card: [[avatar1, avatar2, avatar3, avatar4]]
      },
      cellPointed: false
    }
  }

  render() {
    this.init(this.props);
    this.status = this.store.main.defaultImagePicker;
    //console.log(this.buttons.bs)
    const isOpen = this.status !== 'off';

    const pickerStyle = {...this.bs, ...this.ui.styles.container, ...{
      position: 'absolute',
      justifyContent: 'center',
      backgroundColor: 'rgba(0,0,0,0.95)',
      pointerEvents: isOpen? 'auto': 'none'
    }}

    return(
      <Motion defaultStyle={{opacity: this.atHome? 0: isOpen?0:1.5}}
      style={{opacity: this.atHome? 0: isOpen?spring(1.5):spring(0)}}>
        {style=>(
          <div style={{...pickerStyle, ...{opacity: style.opacity}}}>
            {this.buttons.absoluteClose(()=>{this.actions.main.setDefaultImagePicker('off')})}
            {this.defaultImages()}
          </div>
        )}
      </Motion>
    )
  }

  defaultImages(){
    const containerStyle = {...this.ui.styles.area, ...this.ui.styles.container, ...{
      //width: this.state.cellPointed? this.bs.width: this.bs.width * 0.75,
      flexFlow: 'row nowrap'
    }}
    const width = this.bs.width;
    const minWidth = width * 0.75;
    const pointed = this.state.cellPointed;
    const imageSet = this.state.defaultImages[this.status];
    if(!imageSet){ return null; }
    return imageSet.map((images, i)=>{
      return(
        <Motion key={i} defaultStyle={{width: pointed? minWidth: width}}
        style={{width: pointed?spring(width): spring(minWidth)}}>
          {style=>(
            <div style={{...containerStyle, ...{width: style.width}}}>
              {images.map((img, i)=>{
                return <ImageCell key={i} index={i} app={this.app} url={img} onPointed={()=>{this.setState({cellPointed: true})}} onUnPointed={()=>{this.setState({cellPointed: false})}}/>
              })}
            </div>
          )}
        </Motion>
      )
    });
  }
}

export default DefaultImagePicker;

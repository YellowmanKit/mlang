import React from 'react';
import UI from 'components/UI';
import {Motion, spring}  from 'react-motion';

class Enlarger extends UI {

  render() {
    this.init(this.props);
    const main = this.store.main;
    const status = main.enlarger;
    //console.log(this.buttons.bs)
    const isOpen = status !== 'off';

    const enlargerStyle = {...this.bs, ...{
      position: 'absolute',
      minHeight: this.bs.minHeight,
      justifyContent: 'center',
      backgroundColor: 'rgba(0,0,0,0.95)',
      pointerEvents: isOpen? 'auto': 'none'
    }}

    const textStyle = {
      color: 'white',
      fontWeight: 'bold',
      width: '100%',
      height: '',
      fontSize: '200%',
      overflow: 'auto',
      overflowWrap: 'break-word',
      textAlign: 'center'
    }

    return(
      <Motion defaultStyle={{opacity: isOpen?0:1.5}}
      style={{opacity: isOpen?spring(1.5):spring(0)}}>
        {style=>(
          <div style={{...enlargerStyle, ...{opacity: style.opacity}}}>
            {this.buttons.absoluteClose(()=>{this.actions.main.closeEnlarger()})}
            {status === 'image' &&
            <img src={main.enlargeImage} style={{maxWidth: this.bs.width}} alt=''/>}
            {status === 'text' &&
            <div style={textStyle}>{main.enlargeText}</div>}
          </div>
        )}
      </Motion>
    )
  }

}

export default Enlarger;

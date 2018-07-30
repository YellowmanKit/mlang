import React from 'react';
import UI from 'components/UI';

class Enlarger extends UI {

  render() {
    this.init(this.props);
    const main = this.store.main;
    const status = main.enlarger;
    //console.log(this.buttons.bs)
    if(status === 'off'){
      return null;
    }

    const style = {...this.bs, ...{
      position: 'absolute',
      minHeight: this.bs.minHeight,
      backgroundColor: 'rgba(1,1,1,0.9)',
      justifyContent: 'center'
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
      <div style={style}>
        {this.buttons.absoluteClose(()=>{this.actions.main.closeEnlarger()})}
        {status === 'image' &&
        <img src={main.enlargeImage} style={{maxWidth: this.bs.width}} alt=''/>}
        {status === 'text' &&
        <div style={textStyle}>{main.enlargeText}</div>}
      </div>
    )
  }

}

export default Enlarger;

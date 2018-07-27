import React from 'react';
import UI from 'components/UI';

class Enlarger extends UI {

  render() {
    const app = this.props.app;
    const main = app.store.main;
    const status = main.enlarger;
    //console.log(this.buttons.bs)
    if(status === 'off'){
      return null;
    }
    const ui = app.store.ui;
    const bs = ui.basicStyle;

    const style = {...ui.basicStyle, ...{
      position: 'absolute',
      width: bs.width,
      height: bs.height,
      minHeight: bs.minHeight,
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

    this.buttons.init(app);
    return(
      <div style={style}>
        {this.buttons.absoluteClose(()=>{app.actions.main.closeEnlarger()})}
        {status === 'image' &&
        <img src={main.enlargeImage} style={{maxWidth: bs.width}} alt=''/>}
        {status === 'text' &&
        <div style={textStyle}>{main.enlargeText}</div>}
      </div>
    )
  }

}

export default Enlarger;

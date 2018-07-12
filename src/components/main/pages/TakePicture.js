import React from 'react';
import UI from 'components/UI';

import background2 from 'resources/images/general/background2.png';

class TakePicture extends UI {

  image(){
    const app = this.props.app;
    const bs = app.store.ui.basicStyle;
    const imgStyle = {
      maxWidth: bs.maxWidth,
      maxHeight: bs.maxHeight
    }
    return <img style={imgStyle} src={app.store.main.photo} alt='' />
  }

  render() {
    const app = this.props.app;
    const ui = app.store.ui;
    const pageStyle = Object.assign({},ui.basicStyle,{
      justifyContent: 'center',
      backgroundImage: 'url(' + background2 + ')',
      backgroundSize: '100% 100%',
    })
    //const func = app.functions;
    return(
      <div style={pageStyle}>
        {this.image()}
        {this.absoluteButton('take picture', ()=>{ app.actions.main.setStatus('capture'); })}
      </div>
    )
  }

}

export default TakePicture;

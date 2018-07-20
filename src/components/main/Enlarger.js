import React from 'react';
import UI from 'components/UI';
import Image from 'components/main/items/ui/Image';

class Enlarger extends UI {

  render() {
    const app = this.props.app;
    const main = app.store.main;
    const status = main.enlarger;
    if(status === 'off'){
      return null;
    }

    const ui = app.store.ui;
    const bs = ui.basicStyle;

    const containerStyle = Object.assign({},ui.basicStyle, {
      position: 'absolute',
      width: bs.width,
      height: bs.height,
      minHeight: bs.minHeight,
      backgroundColor: 'rgba(1,1,1,0.5)',
      justifyContent: 'center'
    });
    return(
      <div style={containerStyle}>
        {status === 'image' && <Image app={this.props.app} url={main.enlargeImage} size={bs.width * 1}/>}
      </div>
    )
  }

}

export default Enlarger;

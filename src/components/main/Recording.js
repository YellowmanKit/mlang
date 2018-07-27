import React from 'react';
import UI from 'components/UI';

class Recording extends UI {

  render() {
    const app = this.props.app;
    const main = app.store.main;
    const isRecording = main.recording;
    if(!isRecording){
      return null;
    }

    const ui = app.store.ui;
    const bs = ui.basicStyle;
    const func = app.functions;

    const containerStyle = Object.assign({},ui.basicStyle, ui.styles.button, {
      position: 'absolute',
      width: bs.width,
      height: bs.height,
      minHeight: bs.minHeight,
      backgroundColor: 'white',
      opacity: 0.9,
      justifyContent: 'center'
    });
    return(
      <button onClick={main.onRecordStop} style={containerStyle}>
        {this.textDisplay(func.multiLang('Recording...','錄音中...'),['100%','25%'],'300%')}
        {this.gap(bs.height * 0.05)}
        {this.textDisplay(func.multiLang('Tap to stop','輕觸即可停止'),['100%','25%'],'150%')}
      </button>
    )
  }

}

export default Recording;

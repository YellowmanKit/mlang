import React from 'react';
import UI from 'components/UI';

class Recording extends UI {

  render() {
    this.init(this.props);

    const main = this.store.main;
    const isRecording = main.recording;
    if(!isRecording){
      return null;
    }

    const containerStyle = {...this.ui.basicStyle, ...this.ui.styles.button, ...{
      position: 'absolute',
      width: this.bs.width,
      height: this.bs.height,
      minHeight: this.bs.minHeight,
      backgroundColor: 'white',
      opacity: 0.9,
      justifyContent: 'center'
    }}
    return(
      <button onClick={main.onRecordStop} style={containerStyle}>
        {this.textDisplay(this.func.multiLang('Recording...','錄音中...'),['100%','25%'],'300%')}
        {this.gap(this.bs.height * 0.05)}
        {this.textDisplay(this.func.multiLang('Tap to stop','輕觸即可停止'),['100%','25%'],'150%')}
      </button>
    )
  }

}

export default Recording;

import React from 'react';
import UI from 'components/UI';
import {Motion, spring} from 'react-motion';
import Nyan from './Nyan';

class Recording extends UI {

  constructor(props){
    super(props);
    this.state = { time: 0 }
  }

  componentWillReceiveProps(newProps){
    if(!this.props.app.store.main.recording && newProps.app.store.main.recording){
      this.onStart();
    }
  }

  onStart(){
    this.counter = setTimeout(()=>{ this.setState({ time: this.state.time + 1 }); this.onStart(); }, 1000);
  }

  onEnd(){
    clearTimeout(this.counter);
    this.setState({ time: 0 });
  }

  render() {
    this.init(this.props);

    const main = this.store.main;
    const isOpen = main.recording;

    const containerStyle = {...this.bs, ...this.ui.styles.button, ...this.ui.styles.container, ...{
      position: 'absolute',
      minHeight: this.bs.minHeight,
      backgroundColor: 'rgba(255,255,255,0.5)',
      justifyContent: 'center',
      pointerEvents: isOpen? '':'none'
    }}
    const nyanSize = [this.bs.height * 0.075, this.bs.height * 0.075];
    const time = this.state.time;
    return(
      <Motion defaultStyle={{opacity: 0}}
      style={{opacity: isOpen? spring(1.5):spring(0)}}>
        {style=>(
          <button onClick={()=>{ this.onEnd(); main.onRecordStop(); }} style={{...containerStyle, ...{ opacity: style.opacity }}}>
            {this.textDisplay(this.func.multiLang('Recording...', '錄音中...','录音中...'), ['100%',''], this.bs.height * 0.065)}
            {this.gap(this.bs.height * 0.025)}
            {this.textDisplay(time ,['100%',''], this.bs.height * 0.035, 'center', 'red')}
            <Nyan status={'runningLeft'} size={nyanSize} app={this.app}/>
            {this.gap(this.bs.height * 0.025)}
            {this.textDisplay(this.func.multiLang('Tap to stop','輕觸即可停止','轻触即可停止'), ['100%',''], this.bs.height * 0.035, 'center', 'grey')}
          </button>
        )}
      </Motion>
    )
  }

}

export default Recording;

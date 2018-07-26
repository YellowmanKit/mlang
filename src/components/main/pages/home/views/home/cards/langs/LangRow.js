import React from 'react';
import UI from 'components/UI';
import Sound from 'react-sound';

import icon_play from 'resources/images/buttons/buttonIcons/play_grey.png';
import icon_stop from 'resources/images/buttons/buttonIcons/stop_grey.png';

class LangRow extends UI {

  constructor(props){
    super(props);
    this.state = {
      isPlaying: false
    }
  }

  playback(){
    if(this.state.isPlaying){ return; }
    this.setState({
      isPlaying: true
    })
  }

  onPlaybackEnd(){
    this.setState({
      isPlaying: false
    })
  }

  stopPlayback(){
    if(!this.state.isPlaying){ return; }
    this.onPlaybackEnd();
  }

  langRow(){
    const app = this.props.app;
    const ui = app.store.ui;
    const bs = ui.basicStyle;
    const lang = this.props.lang;

    const rowStyle = Object.assign({}, ui.basicStyle, {
      width: '100%',
      height: this.props.single? bs.height * 0.37: bs.height * 0.185,
      backgroundColor: 'white',
      borderBottom: '4px solid ' + ui.colors.ultraLightGrey,
      flexShrink: 0
    });

    return(
      <div style={rowStyle}>
        {this.audio(lang)}
        {this.langBar(lang)}
        {this.langText(lang.text)}
        {this.gap('1%')}
      </div>
    )

  }

  audio(lang){
    const app = this.props.app;
    const func = app.functions;
    if(this.state.isPlaying){
      return(
        <Sound
        url={func.url(lang.audio, 'langAudio')}
        playStatus={Sound.status.PLAYING}
        onFinishedPlaying={this.onPlaybackEnd.bind(this)}/>
      )
    }
    return null;
  }

  langBar(lang){
    const app = this.props.app;
    const func = app.functions;
    const ui = app.store.ui;
    const bs = ui.basicStyle;

    const barStyle = {...ui.styles.area, ...{
      width: '100%',
      height: bs.height * 0.065,
      alignItems: 'center',
      justifyContent: 'flex-start',
      flexShrink: 0
    }}

    const sizeSmall = [bs.width * 0.05,bs.width * 0.05];

    return(
      <div style={barStyle}>
        {this.verGap('1%')}
        {this.textDisplay(func.langKeyToLangName(lang.key), ['75%',''], '75%', 'left', ui.colors.deepDarkGrey)}
        {this.verGap('12%')}
        {!this.state.isPlaying && this.buttons.langBar(icon_play , 0.25, sizeSmall,()=>{this.playback()})}
        {this.state.isPlaying && this.buttons.langBar(icon_stop, 0.25, sizeSmall,()=>{this.stopPlayback()})}
      </div>
    )
  }

  langText(text){
    const app = this.props.app;
    const actions = app.actions;
    const ui = app.store.ui;
    const style = {...ui.styles.button, ...{
      width: '95%',
      height: '',
      fontSize: '200%',
      overflow: 'auto',
      overflowWrap: 'break-word',
      textAlign: 'left'
    }}
    return(
      <button style={style} onClick={()=>{actions.main.enlargeText(text)}}>
        {text}
      </button>
    )
  }

  render() {
    return this.langRow();
  }

}

export default LangRow;

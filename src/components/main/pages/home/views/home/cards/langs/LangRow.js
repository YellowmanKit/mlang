import React from 'react';
import UI from 'components/UI';
import WAVEInterface from 'components/audio/waveInterface';

import icon_cross from 'resources/images/buttons/buttonIcons/cross_grey.png';
import icon_recorder from 'resources/images/buttons/buttonIcons/recorder_grey.png';
import icon_play from 'resources/images/buttons/buttonIcons/play_grey.png';
import icon_stop from 'resources/images/buttons/buttonIcons/stop_grey.png';

class LangRow extends UI {
  waveInterface = new WAVEInterface();

  componentWillMount() { this.waveInterface.reset(); }
  componentWillUnmount() { this.waveInterface.reset(); }

  record(){
    const actions = this.props.app.actions;

    this.waveInterface.reset();

    this.waveInterface.startRecording()
    .then(() => {
      actions.main.setAudioRecorder({recording: true, onRecordStop: ()=>{this.stopRecord()}});
    })
    .catch((err) => {
      actions.modal.errorMessage([err.message, err.message]);
      throw err;
    })
  }

  stopRecord(){
    const actions = this.props.app.actions;
    this.waveInterface.stopRecording()
    actions.main.setAudioRecorder({recording: false, onRecordStop: null});

    const _blob = this.waveInterface.audioData;
    const _url = URL.createObjectURL(_blob);
    actions.langs.setLangAudio({index: this.props.index, blob: _blob, url: _url});
  }

  playback(){
    const editLang = this.props.editLang;
    if(editLang.audioPlaying || !editLang.audioBlob){ return; }
    const actions = this.props.app.actions;
    this.waveInterface.startPlayback(false,this.props.editLang.audioBlob, ()=>{this.onPlaybackEnd()})
    .then(()=>{
      actions.langs.setEditLang({index: this.props.index, editLang: {...this.props.editLang, audioPlaying: true}});
    })
  }

  onPlaybackEnd(){
    const actions = this.props.app.actions;
    actions.langs.setEditLang({index: this.props.index, editLang: {...this.props.editLang, audioPlaying: false}});
  }

  stopPlayback(){
    if(!this.props.editLang.audioPlaying){ return; }
    this.waveInterface.stopPlayback();
    const actions = this.props.app.actions;
    actions.langs.setEditLang({index: this.props.index, editLang: {...this.props.editLang, audioPlaying: false}});
  }

  langRow(){
    const app = this.props.app;
    const ui = app.store.ui;
    const bs = ui.basicStyle;
    const editLang = this.props.editLang;
    const i = this.props.index;

    const rowStyle = Object.assign({}, ui.basicStyle, {
      width: bs.width * 0.9,
      height: bs.height * 0.185,
      backgroundColor: 'white',
      borderBottom: '5px solid ' + ui.ultraLightGrey,
      flexShrink: 0
    });

    return(
      <div key={editLang.key} style={rowStyle}>
        {this.langBar(i, editLang)}
        {this.textArea('langText' + i, [bs.width * 0.87, bs.height * 0.1], '150%', '', this.onTextChange.bind(this))}
        {this.gap('1%')}
      </div>
    )
  }

  langBar(i, lang){
    const app = this.props.app;
    const ui = app.store.ui;
    const bs = ui.basicStyle;

    const barStyle = Object.assign({}, ui.areaStyle, {
      width: bs.width * 0.9,
      height: bs.height * 0.065,
      alignItems: 'center'
    });

    const sizeSmall = [bs.width * 0.05,bs.width * 0.05];
    const sizeBig = [bs.width * 0.06,bs.width * 0.06];

    const audioBlob = this.props.editLang.audioBlob;
    const isPlaying = this.props.editLang.audioPlaying;

    return(
      <div style={barStyle}>
        {this.verGap('1%')}
        {this.optionBar('langKey' + i, ['30%','75%'], this.langKeyOptions(), this.langKeyDefault(i), this.onOptionChange.bind(this))}
        {this.verGap('9%')}
        {this.barButton(icon_recorder, audioBlob? 1: 0.2, sizeBig, ()=>{this.record(i)})}
        {this.verGap('8%')}
        {this.barButton(icon_play , (audioBlob && !isPlaying)? 1:0.2, sizeSmall,()=>{this.playback(i)})}
        {this.verGap('8%')}
        {this.barButton(icon_stop, (audioBlob && isPlaying)? 1:0.2, sizeBig,()=>{this.stopPlayback(i)})}
        {this.verGap('18%')}
        {i > 0 && this.barButton(icon_cross, 0.1, sizeSmall,()=>{app.actions.langs.removeEditLangsItem(i)})}
        {this.verGap('1%')}
      </div>
    )
  }

  onOptionChange(event){
    //console.log(event.target.value)
    const app = this.props.app;
    const func = app.functions;
    const langName = event.target.value;
    const _key = func.langNameToLangKey(langName);
    app.actions.langs.setEditLang({index: this.props.index, editLang: {...this.props.editLang, key: _key}});
  }

  onTextChange(event){
    const app = this.props.app;
    const _text = event.target.value;
    app.actions.langs.setEditLang({index: this.props.index, editLang: {...this.props.editLang, text: _text}});
  }

  langKeyOptions(){
    const app = this.props.app;
    const func = app.functions;
    var options = [];
    const langKeys = app.store.langs.langKeys;
    for(var i=langKeys.length - 1;i>=0;i--){
      if(langKeys[i].use){
        options.splice(0,0,func.langKeyToLangName(langKeys[i].key));
      }
    }
    return options;
  }

  langKeyDefault(i){
    const app = this.props.app;
    const editLangs = app.store.langs.editLangs;
    return app.functions.langKeyToLangName(editLangs[i].key);
  }

  render() {
    return this.langRow();
  }

}

export default LangRow;

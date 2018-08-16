import React from 'react';
import UI from 'components/UI';
import RecorderBar from 'components/audio/RecorderBar';

import icon_cross from 'resources/images/buttons/buttonIcons/cross_grey.png';

class LangEditRow extends UI {

  constructor(props){
    super(props);
    this.init(props);
    this.state = {
      modified: false,
      audioblob: null
    }
    this.editLang = this.props.editLang;
    this.getAudioblob(props);
  }

  componentWillReceiveProps(newProps){
    this.editLang = newProps.editLang;
    this.init(newProps);
    this.getAudioblob(newProps);
  }

  async getAudioblob(props){
    if(!this.editLang.defaultAudio || this.state.audioblob){ return; }
    const url = await this.func.url(this.editLang.defaultAudio, 'langAudio');
    const res = await fetch(url);
    const blob = await res.blob();
    this.setState({
      audioblob: blob
    });
  }

  langRow(){
    const i = this.props.index;

    const rowStyle = {...this.bs, ...{
      width: this.bs.width * 0.9,
      height: this.bs.height * 0.185,
      backgroundColor: 'white',
      borderBottom: '5px solid ' + this.ui.colors.ultraLightGrey,
      flexShrink: 0
    }}

    return(
      <div key={this.editLang.key} style={rowStyle}>
        {this.langBar(i, this.editLang)}
        {this.inputs.textArea('langText' + i, [this.bs.width * 0.87, this.bs.height * 0.1], '150%', this.editLang.text, this.onTextChange.bind(this))}
        {this.gap('1%')}
      </div>
    )
  }

  langBar(i, lang){
    const barStyle = {...this.ui.styles.area, ...{
      width: this.bs.width * 0.9,
      height: this.bs.height * 0.065,
      alignItems: 'center'
    }}

    const audioBlob =
    this.editLang.audioBlob? this.editLang.audioBlob:
    this.state.audioblob;
    return(
      <div style={barStyle}>
        {this.verGap('1%')}
        {this.inputs.optionBar('langKey' + i, ['30%','75%'], this.langKeyOptions(), this.langKeyDefault(i), this.onOptionChange.bind(this))}
        <RecorderBar app={this.app} scale={['65%','100%']} audioBlob={audioBlob} onStopRecording={this.onStopRecording.bind(this)} canRemove={false}/>
        {i > 0 && this.buttons.langBar(icon_cross, 0.1, [this.bs.width * 0.05,this.bs.width * 0.05],()=>{this.actions.langs.removeEditLangsItem(i)})}
        {this.verGap('1%')}
      </div>
    )
  }

  onStopRecording(blob){
    this.actions.langs.setLangAudio({index: this.props.index, blob: blob});
  }

  onOptionChange(event){
    //console.log(event.target.value)
    const langName = event.target.value;
    const _key = this.func.langNameToLangKey(langName);
    this.actions.langs.setEditLang({index: this.props.index, editLang: {...this.editLang, key: _key}});
  }

  onTextChange(event){
    const _text = event.target.value;
    this.actions.langs.setEditLang({index: this.props.index, editLang: {...this.editLang, text: _text}});
  }

  langKeyOptions(){
    var options = [];
    const langKeys = this.store.langs.langKeys;
    for(var i=langKeys.length - 1;i>=0;i--){
      if(langKeys[i].use){
        options.splice(0,0,this.func.langKeyToLangName(langKeys[i].key));
      }
    }
    return options;
  }

  langKeyDefault(i){
    return this.func.langKeyToLangName(this.store.langs.editLangs[i].key);
  }

  render() {
    this.init(this.props);
    return this.langRow();
  }

}

export default LangEditRow;

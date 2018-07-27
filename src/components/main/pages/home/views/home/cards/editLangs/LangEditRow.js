import React from 'react';
import UI from 'components/UI';
import RecorderBar from 'components/audio/RecorderBar';

import icon_cross from 'resources/images/buttons/buttonIcons/cross_grey.png';

class LangEditRow extends UI {

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
      borderBottom: '5px solid ' + ui.colors.ultraLightGrey,
      flexShrink: 0
    });

    return(
      <div key={editLang.key} style={rowStyle}>
        {this.langBar(i, editLang)}
        {this.inputs.textArea('langText' + i, [bs.width * 0.87, bs.height * 0.1], '150%', editLang.text, this.onTextChange.bind(this))}
        {this.gap('1%')}
      </div>
    )
  }

  langBar(i, lang){
    const app = this.props.app;
    const ui = app.store.ui;
    const bs = ui.basicStyle;

    const barStyle = {...ui.styles.area, ...{
      width: bs.width * 0.9,
      height: bs.height * 0.065,
      alignItems: 'center'
    }}

    const audioBlob = this.props.editLang.audioBlob;
    return(
      <div style={barStyle}>
        {this.verGap('1%')}
        {this.inputs.optionBar('langKey' + i, ['30%','75%'], this.langKeyOptions(), this.langKeyDefault(i), this.onOptionChange.bind(this))}
        <RecorderBar app={app} scale={['65%','100%']} audioBlob={audioBlob} onStopRecording={this.onStopRecording.bind(this)} canRemove={false}/>
        {i > 0 && this.buttons.langBar(icon_cross, 0.1, [bs.width * 0.05,bs.width * 0.05],()=>{app.actions.langs.removeEditLangsItem(i)})}
        {this.verGap('1%')}
      </div>
    )
  }

  onStopRecording(blob){
    const actions = this.props.app.actions;
    actions.langs.setLangAudio({index: this.props.index, blob: blob});
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

export default LangEditRow;

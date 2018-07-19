import React from 'react';
import UI from 'components/UI';

import ImagePicker from 'components/main/items/ImagePicker';

import btn_green from 'resources/images/buttons/btn_green.png';
import icon_cross from 'resources/images/buttons/buttonIcons/cross_grey.png';
import icon_recorder from 'resources/images/buttons/buttonIcons/recorder_grey.png';
import icon_play from 'resources/images/buttons/buttonIcons/play_grey.png';
import icon_stop from 'resources/images/buttons/buttonIcons/stop_grey.png';

class AddCard extends UI {

  componentDidMount(){
    this.pushRow();
  }

  pushRow(){
    const app = this.props.app;
    const langs = app.store.langs;
    const langKeys = langs.langKeys;
    const editLangs = langs.editLangs;
    const length = editLangs.length;
    var newLangRow = {
      key: langKeys[length].key,
      text: '',
      audio: null
    }
    app.actions.langs.pushEditLangs(newLangRow);
  }

  removeRow(i){
    const app = this.props.app;
    app.actions.langs.removeEditLangsItem(i);
  }

  langsEditor(){
    const app = this.props.app;
    const ui = app.store.ui;
    const bs = ui.basicStyle;
    const langs = app.store.langs;
    const editLangs = langs.editLangs;

    const editorStyle = Object.assign({}, ui.basicStyle, ui.listStyle, {
      width: bs.width * 1,
      height: bs.height * 0.45,
      backgroundColor: ui.ultraLightGrey
    })
    return(
      <div style={editorStyle}>
        {this.langRows()}
        {editLangs.length < app.store.langs.langKeys.length && this.listAddButton([bs.width * 0.9, bs.height * 0.075], ()=>{this.pushRow()}, ['ADD LANG ROW','增加語言欄'], '200%')}
      </div>
    )
  }

  langRows(){
    const app = this.props.app;
    const ui = app.store.ui;
    const bs = ui.basicStyle;
    const langs = app.store.langs;
    const editLangs = langs.editLangs;

    const rowStyle = Object.assign({}, ui.basicStyle, {
      width: bs.width * 0.9,
      height: bs.height * 0.185,
      backgroundColor: 'white',
      borderBottom: '5px solid ' + ui.ultraLightGrey,
      flexShrink: 0
    });

    return editLangs.map((lang,i)=>{
      return(
        <div key={i} style={rowStyle}>
          {this.langBar(i)}
          {this.textArea('lang' + i, [bs.width * 0.87, bs.height * 0.1], '150%', '')}
          {this.gap('1%')}
        </div>
      )
    })
  }

  langBar(i){
    const app = this.props.app;
    const ui = app.store.ui;
    const bs = ui.basicStyle;

    const barStyle = Object.assign({}, ui.areaStyle, {
      width: bs.width * 0.9,
      height: bs.height * 0.065,
      alignItems: 'center'
    });

    return(
      <div style={barStyle}>
        {this.verGap('1%')}
        {this.optionBar('langKey' + i, ['30%','75%'], this.langKeyOptions(), this.langKeyDefault(i))}
        {this.verGap('1%')}
        {this.langAudio(i)}
        {this.verGap('8%')}
        {this.barButton(icon_recorder, [bs.width * 0.06,bs.width * 0.06], ()=>{this.recordAudio(i)})}
        {this.verGap('8%')}
        {this.barButton(icon_play, [bs.width * 0.05,bs.width * 0.05],()=>{this.playAudio(i)})}
        {this.verGap('8%')}
        {this.barButton(icon_stop, [bs.width * 0.06,bs.width * 0.06],()=>{this.stopAudio(i)})}
        {this.verGap('18%')}
        {i > 0 && this.barButton(icon_cross, [bs.width * 0.05,bs.width * 0.05],()=>{this.removeRow(i)})}
        {this.verGap('1%')}
      </div>
    )
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
    const langs = app.store.langs;
    const editLangs = langs.editLangs;
    const langName = app.functions.langKeyToLangName(editLangs[i].key);
    return langName;
  }

  langAudio(i){
    const app = this.props.app;
    const ui = app.store.ui;
    const bs = ui.basicStyle;
    const audioStyle = {
      width: bs.width * 0.55,
      height: bs.height * 0.06
    }
    return(
      <audio style={audioStyle}>
        <source src='' type='audio/wav'/>
        Your browser does not support the audio element.
      </audio>
    )
  }

  render() {
    //const app = this.props.app;
    //const func = app.functions;

    return(
      <div style={this.viewStyle()}>
        {this.gap('4%')}

        {this.subTitle(['Icon','照片'])}
        {this.sep()}
        <ImagePicker app={this.props.app} />
        {this.sep()}
        {this.gap('2%')}

        {this.subTitle(['Lang rows','語言欄'])}
        {this.sep()}
        {this.langsEditor()}
        {this.sep()}

        {this.eventButton(['Submit','提交'], btn_green, ()=>{this.addCard()})}
        {this.gap('2%')}
      </div>
    )
  }

  recordAudio(i){

  }

  playAudio(i){

  }

  stopAudio(i){

  }

  addCard(){
    const app = this.props.app;
    //const actions = this.props.app.actions;

    const _icon = app.store.main.photoBlob;
    if(_icon === null){
      return this.failedMessage(['Failed to create! Icon is missing!', '製作失敗! 未有照片!'])
    }

    /*actions.courses.addCourse({
      teacher: app.store.user._id,
      icon: _icon,
      title: _title,
      endDate: _endDate
    });*/
  }
}

export default AddCard;

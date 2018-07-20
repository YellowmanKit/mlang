import React from 'react';
import UI from 'components/UI';

import LangRow from './LangRow';

class LangEditor extends UI {

  componentDidMount(){
    const app = this.props.app;
    const langs = app.store.langs;
    const editLangs = langs.editLangs;
    if(editLangs.length === 0){
      this.pushRow();
    }
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
      audioPlaying: false,
      audioBlob: null,
      audioUrl: ''
    }
    app.actions.langs.pushEditLangs(newLangRow);
  }

  langRows(){
    const app = this.props.app;
    const editLangs = app.store.langs.editLangs;

    return editLangs.map((editLang,i)=>{
      return(
        <LangRow key={editLang.key + i} app={this.props.app} editLang={editLang} index={i}/>
      )
    })
  }

  render() {
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

}

export default LangEditor;

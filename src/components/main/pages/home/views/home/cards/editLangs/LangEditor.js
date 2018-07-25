import React from 'react';
import UI from 'components/UI';

import LangEditRow from './LangEditRow';

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

  langEditRows(){
    const app = this.props.app;
    const editLangs = app.store.langs.editLangs;

    return editLangs.map((editLang,i)=>{
      return(
        <LangEditRow key={editLang.key + i} app={app} editLang={editLang} index={i}/>
      )
    })
  }

  render() {
    const app = this.props.app;
    const ui = app.store.ui;
    const bs = ui.basicStyle;
    const langs = app.store.langs;
    const editLangs = langs.editLangs;

    const editorStyle = {...ui.basicStyle, ...ui.styles.list, ...{
      width: bs.width * 1,
      height: bs.height * 0.45,
      backgroundColor: ui.colors.ultraLightGrey
    }}
    return(
      <div style={editorStyle}>
        {this.langEditRows()}
        {editLangs.length < app.store.langs.langKeys.length && this.buttons.listAdd([bs.width * 0.9, bs.height * 0.075], ['ADD LANG ROW','增加語言欄'], '200%', ()=>{this.pushRow()})}
      </div>
    )
  }

}

export default LangEditor;

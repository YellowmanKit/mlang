import React from 'react';
import UI from 'components/UI';

import LangEditRow from './LangEditRow';

class LangEditor extends UI {

  componentDidMount(){
    this.init(this.props);
    const langs = this.store.langs;
    const editLangs = langs.editLangs;
    if(editLangs.length === 0){
      this.pushRow();
    }
  }

  pushRow(){
    const langs = this.store.langs;
    const langKeys = langs.langKeys;
    const editLangs = langs.editLangs;
    const length = editLangs.length;
    var newLangRow = {
      key: langKeys[length].key,
      text: '',
      audioBlob: null
    }
    this.actions.langs.pushEditLangs(newLangRow);
  }

  langEditRows(){
    const editLangs = this.store.langs.editLangs;
    return editLangs.map((editLang,i)=>{
      return(
        <LangEditRow key={editLang.key + i} app={this.app} editLang={editLang} index={i}/>
      )
    })
  }

  render() {
    this.init(this.props);
    const langs = this.store.langs;
    const editLangs = langs.editLangs;

    const editorStyle = {...this.bs, ...this.ui.styles.list, ...{
      width: this.bs.width * 1,
      height: this.bs.height * 0.45,
      backgroundColor: this.ui.colors.ultraLightGrey
    }}
    return(
      <div style={editorStyle}>
        {this.langEditRows()}
        {editLangs.length < this.store.langs.langKeys.length && this.buttons.listAdd([this.bs.width * 0.9, this.bs.height * 0.075], ['ADD LANG ROW','增加語言欄'], '200%', ()=>{this.pushRow()})}
      </div>
    )
  }

}

export default LangEditor;

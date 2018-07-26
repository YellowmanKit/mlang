import React from 'react';
import UI from 'components/UI';

import LangRow from './LangRow';

class Langs extends UI {

  constructor(props){
    super(props);
    this.state={
      langs:[]
    }
  }

  componentDidMount(){
    this.getLangs(this.props);
  }

  componentWillReceiveProps (newProp){
    this.getLangs(newProp);
  }

  getLangs(props){
    const app = props.app;
    const func = app.functions;
    const langsId = props.card.langs;
    var _langs = [];
    for(var i=0;i<langsId.length;i++){
      _langs.splice(0,0, func.getLangById(langsId[i]))
    }
    this.setState({
      langs: _langs
    })
  }

  langRows(){
    const single = this.state.langs.length === 1? true:false;
    return(
      this.state.langs.slice(0).reverse().map((lang, i)=>{
        return <LangRow key={i} app={this.props.app} lang={lang} single={single}/>
      })
    )
  }

  render() {
    const app = this.props.app;
    const ui = app.store.ui;
    //const bs = ui.basicStyle;
    //const card = this.props.card;

    const langsStyle = {...ui.basicStyle, ...ui.styles.list, ...{
      width: '90%',
      height: '100%',
      backgroundColor: 'white'
    }}
    return(
      <div style={langsStyle}>
        {this.langRows()}
      </div>
    )
  }

}

export default Langs;

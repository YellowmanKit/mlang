import React from 'react';
import UI from 'components/UI';

class Cell extends UI {

  cellImage(type){
    const app = this.props.app;
    const func = app.functions;
    const ui = app.store.ui;
    const bs = ui.basicStyle;
    const append =
    type === 'course'? 'courseIcon':
    type === 'card'? 'cardIcon':
    '';
    const url = func.url(this.props.data.icon, append);

    const imageStyle = {...ui.styles.container, ...ui.styles.border, ...{
      width: bs.width * 0.22,
      height: bs.width * 0.22,
      marginTop: '4%',
      backgroundImage: 'url(' + url + ')'
    }};
    //console.log(url)
    return <div style={imageStyle}/>
  }

  cellTitle(type){
    const app = this.props.app;
    const func = app.functions;
    const data = this.props.data
    const ui = app.store.ui;
    const bs = ui.basicStyle;
    var text = '';
    if(type === 'course'){
      text = this.props.data.title;
    }
    if(type === 'card'){
      const firstLang = func.getLangById(data.langs[0]);
      text = firstLang !== null? firstLang.text: '';
    }

    const scale =
    type === 'course'? [bs.width * 0.23,bs.width * 0.05]:
    type === 'card'? [bs.width * 0.23, bs.width * 0.1]:
    '';

    return this.textDisplay(text, scale, '125%')
  }

  render(){
    const data = this.props.data
    const type = this.props.type;
    //console.log(data)
    if(data === null){
      return null;
    }

    const app = this.props.app;
    const ui = app.store.ui;
    const bs = ui.basicStyle;

    const scale =
    type === 'course'? [bs.width * 0.25,bs.width * 0.25]:
    type === 'card'? [bs.width * 0.25, bs.width * 0.35]:
    '';

    const cellStyle = {...ui.styles.button, ...ui.styles.border, ...{
      width: scale[0],
      height: scale[1],
      margin: '1.5%',
      backgroundColor: 'white',
      flexShrink: 0,
      display: 'flex',
      flexFlow: 'column nowrap',
      alignItems: 'center'
    }}

    return(
      <button style={cellStyle} onClick={this.props.onClick}>
        {this.cellImage(type)}
        {this.cellTitle(type)}
      </button>
    )
  }

}

export default Cell;

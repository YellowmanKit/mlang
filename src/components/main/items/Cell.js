import React from 'react';
import UI from 'components/UI';

class Cell extends UI {

  cellImage(){
    const app = this.props.app;
    const func = app.functions;
    const ui = app.store.ui;
    const bs = ui.basicStyle;
    const type = this.props.type;
    const append =
    type === 'course'? 'courseIcon':
    type === 'card'? 'cardIcon':
    '';
    const url = func.url(this.props.data.icon, append);

    const imageStyle = {...ui.styles.container, ...ui.styles.border, ...{
      width: bs.height * 0.14,
      height: bs.height * 0.14,
      marginTop: '4%',
      backgroundImage: 'url(' + url + ')'
    }};
    console.log(url)
    return <div style={imageStyle}/>
  }

  cellTitle(){
    const text = this.props.data.title;
    return this.textDisplay(text, ['60%','100%'], '125%')
  }

  render(){
    const data = this.props.data
    console.log(data)
    if(data === null){
      return null;
    }

    const app = this.props.app;
    const ui = app.store.ui;
    const bs = ui.basicStyle;

    const cellStyle = {...ui.styles.button, ...ui.styles.border, ...{
      width: bs.height * 0.175,
      height: bs.height * 0.175,
      margin: '1.5%',
      backgroundColor: 'white',
      flexShrink: 0,
      display: 'flex',
      flexFlow: 'column nowrap',
      alignItems: 'center'
    }}

    return(
      <button style={cellStyle} onClick={this.props.onClick}>
        {this.cellImage()}
        {this.cellTitle()}
      </button>
    )
  }

}

export default Cell;

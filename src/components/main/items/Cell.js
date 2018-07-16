import React from 'react';
import UI from 'components/UI';

class Cell extends UI {

  cellTitle(){
    const app = this.props.app;
    const ui = app.store.ui;
    const bs = ui.basicStyle;

    const text = this.props.data.title;
    return this.textDisplay(text, ['60%','100%'], '125%')
  }

  cellImage(){
    const app = this.props.app;
    const ui = app.store.ui;
    const bs = ui.basicStyle;
    const type = 'courseIcon/'
    const url = process.env.REACT_APP_API + '/download/'+ type + this.props.data.icon;

    const imageStyle = Object.assign({}, ui.containerStyle, ui.borderStyle,{
      width: bs.height * 0.14,
      height: bs.height * 0.14,
      marginTop: '4%',
      backgroundImage: 'url(' + url + ')'
    });
    console.log(url)
    return <div style={imageStyle}/>
  }

  render(){

    const app = this.props.app;
    const ui = app.store.ui;
    const bs = ui.basicStyle;

    const cellStyle = Object.assign({}, ui.buttonStyle, ui.borderStyle, {
      width: bs.height * 0.175,
      height: bs.height * 0.175,
      margin: '1.5%',
      backgroundColor: 'white',
      flexShrink: 0,
      display: 'flex',
      flexFlow: 'column nowrap',
      alignItems: 'center'
    })

    return(
      <button style={cellStyle}>
        {this.cellImage()}
        {this.cellTitle()}
      </button>
    )
  }

}

export default Cell;

import React from 'react';
import UI from 'components/UI';
import no_image from 'resources/images/general/no_image.png';

class Row extends UI {

  rowContent(title, rowInfo){
    const app = this.props.app;
    const ui = app.store.ui;
    const bs = ui.basicStyle;

    const infoStyle = Object.assign({}, ui.basicStyle, {
      width: '72%',
      height: bs.height * 0.12,
      marginLeft: bs.height * 0.02
    })
    return(
      <div style={infoStyle}>
        {this.rowTitle(title)}
        {rowInfo()}
      </div>
    )
  }

  rowTitle(title){
    if(!title){
      return null;
    }
    const app = this.props.app;
    const bs = app.store.ui.basicStyle;
    const nameStyle = {
      width: '100%',
      height: bs.height * 0.06,
      fontWeight: 'bold',
      fontSize: '125%',
      textAlign: 'left'
    }
    return <div style={nameStyle}>{title}</div>
  }

  rowIcon(url){
    const app = this.props.app;
    const ui = app.store.ui;
    const bs = ui.basicStyle;

    const iconStyle = Object.assign({}, ui.styles.border, {
      width: bs.height * 0.12,
      height: bs.height * 0.12,
      backgroundColor: ui.colors.lightGrey,
      backgroundImage: 'url(' + (url !== null? url: no_image) + ')',
      backgroundSize: '100% 100%'
    })
    return <div style={iconStyle}></div>
  }

}

export default Row;

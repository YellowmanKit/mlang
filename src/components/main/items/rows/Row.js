import React from 'react';
import UI from 'components/UI';
import no_image from 'resources/images/general/no_image.png';

class Row extends UI {

  rowContent(title, rowInfo){
    const infoStyle = {...this.bs, ...{
      width: '72%',
      height: this.bs.height * 0.12,
      marginLeft: this.bs.height * 0.02
    }}
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
    const nameStyle = {
      width: '100%',
      height: this.bs.height * 0.06,
      fontWeight: 'bold',
      fontSize: '125%',
      textAlign: 'left'
    }
    return <div style={nameStyle}>{title}</div>
  }

  rowIcon(url){
    const iconStyle = {...this.ui.styles.border, ...{
      width: this.bs.height * 0.12,
      height: this.bs.height * 0.12,
      backgroundColor: this.ui.colors.lightGrey,
      backgroundImage: 'url(' + (url !== null? url: no_image) + ')',
      backgroundSize: '100% 100%'
    }}
    return <div style={iconStyle}></div>
  }

}

export default Row;

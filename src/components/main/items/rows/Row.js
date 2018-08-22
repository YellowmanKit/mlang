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
      fontSize: '150%',
      textAlign: 'left'
    }
    return <div style={nameStyle}>{title}</div>
  }

  rowIcon(){
    const size = this.bs.height * 0.12;
    const iconSize = this.bs.height * 0.11;
    const containerStyle = {...this.ui.styles.border , ...this.ui.styles.container, ...{
      width: size,
      height: size,
      backgroundColor: 'white'
    }}
    const iconStyle = {...this.ui.styles.border, ...{
      maxWidth: iconSize,
      maxHeight: iconSize,
      backgroundColor: 'white'
    }}
    return(
      <div style={containerStyle}>
        <img style={iconStyle} src={this.url.url? this.url.url: no_image} alt=''/>
      </div>
    )

  }

}

export default Row;

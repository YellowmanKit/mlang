import React from 'react';
import UI from 'components/UI';
import {Motion, spring}  from 'react-motion';

import no_image from 'resources/images/general/no_image.png';

class Row extends UI {

  rowContent(title, rowInfo){
    const infoStyle = {...this.bs, ...{
      width: '75%',
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
      fontSize: this.bs.width * 0.04,
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

  animatedRow(content, height, onDead){
    const ani = this.store.content.animation.row;
    const option = {stiffness: onDead? 200: 300, damping: 26, precision: 1.2}
    return(
      <Motion defaultStyle={{height: (!ani || onDead)? height: 0, opacity: (!ani || onDead)? 1.1:0}}
      style={{height: spring(onDead? 0:height, option), opacity: spring(onDead?0: 1.1, option)}}
      onRest={onDead? onDead: ()=>{this.actions.content.setAnimation('row',false)}}>
        {style=>content(style)}
      </Motion>
    )
  }

  rowStyle(){
    return(
      {...this.ui.styles.button, ...this.ui.styles.area, ...{
        flexShrink: 0,
        height: this.bs.height * 0.15,
        borderBottom: '1px solid ' + this.ui.colors.darkGrey,
        alignItems: 'center'
      }}
    )
  }

}

export default Row;

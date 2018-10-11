import React from 'react';
import UI from 'components/UI';
import {Motion, spring}  from 'react-motion';

class Cloud extends UI {

  render(){
    this.init(this.props);
    const cloudStyle = {...this.ui.styles.cloud, ...this.ui.styles.container, ...this.ui.styles.border, ...{
      width: this.bs.height * 0.25,
      borderRadius: '15px',
      margin: '5%'
    }}
    const notice = this.props.notice;
    const message = notice.message;
    const index = this.props.index;
    const isOpen = this.props.status !== 'off' && !notice.killed;
    const height = this.bs.height * 0.05;
    return(
      <Motion defaultStyle={{opacity: 0, scale: 0}}
      style={{opacity: isOpen?spring(1.5):spring(0), scale: isOpen? spring(1): spring(0)}}
      onRest={notice.killed? ()=>{ this.actions.notice.removeNotice(index); }:()=>{}}>
        {style=>(
          <div key={index + message} style={{...cloudStyle, ...{opacity: style.opacity, height: height * style.scale}}} onClick={()=>{ this.actions.notice.killNotice(index); }}>
            {this.func.multiLang(message[0], message[1], message[2])}
          </div>
        )}
      </Motion>
    )
  }
}

export default Cloud;

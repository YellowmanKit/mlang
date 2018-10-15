import React from 'react';
import UI from 'components/UI';
import {Motion, spring}  from 'react-motion';

class Cloud extends UI {

  render(){
    this.init(this.props);

    const notice = this.props.notice;
    const message = notice.message;
    const index = this.props.index;
    const height = this.bs.height * 0.05;
    const isOpen = this.props.status !== 'off' && !notice.killed;

    const cloudStyle = {...this.ui.styles.cloud, ...this.ui.styles.container, ...this.ui.styles.border, ...{
      borderRadius: '15px',
      padding: '1%',
      margin: '2%',
      cursor: isOpen? 'pointer':'',
      pointerEvents: isOpen? '':'none'
    }}
    return(
      <Motion defaultStyle={{opacity: 0, scale: 0}}
      style={{opacity: isOpen?spring(1.5):spring(0), scale: isOpen? spring(1): spring(0)}}
      onRest={notice.killed? ()=>{ this.actions.notices.removeNotice(index); }:()=>{}}>
        {style=>(
          <div key={index + message} style={{...cloudStyle, ...{opacity: style.opacity, height: height * style.scale}}} onClick={()=>{ this.actions.notices.killNotice(index); }}>
            {this.func.multiLang(message[0], message[1], message[2])}
          </div>
        )}
      </Motion>
    )
  }
}

export default Cloud;

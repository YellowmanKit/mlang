import React from 'react';
import UI from 'components/UI';
import {Motion, spring}  from 'react-motion';

import Nyan from 'components/main/Nyan';
import Cloud from './Cloud';

class Notice extends UI {

  constructor(props){
    super(props);
    this.init(props);
    this.state = {
      nyan: 'ennui'
    }
  }

  componentWillReceiveProps(newProps){
    this.init(newProps);
    this.setNyan(this.store.notice.status);
  }

  setNyan(status){
    this.setState({
      nyan: status === 'on'? 'sniff': 'ennui'
    })
  }

  render(){
    this.init(this.props);

    const view = this.store.content.view;
    if(view && !view.includes('Home')){ return null; }

    const status = this.store.notice.status;

    const noticeStyle = {...this.ui.styles.container, ...{
      width: this.bs.height * 0.15,
      display: 'flex',
      justifyContent: 'flex-start',
      flexFlow: 'column nowrap',
      position: 'absolute',
      right: this.bs.height * 0.065,
      bottom: this.bs.height * 0.0225
    }}
    const nyanSize = [this.bs.height * 0.075, this.bs.height * 0.075];

    return(
      <div style={noticeStyle}>
        {this.noticesCloud()}
        {this.amountCloud(status === 'off')}
        <Nyan app={this.app} status={this.state.nyan} size={nyanSize} onClick={()=>{this.onNyanClicked()}}/>
      </div>
    )
  }

  noticesCloud(){
    return this.store.notice.notices.map((notice,i)=>{
      if(notice.dead){ return null; }
      return <Cloud key={i} app={this.app} notice={notice} status={this.store.notice.status} index={i}/>
    })
  }

  amountCloud(isOpen){
    const notices = this.store.notice.notices;
    var count = 0;
    for(var i=0;i<notices.length;i++){
      if(!notices[i].dead){ count++; }
    }
    if(count === 0){ return null; }

    const cloudStyle = {...this.ui.styles.container, ...this.ui.styles.cloud, ...this.ui.styles.border, ...{
      width: this.bs.height * 0.03,
      height: this.bs.height * 0.03,
      position: 'absolute',
      right: this.bs.height * 0.04,
      bottom: this.bs.height * 0.04,
      fontSize: this.bs.height * 0.025
    }}
    return(
      <Motion defaultStyle={{opacity: 0}}
      style={{opacity: isOpen?spring(1.5):spring(0)}}>
        {style=>(
          <div style={{...cloudStyle, ...{opacity: style.opacity}}} onClick={this.onNyanClicked.bind(this)}>
            {count}
          </div>
        )}
      </Motion>
    )
  }

  onNyanClicked(){
    this.actions.notice.toggleNotice();
  }
}

export default Notice;

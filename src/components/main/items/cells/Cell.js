import React from 'react';
import UI from 'components/UI';
import {Motion, spring}  from 'react-motion';

import Badge from 'components/main/items/Badge';

import passed from 'resources/images/general/passed.png';

class Cell extends UI {

  componentWillReceiveProps(newProps){
    this.init(newProps);
    const newFilename = newProps.data.icon;
    if(this.state.filename !== newFilename){
      this.setState({ filename: newFilename })
      this.checkUrl();
    }
  }

  cellImage(scale){
    const imageStyle = {...this.ui.styles.container, ...this.ui.styles.border, ...{
      maxWidth: this.state.size[0] * 0.9 * scale,
      maxHeight: this.state.size[1] * 0.8 * scale,
      marginTop: '4%'
    }};
    return <img style={imageStyle} src={this.url.url? this.url.url: null} alt=''/>
  }

  cellTitle(scale){
    var text = this.state.title;
    var size = 100 * scale;
    const textScale =[size + '%',size + '%'];

    return(
      <div style={{flexGrow: 1, overflow: 'hidden'}}>
        {this.textDisplay(text, textScale, this.bs.height * 0.0225)}
      </div>
    )
  }

  alertTag(){
    const style = {
      position: 'absolute',
      top: this.bs.width * -0.02,
      right: this.bs.width * -0.02,
      width: this.bs.width * 0.04,
      height: this.bs.width * 0.04
    }
    return <div style={style}>{this.animatedAlert()}</div>
  }

  passedMark(){
    const style = {
      position: 'absolute',
      width: '100%',
      height: '100%'
    }
    return <img style={style} src={passed} alt=''/>
  }

  render(){
    //this.init(this.props);
    //console.log(data)
    if(!this.props.data){ return null; }
    const outDated = this.state.outDated;
    const size = this.state.size;

    const cellStyle = {...this.ui.styles.button, ...this.ui.styles.border, ...{
      margin: '1.5%',
      backgroundColor: 'white',
      flexShrink: 0,
      display: 'flex',
      flexFlow: 'column nowrap',
      alignItems: 'center',
      position: 'relative'
    }}
    const badgeScale = [this.bs.width * 0.125, this.bs.width * 0.125];

    const isInit = this.state.status === 'init';
    const isOpen = this.state.status === 'pointed';

    return(
      <Motion defaultStyle={{scale: this.props.wasHide? 0: isInit? 1:isOpen? 1: 1.05, opacity: this.props.wasHide? 0: outDated? (isOpen? 0.25:1) : 1}}
      style={{scale: this.props.wasHide? (isOpen? spring(1.05): spring(1)): isInit? 1:isOpen? spring(1.05): spring(1), opacity: outDated? (isOpen? spring(1):spring(0.25)) : spring(1)}}>
        {style=>(
          <button style={{...cellStyle,...{opacity: style.opacity, width: size[0] * style.scale, height: size[1] * style.scale}}}
          onClick={()=>{ this.props.onClick(); }}
          onPointerEnter={()=>{ this.setState({status: 'pointed' })}}
          onPointerLeave={()=>{ this.setState({status: 'not-pointed' })}}>
            {this.props.data.grade && <Badge app={this.app} grade={this.props.data.grade} scale={badgeScale} />}
            {this.cellImage(style.scale)}
            {this.cellTitle(style.scale)}
            {this.state.alert && this.alertTag()}
            {outDated && this.passedMark()}
          </button>
        )}
      </Motion>
    )
  }

}

export default Cell;

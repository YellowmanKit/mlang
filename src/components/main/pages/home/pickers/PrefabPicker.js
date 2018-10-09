import React from 'react';
import UI from 'components/UI';
import {Motion, spring}  from 'react-motion';

import ImageCell from 'components/main/items/ImageCell';

class PrefabPicker extends UI {

  constructor(props){
    super(props);
    this.init(props);
    this.state = {
      pointedCell: null
    }
  }

  componentWillReceiveProps(newProps){
    this.init(newProps);
  }

  prefabs(){
    const prefabsStyle = {...this.ui.styles.container, ...this.ui.styles.area, ...{
      width: this.bs.width,
      height:this.bs.height * 0.45,
      overflowX: 'scroll',
      justifyContent: 'flex-start'
    }}
    const status = this.store.main.prefabPicker;
    if(status === 'off'){ return null;}
    var data = this.removeDuplicates(this.store[status][status].slice(0));

    return(
      <div style={prefabsStyle}>
        {this.verGap('8%')}
        {data.map((item, i)=>{
          return(
            <ImageCell
            key={i} index={i} app={this.app}
            data={item} type={this.getTypeName(status)}
            onPointed={()=>{ this.setState({pointedCell: item}); }} onUnPointed={()=>{ this.setState({pointedCell: null}); }}/>
          )
        })}
        {this.verGap('8%')}
      </div>
    )
  }

  removeDuplicates(data){
    for(var i=0;i<data.length;i++){
      for(var j=0;j<data.length;j++){
        if(i !== j &&
        data[i].title === data[j].title &&
        data[i].description === data[j].description){
          data.splice(i, 1);
        }
      }
    }
    return data;
  }

  getTypeName(status){
    switch (status) {
      case 'subjects':
        return 'subjectIcon'
      case 'projects':
        return 'projectIcon'
      default:
        return ''
    }
  }

  pickerText(text){
    const textStyle = {
      fontSize: this.bs.height * 0.075,
      color: 'white'
    }
    return(
      <div style={textStyle}>
        {text}
      </div>
    )
  }

  render() {
    this.init(this.props);
    const status = this.store.main.prefabPicker;
    //console.log(this.buttons.bs)
    const isOpen = status !== 'off';

    const pickerStyle = {...this.bs, ...this.ui.styles.container, ...{
      position: 'absolute',
      justifyContent: 'center',
      backgroundColor: 'rgba(0,0,0,0.95)',
      pointerEvents: isOpen? 'auto': 'none'
    }}

    return(
      <Motion defaultStyle={{opacity: this.atHome? 0: isOpen?0:1.5}}
      style={{opacity: this.atHome? 0: isOpen?spring(1.5):spring(0)}}>
        {style=>(
          <div style={{...pickerStyle, ...{opacity: style.opacity}}}>
            {this.buttons.absoluteClose(()=>{this.actions.main.setPrefabPicker('off')})}
            {this.state.pointedCell && this.pickerText(this.state.pointedCell.title)}
            {this.prefabs()}
            {this.state.pointedCell && this.pickerText(this.state.pointedCell.description)}
          </div>
        )}
      </Motion>
    )
  }

}

export default PrefabPicker;

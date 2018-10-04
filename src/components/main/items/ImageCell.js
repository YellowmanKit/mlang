import React from 'react';
import UI from 'components/UI';
import {Motion, spring}  from 'react-motion';

class ImageCell extends UI {

  constructor(props){
    super(props);
    this.init(props);
    this.state = { status: ''}
  }

  async onCellSelect(){
    const blob = await this.url.urlToBlob(this.props.url);
    this.actions.main.setPhoto({url: this.props.url, blob: blob});
    this.actions.main.setDefaultImagePicker('off');
  }

  render(){
    this.init(this.props);

    const cellStyle = {
      cursor: 'pointer',
      margin: this.bs.width * 0.01,
      flexShrink: 0
    }
    const size = [this.bs.width * 0.125, this.bs.width * 0.125];

    const isOpen = this.state.status === 'pointed';
    return(
      <Motion defaultStyle={{scale: isOpen? 1: 3}}
      style={{scale: isOpen? spring(3): spring(1)}}>
        {style=>(
          <div style={{...cellStyle,...{width: size[0] * style.scale, height: size[1] * style.scale}}}
          onClick={()=>{ this.onCellSelect(); }}
          onPointerEnter={()=>{ this.setState({status: 'pointed' }); this.props.onPointed(); }}
          onPointerLeave={()=>{ this.setState({status: 'not-pointed' }); this.props.onUnPointed();}}>
            <img src={this.props.url} style={{width: '100%', height: '100%'}} alt=''/>
          </div>
        )}
      </Motion>
    )
  }

}

export default ImageCell;

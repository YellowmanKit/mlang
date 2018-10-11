import React from 'react';
import UI from 'components/UI';
import {Motion, spring}  from 'react-motion';

class PickerOption extends UI {

  constructor(props){
    super(props);
    this.init(props);
    if(this.props.data){
      this.state = {
        filename: props.data.icon,
        type: props.type
      }
    }else{
      this.state = {
        status: ''
      }
    }
  }

  componentWillReceiveProps(newProps){
    this.init(newProps);
    if(!this.props.data){ return; }
    const newFilename = newProps.data.icon;
    if(this.state.filename !== newFilename){
      this.setState({ filename: newFilename })
      this.checkUrl();
    }
  }

  async onCellSelect(){
    const url = this.props.url? this.props.url: this.url.url;
    const blob = await this.url.urlToBlob(url);
    this.actions.main.setPhoto({url: url, blob: blob});
    this.actions.main.setDefaultImagePicker('off');
    this.actions.main.setPrefabPicker('off');
    if(this.props.onClick){
      this.props.onClick();
    }
    if(this.props.data){
      document.getElementById('title').value = this.props.data.title;
      document.getElementById('desc').value = this.props.data.description;
    }
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
      style={{scale: isOpen? spring(2.75): spring(1)}}>
        {style=>(
          <div style={{...cellStyle,...{width: size[0] * style.scale, height: size[1] * style.scale}}}
          onClick={()=>{ this.onCellSelect(); }}
          onPointerEnter={()=>{ this.setState({status: 'pointed' }); this.props.onPointed(); }}
          onPointerLeave={()=>{ this.setState({status: 'not-pointed' }); this.props.onUnPointed();}}>
            <img src={this.props.url? this.props.url: this.url.url} style={{width: '100%', height: '100%'}} alt=''/>
          </div>
        )}
      </Motion>
    )
  }

}

export default PickerOption;

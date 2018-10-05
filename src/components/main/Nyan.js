import React from 'react';
import UI from 'components/UI';

import sit1 from 'resources/images/nyan/sit/sit1.png';
import sit2 from 'resources/images/nyan/sit/sit2.png';

import running_left1 from 'resources/images/nyan/running/running_left1.png';
import running_left2 from 'resources/images/nyan/running/running_left2.png';
import running_left3 from 'resources/images/nyan/running/running_left3.png';
import running_left4 from 'resources/images/nyan/running/running_left4.png';

import running_up1 from 'resources/images/nyan/running/running_up1.png';
import running_up2 from 'resources/images/nyan/running/running_up2.png';
import running_up3 from 'resources/images/nyan/running/running_up3.png';
import running_up4 from 'resources/images/nyan/running/running_up4.png';

import running_down1 from 'resources/images/nyan/running/running_down1.png';
import running_down2 from 'resources/images/nyan/running/running_down2.png';
import running_down3 from 'resources/images/nyan/running/running_down3.png';
import running_down4 from 'resources/images/nyan/running/running_down4.png';

class Nyan extends UI {

  constructor(props){
    super(props);
    this.init(props);
    this.state = {
      animations: {
        sit: {
          frames: [sit1, sit1, sit1, sit1, sit1, sit1, sit1, sit1, sit2],
          time: 300
        },
        runningLeft: {
          frames: [running_left1, running_left2, running_left3, running_left4],
          time: 125
        },
        runningUp: {
          frames: [running_up1, running_up2, running_up3, running_up4],
          time: 125
        },
        runningDown: {
          frames: [running_down1, running_down2, running_down3, running_down4],
          time: 125
        },
      },
      count: 0
    }
    this.playAnimation();
  }

  componentDidMount(){
    this.playAnimation();
  }

  componentWillReceiveProps(newProps){
    this.init(newProps);
    //if(this.store.modal.status === 'off'){ clearTimeout(this.animation); }
    if(!this.animation){ this.playAnimation(); }
  }

  componentWillUnmount(){ clearTimeout(this.animation); }

  playAnimation(){
    if(this.props.status === 'off'){ return null; }
    clearTimeout(this.animation);
    this.animation = setTimeout(()=>{
      this.nextFrame();
      this.playAnimation();
    }, this.state.animations[this.props.status].time)
  }

  nextFrame(){
    var count = this.state.count;
    count++;
    if(count > this.state.animations[this.props.status].frames.length - 1){
      count = 0;
    }
    this.setState({
      count: count
    })
  }

  render(){
    this.init(this.props);
    const size = this.props.size;
    const nyanStyle = {
      width: size[0],
      height: size[1],
      flexShrink: 0,
      cursor: this.props.onClick? 'pointer':''
    }
    if(this.props.status === 'off'){ return <img src={this.state.animations['sit'].frames[0]} style={nyanStyle} alt=''/> }

    var count = this.state.count;
    const length = this.state.animations[this.props.status].frames.length;
    if(count >= length){ count = 0; }
    const url = this.state.animations[this.props.status].frames[count];

    return (
      <img onClick={this.props.onClick} src={url} style={nyanStyle} alt=''/>
    )
  }
}

export default Nyan;

import React from 'react';
import UI from 'components/UI';

import sit1 from 'resources/images/nyan/sit/sit1.png';
import sit2 from 'resources/images/nyan/sit/sit2.png';

import running_left1 from 'resources/images/nyan/running/running_left1.png';
import running_left2 from 'resources/images/nyan/running/running_left2.png';
import running_left3 from 'resources/images/nyan/running/running_left3.png';
import running_left4 from 'resources/images/nyan/running/running_left4.png';

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
        }
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
    if(this.store.modal.status === 'off'){ clearTimeout(this.animation); }
    else if(!this.animation){ this.playAnimation(); }
  }

  componentWillUnmount(){ clearTimeout(this.animation); }

  playAnimation(){
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
    this.init(this.props)
    const nyanStyle = {
      width: this.bs.height * 0.1,
      height: this.bs.height * 0.1,
      flexShrink: 0
    }

    return (
      <img src={this.state.animations[this.props.status].frames[this.state.count]} style={nyanStyle} alt=''/>
    )
  }
}

export default Nyan;

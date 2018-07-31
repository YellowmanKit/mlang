import React from 'react';
import UI from 'components/UI';

class CardBar extends UI {

  constructor(props){
    super(props);
    this.state = {
      expended: false
    }
  }

  render(){
    this.init(this.props);

    const style = {...this.ui.styles.area, ...this.ui.styles.container, ...{
      position: 'absolute',
      justifyContent: 'flex-start',
      bottom: this.bs.width * 0.065,
      right: -this.bs.width * 0.05,
      height: this.bs.width * 0.1,
      width: this.bs.width * 0.35,
      borderRadius: '25px',
      backgroundColor: 'rgba(0,0,0,0.5)'
    }}

    return(
      <div style={style}>
        {this.state.expended && this.buttons.barCollapse()}
        {!this.state.expended && this.buttons.barExpend()}
        {this.verGap('5%')}
        {this.buttons.barComment()}
        {this.verGap('5%')}
        {this.buttons.barAudioComment()}
      </div>
    )
  }
}

export default CardBar;

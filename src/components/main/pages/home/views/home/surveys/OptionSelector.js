import React from 'react';
import UI from 'components/UI';

class OptionSelector extends UI {

  option(option){
    const style = {...this.ui.styles.button, ...this.ui.styles.containerY, ...{
      width: this.bs.width * 0.445,
      height: this.bs.height * 0.049,
      margin: '0.25%',
      backgroundColor: this.props.selected === option? this.ui.colors.mlangGreen: this.ui.colors.lightGrey
    }}
    return(
      <div style={style} key={this.key()} onClick={()=>{ this.props.onSelect(option, this.props.qid) }}>
        {this.textDisplay(option, [this.bs.width * 0.45, ''], '', 'center')}
      </div>
    )
  }

  render(){
    this.init(this.props);
    const style = {...this.ui.styles.area, ...{
      width: this.bs.width * 0.9,
      height: '',
      flexFlow: 'row wrap',
      backgroundColor: this.ui.colors.ultraLightGrey
    }}
    return(
      <div style={style}>
        {this.props.options.map((option, i)=>{ return this.option(option, i); })}
      </div>
    )
  }

}

export default OptionSelector;

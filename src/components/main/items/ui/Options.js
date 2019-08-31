import React from 'react';
import UI from 'components/UI';
import icon_cross from 'resources/images/buttons/buttonIcons/cross_grey.png';

class Options extends UI {

  optionRow(option, index){
    const style = {
      width: this.bs.width * 0.425,
      height: this.bs.height * 0.05,
      flexShrink: 0
    }
    return(
      <div style={style} key={option.key}>
        {this.inputs.inputField('option' + index, 'text', ['New option', '新選項', '新选项'], option.name,
        (e)=>{ this.changeName(index, option.key, e.target.value) }, [this.bs.width * 0.35, this.bs.height * 0.035])}
        {this.buttons.langBar(icon_cross, 0.1, [this.bs.height * 0.02, this.bs.height * 0.02],
          ()=>{this.removeOption(index)})}
      </div>
    )
  }

  addOptionButton(){
    const style = {
      width: this.bs.width * 0.3,
      height: this.bs.height * 0.04,
      backgroundColor: this.ui.colors.grey,
      fontSize: this.bs.height * 0.02,
      margin: '2%'
    }
    return this.buttons.button(style, ['ADD OPTION','增加選項','增加选项'], '', ()=>{ this.addOption() })
  }

  render(){
    this.init(this.props);
    const style = {...this.ui.styles.area, ...{
      width: this.bs.width * 0.9,
      height: '',
      flexFlow: 'row wrap',
      overflow: 'auto'
    }}
    return(
      <div style={style}>
        {this.props.options.map((option, i)=>{ return this.optionRow(option, i) })}
        {this.addOptionButton()}
      </div>
    )
  }

  changeName(index, key, newName){
    const options = this.props.options.slice(0);
    options.splice(index, 1, { key: key, name: newName});
    this.props.onChange(options);
  }

  removeOption(index){
    const options = this.props.options.slice(0);
    options.splice(index, 1);
    this.props.onChange(options);
  }

  addOption(){ this.props.onChange([...this.props.options, { key: this.key(), name: ''}]) }

}

export default Options;

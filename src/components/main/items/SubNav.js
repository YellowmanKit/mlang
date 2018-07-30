import React from 'react';
import UI from 'components/UI';

class SubNav extends UI {

  subNavOptions(){
    const areaStyle = {...this.ui.styles.area, ...{
      height: '100%',
      alignItems: 'center',
      flexGrow: 1
    }}
    const optionStyle = {...this.ui.styles.button, ...{
      width: '100%',
      height: '100%'
    }}
    const tagStyle = {
      width: '100%',
      fontSize: '150%',
      textAlign: 'center'
    }

    const length = this.props.options.length;
    return this.props.options.map((option,i)=>{
      return(
        <div key={i} style={areaStyle}>
          <button style={optionStyle} onClick={()=>{this.actions.content.setSubView(option.subView)}}>
            <div style={Object.assign({},tagStyle,{color: option.subView === this.store.content.subView? this.ui.colors.selectedGrey: this.ui.colors.lightGrey})}>{this.func.multiLang(option.tag[0],option.tag[1])}</div>
          </button>
          {i < length && this.verSep(this.ui.colors.darkGrey, '70%')}
        </div>
      )
    })
  }

  render(){
    this.init(this.props);
    const style = {...this.ui.styles.area, ...{
      height: this.bs.height * 0.05
    }};
    return (
      <div style={style}>
        {this.subNavOptions()}
      </div>
    )
  }
}

export default SubNav;

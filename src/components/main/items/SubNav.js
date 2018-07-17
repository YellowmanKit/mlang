import React from 'react';
import UI from 'components/UI';

class SubNav extends UI {

  subNavOptions(){
    const app = this.props.app;
    const ui = app.store.ui;
    const func = app.functions;
    const areaStyle = Object.assign({}, ui.areaStyle, {
      height: '100%',
      alignItems: 'center',
      flexGrow: 1
    })
    const optionStyle = Object.assign({}, ui.buttonStyle, {
      width: '100%',
      height: '100%'
    })
    const tagStyle = {
      width: '100%',
      fontSize: '150%',
      textAlign: 'center'
    }

    const length = this.props.options.length;
    return this.props.options.map((option,i)=>{
      return(
        <div key={i} style={areaStyle}>
          <button style={optionStyle} onClick={()=>{app.actions.content.setSubView(option.subView)}}>
            <div style={Object.assign({},tagStyle,{color: option.subView === app.store.content.subView? ui.selectedGrey: ui.lightGrey})}>{func.multiLang(option.tag[0],option.tag[1])}</div>
          </button>
          {i < length && this.verSep(ui.darkGrey, '70%')}
        </div>
      )
    })
  }

  render(){
    const app = this.props.app;
    const ui = app.store.ui;
    const bs = ui.basicStyle;
    const subNavStyle = Object.assign({}, ui.areaStyle,{
      height: bs.height * 0.05
    });
    return (
      <div style={subNavStyle}>
        {this.subNavOptions()}
      </div>
    )
  }
}

export default SubNav;

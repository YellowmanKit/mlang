import React from 'react';

class Input {

  constructor(app){
    this.init(app);
  }

  init(app){
    this.app = app;
    this.bs = app.store.ui.basicStyle;
    this.func = app.functions;
  }

  optionBar(id, scale, options, defaultValue, onChange){
    const barStyle = {
      width: scale[0],
      height: scale[1],
      fontSize: this.bs.height * 0.03,
      display: 'flex',
      flexFlow: 'row nowrap',
      justifyContent: 'center',
      backgroundColor: 'white',
      flexShrink: 0
    }

    return(
      <select id={id} style={barStyle} defaultValue={defaultValue} onChange={onChange?(event)=>{onChange(event)}:null}>
        {options.map((option, i)=>{
          return <option key={i}>{option}</option>
        })}
      </select>
    )
  }

  dateField(id, type, value){
    const inputStyle = {
      width: '50%',
      height: '4%',
      fontSize: '100%',
      margin: '2%',
      flexShrink: 0
    }
    return <input id={id} type={type} defaultValue={value} style={inputStyle} />
  }

  textArea(id, placeholder, value, onChange, scale, fontSize, disabled){
    const textAreaStyle = {
      width: scale? scale[0]: this.bs.width * 0.67,
      height: scale? scale[1]: this.bs.height * 0.15,
      fontSize: fontSize? fontSize: this.bs.height * 0.03,
      flexShrink: 0
    }
    return <textarea id={id} style={textAreaStyle} disabled={disabled} defaultValue={value} onChange={onChange?onChange:null} placeholder={placeholder?this.func.multiLang(placeholder[0],placeholder[1],placeholder[2]):''}/>
  }

  inputField(id, type, placeholder, value, onChange, scale){
    const inputStyle = {
      width: scale? scale[0]: this.bs.width * 0.67,
      height: scale? scale[1]: this.bs.height * 0.04,
      fontSize: this.bs.height * 0.03,
      margin: '2%',
      flexShrink: 0
    }
    return <input id={id} type={type} placeholder={this.func.multiLang(placeholder[0], placeholder[1], placeholder[2])} defaultValue={value} style={inputStyle} onChange={onChange}/>
  }

}

export default Input;

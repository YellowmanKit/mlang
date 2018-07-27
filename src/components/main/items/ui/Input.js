import React from 'react';

class Input {

  constructor(app){
    this.app = app;
    this.func = app.functions;
  }

  optionBar(id, scale, options, defaultValue, onChange){
    const barStyle = {
      width: scale[0],
      height: scale[1],
      fontSize: '100%',
      display: 'flex',
      flexFlow: 'row nowrap',
      justifyContent: 'center',
      backgroundColor: 'transparent'
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
      margin: '2%'
    }
    return <input id={id} type={type} defaultValue={value} style={inputStyle} />
  }

  textArea(id, scale, fontSize, value, onChange, placeholder){
    const textAreaStyle = {
      width: scale[0],
      height: scale[1],
      fontSize: fontSize
    }
    return <textarea id={id} style={textAreaStyle} defaultValue={value} onChange={onChange?onChange:null} placeholder={placeholder?this.func.multiLang(placeholder[0],placeholder[1]):''}/>
  }

  inputField(id, type, placeholder, value){
    const inputStyle = {
      width: '67%',
      height: '4%',
      fontSize: '100%',
      margin: '2%'
    }
    return <input id={id} type={type} placeholder={this.func.multiLang(placeholder[0], placeholder[1])} defaultValue={value} style={inputStyle} />
  }

}

export default Input;

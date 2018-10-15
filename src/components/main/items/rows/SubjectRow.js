import React from 'react';
import Row from './Row';

class SubjectRow extends Row {

  constructor(props){
    super(props);
    this.init(props);
    this.state = {
      filename: this.props.subject? this.props.subject.icon: null,
      type: 'subjectIcon'
    }
    this.checkUrl();
  }

  componentWillReceiveProps(newProps){
    this.init(newProps);
    if(newProps.subject && !this.state.filename){
      this.setState({
        filename: newProps.subject.icon,
        type: 'subjectIcon'
      })
    }
    this.checkUrl();
  }

  rowInfo(){
    const subject = this.props.subject;

    const rowStyle = {...this.ui.styles.area, ...{
      width: '100%',
      height: this.bs.height * 0.06,
      alignItems: 'flex-end'
    }}
    return(
      <div style={rowStyle}>
        {this.textDisplay(subject.description, ['',''], '150%')}
      </div>
    )
  }

  render(){
    if(this.props.subject === null){ return null; }
    return this.animatedRow(this.content.bind(this), this.bs.height * 0.15)
  }

  content = (style)=>(
      <button onClick={this.props.onClick} style={{...this.rowStyle(), ...{
        height: style.height,
        opacity: style.opacity
      }}}>
        {this.verGap('3%')}
        {this.rowIcon()}
        {this.rowContent(this.props.subject.title, this.rowInfo.bind(this))}
        {this.func.checkAlert.subject(this.props.subject, this.store, this.func.getById) && this.alertTag()}
      </button>
  )

}

export default SubjectRow;

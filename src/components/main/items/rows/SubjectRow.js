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
    this.init(this.props);
    if(this.props.subject === null){
      return null;
    }

    const rowStyle = {...this.ui.styles.button, ...this.ui.styles.area, ...{
      flexShrink: 0,
      height: this.bs.height * 0.15,
      borderBottom: '1px solid ' + this.ui.colors.darkGrey,
      alignItems: 'center'
    }}

    return(
      <button onClick={this.props.onClick} style={rowStyle}>
        {this.verGap('3%')}
        {this.rowIcon()}
        {this.rowContent(this.props.subject.title, this.rowInfo.bind(this))}
      </button>
    )
  }
}

export default SubjectRow;

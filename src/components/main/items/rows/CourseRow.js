import React from 'react';
import Row from './Row';

class CourseRow extends Row {

  constructor(props){
    super(props);
    this.init(props);
    this.state = {
      filename: this.props.course? this.props.course.icon: null,
      type: 'courseIcon'
    }
    this.outDated = this.func.outDated(this.props.course.endDate);
    this.checkUrl();
  }

  componentWillReceiveProps(newProps){
    this.init(newProps);
    if(newProps.course && !this.state.filename){
      this.setState({
        filename: newProps.course.icon,
        type: 'courseIcon'
      })
    }
    this.checkUrl();
  }

  rowInfo(){
    const course = this.props.course;

    const rowStyle = {...this.ui.styles.area, ...{
      width: '100%',
      height: this.bs.height * 0.06,
      alignItems: 'flex-end'
    }}
    return(
      <div style={rowStyle}>
        {this.textDisplay(course.description, ['',''], '150%')}
      </div>
    )
  }

  render(){
    if(this.props.course === null){ return null; }
    return this.animatedRow(this.content.bind(this), this.bs.height * 0.15)
  }

  content = (style)=>(
      <button onClick={this.props.onClick} style={{...this.rowStyle(), ...{
        height: style.height,
        opacity: style.opacity * this.outDated? 0.5:1
      }}}>
        {this.verGap('3%')}
        {this.rowIcon()}
        {this.rowContent(this.props.course.title, this.rowInfo.bind(this))}
        {this.outDated && this.passedTag()}
        {this.verGap('3%')}
      </button>
  )
}

export default CourseRow;

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
    this.init(this.props);
    if(this.props.course === null){
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
        {this.rowContent(this.props.course.title, this.rowInfo.bind(this))}
      </button>
    )
  }
}

export default CourseRow;

import React from 'react';
import Row from './Row';
import icon_survey from 'resources/images/icons/survey.png';

class SubmitRow extends Row {

  constructor(props){
    super(props);
    this.init(props);
    this.checkUrl();
  }

  rowInfo(){
    const rowStyle = {...this.ui.styles.area, ...{
      width: '100%',
      height: this.bs.height * 0.06,
      alignItems: 'center'
    }}
    //const textScale = [this.bs.height * 0.05,''];
    //const fontSize = this.bs.height * 0.035;
    return(
      <div style={rowStyle}>
      </div>
    )
  }

  render(){
    this.init(this.props);
    this.profile = this.func.getById.profileByUser(this.props.submit.submittedBy, this.store);

    return this.animatedRow(this.content.bind(this), this.bs.height * 0.15)
  }

  content = (style)=>(
      <button onClick={this.props.onClick} style={{...this.rowStyle(), ...{
        height: style.height,
        opacity: style.opacity
      }}}>
        {this.verGap('3%')}
        {this.rowIcon(false, icon_survey)}
        {this.profile && this.rowContent(this.profile.name, this.rowInfo.bind(this) )}
      </button>
  )
}

export default SubmitRow;

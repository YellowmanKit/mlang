import React from 'react';
import UI from 'components/UI';

import ImagePicker from 'components/main/items/ImagePicker';

class AddCourse extends UI {

  render() {
    var today = new Date();
    return(
      <div style={this.viewStyle()}>
        {this.gap('4%')}

        {this.subTitle(['Icon','照片'])}
        {this.sep()}
        <ImagePicker app={this.props.app} />
        {this.sep()}
        {this.gap('2%')}

        {this.subTitle(['Title','班名'])}
        {this.sep()}
        {this.inputField('title','text', '', '')}
        {this.gap('2%')}

        {this.subTitle(['End date','結束日期'])}
        {this.sep()}
        {this.inputField('endDate','date', ['',''], '')}
        {this.gap('2%')}
      </div>
    )
  }
}

export default AddCourse;

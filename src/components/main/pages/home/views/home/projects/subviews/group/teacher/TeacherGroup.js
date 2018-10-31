import React from 'react';
import SubView from 'components/main/pages/home/views/SubView';

class TeacherGroup extends SubView {

  render(){
    this.init(this.props);
    return(
      <div style={this.subViewStyle()}>
        TeacherGroup
      </div>
    )
  }
}

export default TeacherGroup;

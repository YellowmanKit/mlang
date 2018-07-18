import React from 'react';
import UI from 'components/UI';

import Courses from './courses/Courses';

class TeacherHome extends UI {

  render() {
    return(
      <div style={this.viewStyle()}>
        <Courses app={this.props.app}/>
      </div>
    )
  }
}

export default TeacherHome;
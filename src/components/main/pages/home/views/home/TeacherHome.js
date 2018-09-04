import React from 'react';
import View from 'components/main/pages/home/views/View';

import Schools from './contents/Schools';
import Courses from './contents/Courses';
import Subjects from './contents/Subjects';

class TeacherHome extends View {

  render() {
    this.init(this.props);
    return(
      <div style={this.viewStyle()}>
        <Schools app={this.app}/>
        <Courses app={this.app}/>
        <Subjects app={this.app}/>
      </div>
    )
  }
}

export default TeacherHome;

import React from 'react';
import UI from 'components/UI';

class Courses extends UI {

  render() {

    //const app = this.props.app;
    //const func = app.functions;

    const containerStyle = {
      width: '100%',
      height: '25%'
    }

    return(
      <div style={containerStyle}>
        {this.tabBar(['Courses','班別'])}
      </div>
    )
  }
}

export default Courses;

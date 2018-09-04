import React from 'react';
import View from 'components/main/pages/home/views/View';
import Schools from './contents/Schools';


class AdminHome extends View {

  render() {
    this.init(this.props);
    return(
      <div style={this.viewStyle()}>
        <Schools app={this.app}/>
      </div>
    )
  }
}

export default AdminHome;

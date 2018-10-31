import React from 'react';
import SubView from 'components/main/pages/home/views/SubView';

import CreateOrJoin from './CreateOrJoin';

class StudentGroup extends SubView {

  content(){
    return <CreateOrJoin app={this.app}/>
  }

  render(){
    this.init(this.props);
    return(
      <div style={this.subViewStyle()}>
        {this.content()}
      </div>
    )
  }
}

export default StudentGroup;

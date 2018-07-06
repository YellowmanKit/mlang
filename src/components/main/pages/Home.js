import React, { Component } from 'react';

import background2 from 'resources/images/general/background2.png';

class Home extends Component {

  render() {
    const app = this.props.app;
    const ui = app.store.ui;
    const pageStyle = Object.assign({},ui.basicStyle,{
      justifyContent: 'center',
      backgroundImage: 'url(' + background2 + ')',
      backgroundSize: '100% 100%',
    })
    //const func = app.functions;
    return(
      <div style={pageStyle}>

      </div>
    )
  }

}

export default Home;

import React from 'react';
import View from 'components/main/pages/home/views/View';

class SlideShow extends View {

  render(){
    this.init(this.props);

    return (
      <div style={{...this.viewStyle(), ...{ backgroundColor: 'black' }}}>
      </div>
    )
  }

}

export default SlideShow;

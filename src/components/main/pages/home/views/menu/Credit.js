import React from 'react';
import UI from 'components/UI';

class Credit extends UI {

  render() {
    return(
      <div style={this.viewStyle()}>
        {this.gap('4%')}

        {this.subTitle(['Organization','團體'])}
        {this.sep()}
        {this.textDisplay('Astri')}
        {this.textDisplay('The University of Hong Kong')}
        {this.gap('8%')}

        {this.subTitle(['Director','總監'])}
        {this.sep()}
        {this.textDisplay('Dr. Vincent Lau')}
        {this.textDisplay('Dr. Elizabeth Loh')}
        {this.textDisplay('Dr. W.W. Ki')}
        {this.gap('4%')}

        {this.subTitle(['Developer','開發者'])}
        {this.sep()}
        {this.textDisplay('Kit Wong')}
        {this.textDisplay('Phoneix Kwok')}
        {this.gap('4%')}
      </div>
    )
  }
}

export default Credit;

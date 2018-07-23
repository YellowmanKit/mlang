import React from 'react';
import View from 'components/main/pages/home/views/View';

class Credit extends View {

  creditTextDisplay(text){
    return this.textDisplay(text, ['100%',''], '125%');
  }

  render() {
    return(
      <div style={this.viewStyle()}>
        {this.gap('4%')}

        {this.subTitle(['Organization','團體'])}
        {this.sep()}
        {this.creditTextDisplay('Hong Kong Applied Science and Technology Research Institute')}
        {this.creditTextDisplay('The University of Hong Kong')}
        {this.gap('8%')}

        {this.subTitle(['Director','總監'])}
        {this.sep()}
        {this.creditTextDisplay('Dr. Vincent Lau')}
        {this.creditTextDisplay('Dr. Elizabeth Loh')}
        {this.creditTextDisplay('Dr. W.W. Ki')}
        {this.gap('4%')}

        {this.subTitle(['Developer','開發者'])}
        {this.sep()}
        {this.creditTextDisplay('Kit Wong')}
        {this.creditTextDisplay('Phoneix Kwok')}
        {this.gap('4%')}
      </div>
    )
  }
}

export default Credit;

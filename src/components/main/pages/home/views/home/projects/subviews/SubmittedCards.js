import React from 'react';
import SubView from 'components/main/pages/home/views/SubView';

class SubmittedCards extends SubView {

  cards(){
    const app = this.props.app;
    const ui = app.store.ui;
    const bs = ui.basicStyle;

    const areaStyle = Object.assign({},ui.styles.area, {
      height: bs.height * 0.72,
      overflow: 'auto'
    });
    return(
      <div style={areaStyle}>
        {this.verGap('2%')}
        {this.cardCells()}
        {this.verGap('5%')}
      </div>
    )
  }

  cardCells(){

  }

  render() {
    const app = this.props.app;
    const ui = app.store.ui;
    const bs = ui.basicStyle;
    const onAdd = ()=>{app.actions.content.pushView('addCard')};

    return(
      <div style={this.subViewStyle()}>
        {this.buttons.listAdd([bs.width, bs.height * 0.1], ['CREATE CARD','製作卡片'], '200%', onAdd)}
        {this.cards()}
      </div>
    )
  }

}

export default SubmittedCards;

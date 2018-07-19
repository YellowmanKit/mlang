import React from 'react';
import UI from 'components/UI';

class SubmittedCards extends UI {

  cards(){
    const app = this.props.app;
    const ui = app.store.ui;
    const bs = ui.basicStyle;
    //const store = app.store;
    //const actions = app.actions;

    const areaStyle = Object.assign({},ui.areaStyle, {
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
    /*const func = app.functions;
    const project = app.store.projects.viewingProject;*/
    const ui = app.store.ui;
    const bs = ui.basicStyle;
    const onAdd = ()=>{app.actions.content.pushView('addCard')};

    return(
      <div style={this.subViewStyle()}>
        {this.listAddButton([bs.width, bs.height * 0.1], onAdd, ['CREATE CARD','製作卡片'], '200%')}
        {this.cards()}
      </div>
    )
  }

}

export default SubmittedCards;

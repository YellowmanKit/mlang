import React from 'react';
import UI from 'components/UI';
import Cell from 'components/main/items/Cell';

class Cards extends UI {

  componentDidMount(){
    this.getCards();
  }

  getCards(){
    const app = this.props.app;
    const func = app.functions;

    const cardsToGet = [];
    const cardsToShow = this.props.cardsId;

    for(var i=0;i<cardsToShow.length;i++){
      if(func.getCardById(cardsToShow[i]) === null){
        cardsToGet.splice(0,0, cardsToShow[i]);
      }
    }
    if(cardsToGet.length > 0){
      app.actions.cards.getCards(cardsToGet);
    }
  }

  render(){
    const app = this.props.app;
    const ui = app.store.ui;
    const bs = ui.basicStyle;
    const func = app.functions;
    const actions = app.actions;
    const cardsToShow = this.props.cardsId;
    //console.log(cardsToShow)
    const cardsStyle = {
      width: '100%',
      height: '100%',
      overflowY: 'auto',
      display: 'flex',
      flexFlow: 'row wrap',
      alignContent: 'flex-start'
    }
    const cardContainerStyle = {
      width: bs.width * 0.32,
      height: bs.width * 0.4,
      display: 'flex',
      justifyContent: 'center'
    }
    return(
      <div style={cardsStyle}>
        {this.gap('3%')}
        {cardsToShow.map((cardId,i)=>{
          const card = func.getCardById(cardId);
          return(
            <div key={i} style={cardContainerStyle}>
              <Cell app={app} data={card} type='card' onClick={()=>{actions.cards.viewCard(i, card); actions.content.pushView('viewCards')}}/>
            </div>
          )
        })}
      </div>
    )
  }

}

export default Cards;

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
    const func = app.functions;
    const cardsToShow = this.props.cardsId;
    //console.log(cardsToShow)
    return(
      cardsToShow.map((cardId,i)=>{
        return <Cell key={i} app={app} data={func.getCardById(cardId)} type='card' onClick={()=>{}}/>
      })
    )
  }

}

export default Cards;

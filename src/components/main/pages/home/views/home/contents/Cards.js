import React from 'react';
import UI from 'components/UI';
import Cell from 'components/main/items/Cell';

class Cards extends UI {

  componentDidMount(){
    this.init(this.props);
    this.getCards();
  }

  getCards(){
    const cardsToGet = [];
    const cardsToShow = this.props.cardsId;
    if(!cardsToShow){ return;}

    for(var i=0;i<cardsToShow.length;i++){
      if(this.func.getCardById(cardsToShow[i]) === null){
        cardsToGet.splice(0,0, cardsToShow[i]);
      }
    }
    if(cardsToGet.length > 0){
      this.actions.cards.getCards(cardsToGet);
    }
  }

  render(){
    this.init(this.props);
    const cardsToShow = this.props.cardsId;
    if(!cardsToShow){ return null;}
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
      width: this.bs.width * 0.32,
      height: this.bs.width * 0.4,
      display: 'flex',
      justifyContent: 'center'
    }
    return(
      <div style={cardsStyle}>
        {this.gap('3%')}
        {cardsToShow.slice(0).reverse().map((cardId,i)=>{
          const card = this.func.getCardById(cardId);
          if(!card){ return null;}
          //console.log(card);
          if(this.props.featuredOnly && (!card.grade || card.grade !== 'featured')){
            return null;
          }
          return(
            <div key={i} style={cardContainerStyle}>
              <Cell app={this.app} data={card} type='card' onClick={()=>{this.actions.cards.viewCard(card); this.actions.content.pushView('viewCards')}}/>
            </div>
          )
        })}
      </div>
    )
  }

}

export default Cards;
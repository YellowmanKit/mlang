import React from 'react';
import UI from 'components/UI';
import Cell from 'components/main/items/Cell';

class Cards extends UI {

  constructor(props){
    super(props);
    this.init(props);
    this.state = {
      viewCardIsSet: false
    }
  }

  setViewCards(props){
    const cardsId = this.props.cardsId;
    var cardsToView = [];
    cardsId.map(cardId=>{
      const card = this.func.getCardById(cardId);
      if(!card){ return null; }
      if(this.props.featuredOnly && card.grade !== 'featured'){ return null; }
      cardsToView.push(cardId);
      return null;
    })
    this.actions.cards.viewCards(cardsToView);
    this.setState({
      viewCardIsSet: true
    })
  }

  componentDidMount(){
    this.init(this.props);
    this.getCards(this.props);
  }

  componentWillReceiveProps(newProps){
    this.getCards(newProps);
  }

  getCards(props){
    const cardsToGet = [];
    const cardsToShow = props.cardsId;
    if(!cardsToShow){ console.log('no card to show!'); return;}

    for(var i=0;i<cardsToShow.length;i++){
      if(this.func.getCardById(cardsToShow[i]) === null){
        cardsToGet.splice(0,0, cardsToShow[i]);
      }
    }
    if(cardsToGet.length > 0){
      this.actions.cards.getCards(cardsToGet);
    }else if(!this.state.viewCardIsSet || (!this.props.featuredOnly && cardsToShow.length !== 0 && this.store.cards.viewingCards.length === 0)){
      this.setViewCards(props);
    }
  }

  render(){
    this.init(this.props);
    if(!this.props.cardsId){ return null;}
    const cardsToShow = this.props.cardsId.slice(0);
    //console.log(cardsToShow)
    const cardsStyle = {
      width: '100%',
      height: '100%',
      overflowY: 'auto',
      display: 'flex',
      flexFlow: 'row wrap',
      alignContent: 'flex-start'
    }
    const cardContainerStyle = {...this.ui.styles.container, ...{
      width: this.bs.height * 0.32,
      height: this.bs.height * 0.4
    }}
    cardsToShow.push('add');
    return(
      <div style={cardsStyle}>
        {this.gap('3%')}
        {cardsToShow.map((cardId,i)=>{
          if(cardId === 'add'){
            return(
              <div key={i} style={cardContainerStyle}>
                {this.props.onAdd && this.props.onAdd()}
              </div>
            )
          }
          const card = this.func.getCardById(cardId);
          if(!card){ return null;}
          if(this.props.featuredOnly && card.grade !== 'featured'){ return null; }
          //console.log(card);
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

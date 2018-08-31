import React from 'react';
import View from 'components/main/pages/home/views/View';
import CardBar from './CardBar';
import Card from './Card';

class ViewCards extends View {

  indexTag(currentIndex){
    const style = {...this.ui.styles.container, ...{
      position: 'absolute',
      top: this.bs.width * 0.025,
      left: this.bs.width * 0.025,
      width: this.bs.width * 0.1,
      height: this.bs.width * 0.1,
      borderRadius: '50%',
      backgroundColor: this.ui.colors.grey,
      fontWeight: 'bold',
      color: 'white',
      fontSize: this.bs.width * 0.1
    }}
    return <div style={style}>{currentIndex}</div>
  }

  render(){
    this.init(this.props);

    const style = {...this.ui.styles.container, ...{
      width: '100%',
      height: '100%',
      display: 'flex',
      flexFlow: 'row nowrap',
      overflowX: 'auto',
      justifyContent: 'flex-start',
      backgroundColor: this.ui.colors.ultraLightGrey
    }}
    const viewingCard = this.store.cards.viewingCard;
    const viewingCardsId = this.store.cards.viewingCards;
    //console.log(viewingCardsId)

    if(!viewingCardsId){ this.actions.content.pullView(); return null; }

    var currentIndex, previous, next;
    for(var i=0;i<viewingCardsId.length;i++){
      if(viewingCardsId[i] === viewingCard._id){
        currentIndex = i + 1;
        previous = i===0? null: this.func.getCardById(viewingCardsId[i-1]);
        next = i===viewingCardsId.length-1? null: this.func.getCardById(viewingCardsId[i+1]);
        break;
      }
    }

    return(
      <div style={{...this.viewStyle(), overflow: 'hidden'}}>
        {previous && this.buttons.previous(()=>{this.actions.cards.viewCard(previous)})}
        <div style={style}>
          <Card app={this.app} card={viewingCard}/>
        </div>
        {next && this.buttons.next(()=>{this.actions.cards.viewCard(next)})}
        <CardBar app={this.app} card={viewingCard}/>
        {this.indexTag(currentIndex)}
      </div>
    )
  }

}

export default ViewCards;

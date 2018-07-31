import React from 'react';
import View from 'components/main/pages/home/views/View';
import CardBar from './CardBar';
import Card from './Card';

class ViewCards extends View {

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
    const viewingCards = this.getViewingCards();

    var previous, next, previousIndex, nextIndex;
    for(var i=0;i<viewingCards.length;i++){
      if(viewingCards[i] === viewingCard._id){
        previous = i===0? null: this.func.getCardById(viewingCards[i-1]);
        next = i===viewingCards.length-1? null: this.func.getCardById(viewingCards[i+1]);
      }
    }
    const allCards = this.store.cards.cards;
    for(var j=0;j<allCards.length;j++){
      if(previous && allCards[j]._id === previous._id){
        previousIndex = j;
      }
      if(next && allCards[j]._id === next._id){
        nextIndex = j;
      }
    }
    return(
      <div style={this.viewStyle()}>
        {previous && this.buttons.previous(()=>{this.actions.cards.viewCard(previousIndex, previous)})}
        <div style={style}>
          <Card app={this.app} card={viewingCard}/>
        </div>
        {next && this.buttons.next(()=>{this.actions.cards.viewCard(nextIndex, next)})}
        <CardBar app={this.app} card={viewingCard}/>
      </div>
    )
  }

  getViewingCards(){
    if(this.store.content.subView === 'projectFeatured'){
      return this.getAllFeaturedCardsIdInViewingProject();
    }
    return this.store.studentProjects.viewingStudentProject.cards;
  }

}

export default ViewCards;

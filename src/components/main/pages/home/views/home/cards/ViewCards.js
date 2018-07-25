import React from 'react';
import View from 'components/main/pages/home/views/View';
import Button from 'components/main/items/ui/Button';

import Card from './Card';

class ViewCards extends View {

  render(){

    const app = this.props.app;
    const ui = app.store.ui;
    const actions = app.actions;
    const func = app.functions;
    //const bs = ui.basicStyle;

    const style = {...ui.styles.container, ...{
      width: '100%',
      height: '100%',
      display: 'flex',
      flexFlow: 'row nowrap',
      overflowX: 'auto',
      justifyContent: 'flex-start',
      backgroundColor: ui.colors.ultraLightGrey
    }}
    this.buttons = new Button(app);
    const viewingCard = app.store.cards.viewingCard;
    const viewingCards = app.store.studentProjects.viewingStudentProject.cards;
    var previous, next, previousIndex, nextIndex;
    for(var i=0;i<viewingCards.length;i++){
      if(viewingCards[i] === viewingCard._id){
        previous = i===0? null: func.getCardById(viewingCards[i-1]);
        next = i===viewingCards.length-1? null: func.getCardById(viewingCards[i+1]);
      }
    }
    const allCards = app.store.cards.cards;
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
        {previous && this.buttons.previous(()=>{actions.cards.viewCard(previousIndex, previous)})}
        <div style={style}>
          <Card app={app} data={viewingCard}/>
        </div>
        {next && this.buttons.next(()=>{actions.cards.viewCard(nextIndex, next)})}
      </div>
    )
  }

}

export default ViewCards;

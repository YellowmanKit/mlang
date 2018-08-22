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
    const viewingCardsId = this.getViewingCardsId().slice(0).reverse();
    //console.log(viewingCardsId)

    var previous, next;
    for(var i=0;i<viewingCardsId.length;i++){
      if(viewingCardsId[i] === viewingCard._id){
        previous = i===0? null: this.func.getCardById(viewingCardsId[i-1]);
        next = i===viewingCardsId.length-1? null: this.func.getCardById(viewingCardsId[i+1]);
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
      </div>
    )
  }

  getViewingCardsId(){
    if(this.store.content.subView === 'projectFeatured'){
      return this.func.getAllFeaturedCardsIdInViewingProject();
    }
    return this.store.studentProjects.viewingStudentProject.cards;
  }

}

export default ViewCards;

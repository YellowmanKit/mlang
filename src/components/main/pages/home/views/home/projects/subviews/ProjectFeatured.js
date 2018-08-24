import React from 'react';
import SubView from 'components/main/pages/home/views/SubView';
import Cards from 'components/main/pages/home/views/home/contents/Cards';
import Filter from 'components/main/items/Filter';

class ProjectFeatured extends SubView {

  constructor(props){
    super(props);
    this.init(props);
    this.cards = this.func.getAllFeaturedCardsIdInViewingProject();
    this.setCardsToView(this.store.content.filterOption);
  }

  componentWillReceiveProps(newProps){
    this.init(newProps);
    this.cards = this.func.getAllFeaturedCardsIdInViewingProject();
  }

  setCardsToView(filterOption){
    var cardsToView = [];
    if(filterOption === 'All'){ cardsToView = this.cards; }

    this.cards.map(cardId=>{
      const card = this.func.getCardById(cardId);
      const profile = this.func.getProfileByUserId(card.author);
      if(profile.name === filterOption){
        cardsToView.push(cardId)
      }
      return null;
    })
    this.actions.cards.viewCards(cardsToView);
  }

  render() {
    this.init(this.props);
    return(
      <div style={this.subViewStyle()}>
        <Filter app={this.app} options={this.filterOptions()} defaultValue={this.store.content.filterOption} onChange={()=>{this.onFilterChange()}}/>
        {this.sep()}
        <Cards app={this.app} cardsId={this.store.cards.viewingCards}/>
      </div>
    )
  }

  filterOptions(){
    var options = ['All'];
    this.cards.map(cardId=>{
      const card = this.func.getCardById(cardId);
      const profile = this.func.getProfileByUserId(card.author);
      if(!profile){ return null; }
      if(!options.includes(profile.name)){
        options.push(profile.name);
      }
      return null;
    })
    return options;
  }

  onFilterChange(){
    const selected = document.getElementById('filter').value;
    this.setCardsToView(selected);
    this.actions.content.setFilter(selected)
  }

}

export default ProjectFeatured;

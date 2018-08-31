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
      var profile = this.func.getProfileByUserId(card.author);
      if(!profile){ profile = this.store.profile; }
      if(profile.name === filterOption){
        cardsToView.push(cardId)
      }
      return null;
    })
    this.cardsToView = cardsToView;
  }

  render() {
    this.init(this.props);
    const outDated = this.func.outDated(this.store.projects.viewingProject.endDate);
    const isTeacher = this.store.user.type === 'teacher';

    return(
      <div style={this.subViewStyle()}>
        <Filter app={this.app} options={this.filterOptions()} defaultValue={this.store.content.filterOption} onChange={()=>{this.onFilterChange()}}/>
        {this.sep()}
        <Cards app={this.app} cardsId={this.cardsToView} onAdd={(outDated || !isTeacher)? null:this.onAdd.bind(this)}/>
      </div>
    )
  }

  onAdd(){
    return this.buttons.cellAdd(()=>{this.actions.content.pushView('addCard')})
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
    this.actions.content.setFilter(selected);
    this.actions.cards.viewCards([]);
  }

}

export default ProjectFeatured;

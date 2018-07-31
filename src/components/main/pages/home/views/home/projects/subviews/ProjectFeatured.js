import React from 'react';
import SubView from 'components/main/pages/home/views/SubView';
import Cards from 'components/main/pages/home/views/home/contents/Cards';

class ProjectFeatured extends SubView {

  cards(){
    const areaStyle = {...this.ui.styles.area, ...{
      height: this.bs.height * 0.82
    }}
    return(
      <div style={areaStyle}>
        {this.cardCells()}
      </div>
    )
  }

  cardCells(){
    return <Cards app={this.app} cardsId={this.getAllFeaturedCardsIdInViewingProject()} featuredOnly={true}/>
  }

  render() {
    this.init(this.props);
    return(
      <div style={this.subViewStyle()}>
        {this.cards()}
      </div>
    )
  }

}

export default ProjectFeatured;

import React from 'react';
import View from 'components/main/pages/home/views/View';
import GradingCardRow from 'components/main/items/rows/GradingCardRow';

class GradingCards extends View {

  constructor(props){
    super(props);
    this.init(props);
  }

  componentDidMount(){
    this.getCards(this.props);
  }

  componentWillReceiveProps(newProps){
    const app = this.props.app;
    const studentProject = app.store.studentProjects.viewingStudentProject;
    const gradingCards = app.store.cards.gradingCards[studentProject._id];
    if(!gradingCards){
      this.init(newProps);
    }
  }

  getCards(props){
    const app = props.app;
    const func = app.functions;
    const studentProject = app.store.studentProjects.viewingStudentProject;

    const cardsToGet = [];
    const cardsToShow = studentProject.cards;

    for(var i=0;i<cardsToShow.length;i++){
      if(func.getCardById(cardsToShow[i]) === null){
        cardsToGet.splice(0,0, cardsToShow[i]);
      }
    }
    if(cardsToGet.length > 0){
      app.actions.cards.getCards(cardsToGet);
    }
  }

  init(props){
    const app = props.app;
    const actions = app.actions;
    const func = app.functions;
    const studentProject = app.store.studentProjects.viewingStudentProject;
    const cards = [];
    const cardsId = studentProject.cards;
    for(var i=0;i<cardsId.length;i++){
      const card = func.getCardById(cardsId[i]);
      if(card === null){ return; }
      cards.splice(0,0, card);
    }
    actions.cards.gradeCards(studentProject._id, cards);
  }

  gradingCardsList(gradeCards){
    const app = this.props.app;
    const ui = app.store.ui;
    const bs = ui.basicStyle;
    const listStyle = {...bs, ...ui.styles.list, ...{
      flexGrow: 1,
      justifyContent: 'flex-start',
      backgroundColor: ui.colors.ultraLightGrey
    }}
    const containerStyle = {...ui.styles.container, ...{
      width: '100%',
      margin: '2%',
      flexShrink: 0
    }}
    return(
      <div style={listStyle}>
        {gradeCards.map((card, i)=>{
          return(
            <div key={i} style={containerStyle}>
              <GradingCardRow app={this.props.app} card={card} onClick={()=>{console.log('row onclick')}} />
            </div>
          )
        })}
      </div>
    )
  }

  gradingPanel(){
    const app = this.props.app;
    const ui = app.store.ui;
    const bs = ui.basicStyle;
    const style = {...ui.styles.area, ...{
      height: bs.width * 0.2,
      justifyContent: 'flex-start',
      backgroundColor: ui.colors.lightGrey,
      borderTop: '2px solid ' + ui.colors.darkGrey,
    }}
    return(
      <div style={style}>
      </div>
    )
  }

  render() {
    const app = this.props.app;
    const studentProject = app.store.studentProjects.viewingStudentProject;
    const gradeCards = app.store.cards.gradingCards[studentProject._id];
    return(
      <div style={this.viewStyle()}>
        {gradeCards && this.gradingCardsList(gradeCards)}
        {gradeCards && this.gradingPanel()}
      </div>
    )
  }

}

export default GradingCards;

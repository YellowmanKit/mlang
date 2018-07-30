const cardsReducer = (
  state = {
    cards: [],
    viewingCard: {},
    indexOfViewing: -1,
    gradingCards: {}
  }, action)=>{
  var _gradingCards = {...state.gradingCards};
  switch (action.type) {
    case 'updateCards':
      const updatedCards = action.payload;
      var cards = state.cards;
      for(var i=0;i<cards.length;i++){
        for(var j=0;j<updatedCards.length;j++){
          if(cards[i]._id === updatedCards[j]._id){
            cards[i] = {...cards[i], ...updatedCards[j]};
            break;
          }
        }
      }
      return {...state, cards: cards};
    case 'gradeCard':
      _gradingCards[action.payload.studentProjectId][action.payload.index] = action.payload.gradeCard;
      return {...state, gradingCards: _gradingCards};
    case 'resetGradeCards':
      delete _gradingCards[action.payload];
      return {...state, gradingCards: _gradingCards};
    case 'gradeCards':
      _gradingCards[action.payload.studentProjectId] = [...action.payload.cards];
      return {...state, gradingCards: _gradingCards};
    case 'viewCard':
      return {...state, indexOfViewing: action.payload.index, viewingCard: action.payload.card};
    case 'appendCards':
      return {...state, cards: [...state.cards, ...action.payload]};
    default:
      return state;
  }
}

export default cardsReducer;

const cardsReducer = (
  state = {
    cards: [],
    viewingCard: {},
    indexOfViewing: -1,
    gradingCards: {}
  }, action)=>{
  switch (action.type) {
    case 'gradeCards':
      var _gradingCards = state.gradingCards;
      _gradingCards[action.payload.studentProjectId] = action.payload.cards;
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

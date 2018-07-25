const cardsReducer = (
  state = {
    cards: [],
    viewingCard: {},
    indexOfViewing: -1
  }, action)=>{
  switch (action.type) {
    case 'viewCard':
      return {...state, indexOfViewing: action.payload.index, viewingCard: action.payload.card};
    case 'appendCards':
      return {...state, cards: [...state.cards, ...action.payload]};
    default:
      return state;
  }
}

export default cardsReducer;

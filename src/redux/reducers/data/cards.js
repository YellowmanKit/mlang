import * as reducer from '../reducer';

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
      return {...state, cards: reducer.updateElements(state.cards, action.payload)};
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

import * as reducer from '../reducer';

const cardsReducer = (
  state = {
    cards: [],
    viewAction: 'init',
    viewingCard: {},
    viewingCards: [],
    gradingCards: {},
    teachingCards: [],
    joinedCards: []
  }, action)=>{
  var _gradingCards = {...state.gradingCards};
  switch (action.type) {
    case 'updateJoinedCards':
        return {...state, joinedCards: reducer.updateElements(state.joinedCards, action.payload, true)};
    case 'updateTeachingCards':
        return {...state, teachingCards: reducer.updateElements(state.teachingCards, action.payload, true)};
    case 'setAction':
      return {...state, viewAction: action.payload};
    case 'viewCards':
      return {...state, viewingCards: action.payload};
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
      return {...state, viewingCard: action.payload};
    default:
      return state;
  }
}

export default cardsReducer;

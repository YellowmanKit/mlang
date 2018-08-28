import * as reducer from '../reducer';

const profilesReducer = (
  state = {
    profiles: [],
    viewingProfile: {}
  }, action)=>{
  switch (action.type) {
    case 'viewProfile':
      return {...state, viewingProfile: action.payload};
    case 'updateProfiles':
      return {...state, profiles: reducer.updateElements(state.profiles, action.payload)};
    default:
      return state;
  }
}

export default profilesReducer;

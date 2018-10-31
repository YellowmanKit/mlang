import * as reducer from '../reducer';

const coursesReducer = (
  state = {
    groups: [],
  }, action)=>{
  switch (action.type) {
    case 'updateGroups':
        return {...state, groups: reducer.updateElements(state.groups, action.payload)};
    default:
      return state;
  }
}

export default coursesReducer;

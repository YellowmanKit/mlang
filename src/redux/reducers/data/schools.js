import * as reducer from '../reducer';

const schoolsReducer = (
  state = {
    schools: [],
    viewingSchool: {},
    joinedSchools: []
  }, action)=>{
  switch (action.type) {
    case 'leaveSchool':
      var joinedSchools = state.joinedSchools.slice(0);
      var index = joinedSchools.indexOf(action.payload);
      if (index > -1) {
        joinedSchools.splice(index, 1);
      }
      return {...state, joinedSchools: joinedSchools}
    case 'updateSchools':
        return {...state, schools: reducer.updateElements(state.schools, action.payload)};
    case 'viewSchool':
      return {...state, viewingSchool: action.payload};
    default:
      return state;
  }
}

export default schoolsReducer;

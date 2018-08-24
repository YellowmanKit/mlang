import * as reducer from '../reducer';

const studentProjectsReducer = (
  state = {
    studentProjects: [],
    viewingStudentProject: {}
  }, action)=>{
  switch (action.type) {
    case 'updateStudentProjects':
     return {...state, studentProjects: reducer.updateElements(state.studentProjects, action.payload)};
    case 'viewStudentProject':
      return {...state, viewingStudentProject: action.payload};
    default:
      return state;
  }
}

export default studentProjectsReducer;

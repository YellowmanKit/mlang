import * as reducer from '../reducer';

const studentProjectsReducer = (
  state = {
    studentProjects: [],
    viewingStudentProject: {},
    indexOfViewing: -1
  }, action)=>{
  switch (action.type) {
    case 'updateStudentProjects':
     return {...state, studentProjects: reducer.updateElements(state.studentProjects, action.payload)};
    case 'viewStudentProject':
      return {...state, indexOfViewing: reducer.getElementIndex(state.studentProjects, action.payload), viewingStudentProject: action.payload};
    default:
      return state;
  }
}

export default studentProjectsReducer;

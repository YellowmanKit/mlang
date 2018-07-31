import * as reducer from '../reducer';

const studentsReducer = (
  state = {
    students: [],
    viewingStudent: {},
    indexOfViewing: -1
  }, action)=>{
  switch (action.type) {
    case 'updateStudents':
      return {...state, students: reducer.updateElements(state.students, action.payload)};
    default:
      return state;
  }
}

export default studentsReducer;

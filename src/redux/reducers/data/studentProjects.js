import * as reducer from '../reducer';

const studentProjectsReducer = (
  state = {
    studentProjects: [],
    viewingStudentProject: {},
    indexOfViewing: -1
  }, action)=>{
  const _studentProjects = state.studentProjects.slice(0);
  switch (action.type) {
    case 'updateStudentProjects':
     return {...state, studentProjects: reducer.updateElements(state.studentProjects, action.payload)};
    case 'viewStudentProject':
      const studentProject = action.payload;
      var index = -1;
      for(var j=0;j<_studentProjects.length;j++){
        if(_studentProjects[j]._id === studentProject._id){
          index = j;
          break;
        }
      }
      return {...state, indexOfViewing: index, viewingStudentProject: action.payload};
    case 'appendStudentProjects':
      return {...state, studentProjects: [...state.studentProjects, ...action.payload]};
    default:
      return state;
  }
}

export default studentProjectsReducer;

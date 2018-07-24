const studentProjectsReducer = (
  state = {
    studentProjects: [],
    viewingStudentProject: {},
    indexOfViewing: -1
  }, action)=>{
  switch (action.type) {
    case 'updateStudentProjects':
      const _studentProjects = state.studentProjects.slice(0);
      const updatedStudentProject = action.payload;
      for(var i=0;i<_studentProjects.length;i++){
        if(_studentProjects[i]._id === updatedStudentProject._id){
          _studentProjects[i] = updatedStudentProject;
          return {...state, studentProjects: _studentProjects};
        }
      }
      return {...state, studentProjects: [...state.studentProjects, updatedStudentProject]};
    case 'viewStudentProject':
      return {...state, indexOfViewing: action.payload.index, viewingStudentProject: action.payload.studentProject};
    case 'appendStudentProjects':
      return {...state, studentProjects: [...state.studentProjects, ...action.payload]};
    default:
      return state;
  }
}

export default studentProjectsReducer;

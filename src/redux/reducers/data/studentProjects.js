const studentProjectsReducer = (
  state = {
    studentProjects: [],
    viewingStudentProject: {},
    indexOfViewing: -1
  }, action)=>{
  const _studentProjects = state.studentProjects.slice(0);
  switch (action.type) {
    case 'updateStudentProject':
      const updatedStudentProject = action.payload;
      for(var i=0;i<_studentProjects.length;i++){
        if(_studentProjects[i]._id === updatedStudentProject._id){
          _studentProjects[i] = updatedStudentProject;
          return {...state, studentProjects: _studentProjects};
        }
      }
      return {...state, studentProjects: [...state.studentProjects, updatedStudentProject]};
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

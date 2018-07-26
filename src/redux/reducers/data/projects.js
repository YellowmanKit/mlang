const projectsReducer = (
  state = {
    projects: [],
    viewingProject: {},
    indexOfViewing: -1
  }, action)=>{
  switch (action.type) {
    case 'updateProject':
      const _projects = state.projects.slice(0);
      const updatedProject = action.payload;
      for(var i=0;i<_projects.length;i++){
        if(_projects[i]._id === updatedProject._id){
          _projects[i] = updatedProject;
          return {...state, viewingProject: updatedProject ,projects: _projects};
        }
      }
      return {...state, viewingProject: updatedProject, projects: [...state.projects, updatedProject]};
    case 'viewProject':
      return {...state, indexOfViewing: action.payload.index, viewingProject: action.payload.project};
    case 'appendProjects':
      return {...state, projects: [...state.projects, ...action.payload]};
    default:
      return state;
  }
}

export default projectsReducer;

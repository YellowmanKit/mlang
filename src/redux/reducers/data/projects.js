import * as reducer from '../reducer';

const projectsReducer = (
  state = {
    projects: [],
    viewingProject: {},
    indexOfViewing: -1
  }, action)=>{
  switch (action.type) {
    case 'updateProjects':
      return {...state, projects: reducer.updateElements(state.projects, action.payload)};
    case 'viewProject':
      return {...state, indexOfViewing: action.payload.index, viewingProject: action.payload.project};
    case 'appendProjects':
      return {...state, projects: [...state.projects, ...action.payload]};
    default:
      return state;
  }
}

export default projectsReducer;

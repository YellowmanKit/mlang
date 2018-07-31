import * as reducer from '../reducer';

const coursesReducer = (
  state = {
    indexOfViewing: -1,
    viewingCourse: {},
    teachingCourses: [],
    joinedCourses: []
  }, action)=>{
  switch (action.type) {
    case 'updateJoinedCourses':
        return {...state, joinedCourses: reducer.updateElements(state.joinedCourses, action.payload)};
    case 'updateTeachingCourses':
        return {...state, teachingCourses: reducer.updateElements(state.teachingCourses, action.payload)};
    case 'viewCourse':
      return {...state, indexOfViewing: action.payload.index, viewingCourse: action.payload.course};
    case 'appendJoinedCourses':
      return {...state, joinedCourses: [...state.joinedCourses, action.payload]};
    case 'appendTeachingCourses':
      return {...state, teachingCourses: [...state.teachingCourses, action.payload]};
    case 'setJoinedCourses':
      return {...state, joinedCourses: action.payload};
    case 'setTeachingCourses':
      return {...state, teachingCourses: action.payload};
    default:
      return state;
  }
}

export default coursesReducer;

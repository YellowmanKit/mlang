import * as reducer from '../reducer';

const coursesReducer = (
  state = {
    courses: [],
    viewingCourse: {},
    teachingCourses: [],
    joinedCourses: []
  }, action)=>{
  switch (action.type) {
    case 'updateCourses':
        return {...state, courses: reducer.updateElements(state.courses, action.payload)};
    case 'updateJoinedCourses':
        return {...state, joinedCourses: reducer.updateElements(state.joinedCourses, action.payload, true)};
    case 'updateTeachingCourses':
        return {...state, teachingCourses: reducer.updateElements(state.teachingCourses, action.payload, true)};
    case 'viewCourse':
      return {...state, viewingCourse: action.payload};
    default:
      return state;
  }
}

export default coursesReducer;

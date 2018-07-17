const coursesReducer = (
  state = {
    viewingCourse: {},
    teachingCourses: [],
    joinedCourses: []
  }, action)=>{
  switch (action.type) {
    case 'viewCourse':
      return {...state, viewingCourse: action.payload};
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

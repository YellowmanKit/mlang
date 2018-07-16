const coursesReducer = (
  state = {
    teachingCourses: []
  }, action)=>{
  switch (action.type) {
    case 'appendTeachingCourse':
      return {...state, teachingCourses: [...state.teachingCourses, action.payload]};
    case 'setTeachingCourses':
      return {...state, teachingCourses: action.payload};
    default:
      return state;
  }
}

export default coursesReducer;

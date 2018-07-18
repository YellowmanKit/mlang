const coursesReducer = (
  state = {
    indexOfViewing: 0,
    viewingCourse: {},
    teachingCourses: [],
    joinedCourses: []
  }, action)=>{
  switch (action.type) {
    case 'updateTeachingCourse':
      var newTeachingCourses = state.teachingCourses;
      newTeachingCourses[state.indexOfViewing] = action.payload;
      return {...state, viewingCourse: action.payload, teachingCourses: newTeachingCourses}
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

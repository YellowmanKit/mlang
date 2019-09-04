const switchesReducer = (
  state = {
    hide: {
      schools: true,
      courses: true,
      subjects: false,
      admins: false,
      tools: true,

      cardBar: true,
      trace: false,
      passedCoursesCells: true,
      passedCoursesRows: true,
      passedProjectsRows: true
    },
    animation: {
      schools: true,
      courses: true,
      subjects: true,
      admins: false,
      tools: false,

      cardBar: false,
      row: true,
      panel: false,
      badge: false
    }
  }, action)=>{
  var hide = state.hide;
  var animation = state.animation;
  switch (action.type) {
    case 'setAnimation':
      animation[action.payload.type] = action.payload.state;
      return {...state, animation: animation}
    case 'setHide':
      hide[action.payload.type] = action.payload.state;
      return {...state, hide: hide}
    case 'toggleHide':
      const type = action.payload;
      hide[type] = !hide[type];
      animation[type] = true;
      return {...state, hide: hide, animation: animation}
    default:
      return state;
  }
}

export default switchesReducer;

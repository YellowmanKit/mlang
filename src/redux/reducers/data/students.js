const studentsReducer = (
  state = [

  ], action)=>{
  switch (action.type) {
    case 'appendStudents':
      return [...state, ...action.payload];
    default:
      return state;
  }
}

export default studentsReducer;

const studentsReducer = (
  state = [

  ], action)=>{
  switch (action.type) {
    case 'appendStudents':
      var studentsToAppend = action.payload;
      for(var i=0;i<state.length;i++){
        for(var j=studentsToAppend.length - 1;j>=0;j--){
          if(studentsToAppend[j].belongTo === state[i].belongTo){
            studentsToAppend.splice(j, 1);
          }
        }
      }
      return [...state, ...studentsToAppend];
    default:
      return state;
  }
}

export default studentsReducer;

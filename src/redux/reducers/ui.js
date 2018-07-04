const uiReducer = (state = {},action)=>{
  switch (action.type) {
    case 'setDimension':
      return {...state, width: action.payload.width, height: action.payload.height};
    default:
      return state;
  }
}

export default uiReducer;

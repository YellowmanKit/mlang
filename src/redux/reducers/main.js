const mainReducer = (state = {status: 'init'},action)=>{
  switch (action.type) {
    case 'setStatus':
      return {...state, status: action.payload};
    default:
      return state;
  }
}

export default mainReducer;

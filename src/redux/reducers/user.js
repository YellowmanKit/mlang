const userReducer = (
  state = {
    id: '',
    pw: ''
  }, action)=>{
  switch (action.type) {
    case 'setLoginInfo':
      return {...state, id: action.payload.id, pw: action.payload.pw};
    default:
      return state;
  }
}

export default userReducer;

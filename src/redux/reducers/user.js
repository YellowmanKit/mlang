const userReducer = (
  state = {
    id: 'ykwong',
    pw: '1234',
    type: 'student',
    email: 'wk.93128@gmail.com'
  }, action)=>{
  switch (action.type) {
    case 'setUser':
      return action.payload;
    default:
      return state;
  }
}

export default userReducer;

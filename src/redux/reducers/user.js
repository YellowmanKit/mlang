const userReducer = (
  state = {
    _id : "5b44750c80463c4de838bef9",
    type : "student",
    createdAt : new Date("2018-07-10T08:57:27.687Z"),
    id : "wk.93128@gmail.com",
    pw : "knafQa",
    email : "wk.93128@gmail.com",
    __v : 0
  }, action)=>{
  switch (action.type) {
    case 'setUser':
      return action.payload;
    default:
      return state;
  }
}

export default userReducer;

export const removeNotice = (index) =>{
  return {
    type: 'removeNotice',
    payload: index
  }
}

export const killNotice = (index) =>{
  return {
    type: 'killNotice',
    payload: index
  }
}

export const toggleNotice = () =>{
  return {
    type: 'toggleNotice'
  }
}

export const setNotice = (status) =>{
  return {
    type: 'setNotice',
    payload: status
  }
}

export function init(store, actions){
  return function (dispatch) {
    dispatch({type: "updateNotices", payload: [welcome()] });
  }
}

export function subject(){
  return {
    _id: 'welcome',
    message: ['Welcome back!', '歡迎回來!', '欢迎回来!']
  }
}

export function welcome(){
  return {
    _id: 'welcome',
    message: ['Welcome back!', '歡迎回來!', '欢迎回来!']
  }
}

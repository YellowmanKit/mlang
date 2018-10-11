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
    dispatch({type: "pushNotice", payload: welcome() });
    dispatch({type: "pushNotice", payload: hello() });
    dispatch({type: "pushNotice", payload: hey() });
    dispatch({type: "pushNotice", payload: welcome() });
    dispatch({type: "pushNotice", payload: hello() });
    dispatch({type: "pushNotice", payload: hey() });
  }
}

function welcome(){
  return {
    message: ['Welcome back!', '歡迎回來!', '欢迎回来!']
  }
}

function hello(){
  return {
    message: ['hello!', 'hello!', 'hello!']
  }
}

function hey(){
  return {
    message: ['hey', 'hey!', 'hey!']
  }
}

export function connecting(dispatch){
  dispatch({type: "message", payload: ['Connecting...', '連線中...']});
}

export function connectionError(dispatch){
  dispatch({type: "message", payload: ['Connection error, Please try again!', '網絡出現問題，請再試一次!']});
  dispatch({type: "showModalButton"});
}

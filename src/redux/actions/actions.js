export function connecting(dispatch){
  dispatch({type: "message", payload: {eng: 'Connecting...', chi: '連線中...'}});
}

export function connectionError(dispatch){
  dispatch({type: "message", payload: {eng: 'Connection error, Please try again!', chi: '網絡出現問題，請再試一次!'}});
  dispatch({type: "showModalButton"});
}

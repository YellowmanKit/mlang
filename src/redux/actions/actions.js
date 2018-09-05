export function connecting(dispatch){
  dispatch({type: "loadingMessage", payload: ['Connecting...', '連線中...', '连线中...']});
}

export function connectionError(dispatch){
  dispatch({type: "message", payload: ['Connection error, Please try again!', '網絡出現問題，請再試一次!', '网络出现问题，请再试一次!']});
}

export function updateSuccess(dispatch){
  dispatch({type: "message", payload: ['Update succeed!', '更改成功!', '更改成功!']});
}

export function updateFailed(dispatch){
  dispatch({type: "message", payload: ['Update failed! Please try again!', '更改失敗! 請再試一次!', '更改失敗! 請再試一次!']});
}

export function api(){ return process.env.REACT_APP_DEV? process.env.REACT_APP_API_DEV: process.env.REACT_APP_API; }

export const setPhoto = (blob) =>{
  //console.log("Action: setStatus")
  return {
    type: 'setPhoto',
    payload: blob
  }
}

export const setStatus = (status) =>{
  //console.log("Action: setStatus")
  return {
    type: 'setStatus',
    payload: status
  }
}

export const setLanguage = (lang) =>{
  return {
    type: 'setLanguage',
    payload: lang
  }
}

export const setModal = (modal) =>{
  return {
    type: 'setModal',
    payload: modal
  }
}

export function fetchData (_id) {
  console.log('fetchData: ' + _id);

  return function (dispatch) {
    dispatch({type: "setModal", payload: "loading"});

    /*axios.get(api + '/user/login',{id: _id, pw:_pw}).then(res=>{

    }).catch(err=>{
      console.log(err);
      dispatch({type: "setModal", payload: "fetchDataError"});
    });*/
    dispatch({type: "setStatus", payload: "takePicture"});
    dispatch({type: "setModal", payload: "off"});
  }
}

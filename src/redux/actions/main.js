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

export const setPhoto = (blob) =>{
  return {
    type: 'setPhoto',
    payload: blob
  }
}

export const setStatus = (status) =>{
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

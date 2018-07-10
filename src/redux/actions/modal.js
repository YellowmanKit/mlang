export const setModalMessage = (message) =>{
  return {
    type: 'setModalMessage',
    payload: message
  }
}

export const showModalButton = () =>{
  return {
    type: 'showModalButton',
  }
}

export const hideModal = () =>{
  return {
    type: 'hideModal',
  }
}

export const errorMessage = (message) =>{
  return {
    type: 'errorMessage',
    payload: message
  }
}

export const message = (message) =>{
  return {
    type: 'message',
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

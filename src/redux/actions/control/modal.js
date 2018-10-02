export const confirm = (message, onConfirm) =>{
  return {
    type: 'confirm',
    payload: { message: message, onConfirm: onConfirm }
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

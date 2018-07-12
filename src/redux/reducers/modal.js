const modalReducer = (
  state = {
    status: 'off',
    messageEng: '',
    messageChi: '',
    button: 'off'
  }, action)=>{
  switch (action.type) {
    case 'message':
      return {...state, status: 'on', messageEng: action.payload.eng, messageChi: action.payload.chi};
    case 'showModalButton':
      return {...state, button: 'on'};
    case 'hideModal':
      return {...state, status: 'off', button: 'off'};
    default:
      return state;
  }
}

export default modalReducer;

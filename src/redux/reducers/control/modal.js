const modalReducer = (
  state = {
    status: 'off',
    english: '',
    chinese: '',
    simplified_chinese: '',
    button: 'off'
  }, action)=>{
  switch (action.type) {
    case 'message':
      return {...state, status: 'on', button: 'on', english: action.payload[0], chinese: action.payload[1], simplified_chinese: action.payload[2]};
    case 'loadingMessage':
      return {...state, status: 'on', button: 'off', english: action.payload[0], chinese: action.payload[1], simplified_chinese: action.payload[2]};
    case 'hideModal':
      return {...state, status: 'off', button: 'off'};
    default:
      return state;
  }
}

export default modalReducer;

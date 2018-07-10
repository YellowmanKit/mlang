const mainReducer = (
  state = {
    status: 'init',
    modal: 'off',
    photo: null,
    language: 'english',
    version: 'v1.0.0'
  }, action)=>{
  switch (action.type) {
    case 'setStatus':
      return {...state, status: action.payload};
    case 'setLanguage':
      return {...state, language: action.payload};
    case 'setPhoto':
      return {...state, photo: action.payload};
    case 'setModal':
      return {...state, modal: action.payload};
    default:
      return state;
  }
}

export default mainReducer;

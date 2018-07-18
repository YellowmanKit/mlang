const mainReducer = (
  state = {
    status: 'init',
    modal: 'off',
    photoUrl: null,
    photoBlob: null,
    language: 'english',
    version: 'v1.0.0'
  }, action)=>{
  switch (action.type) {
    case 'setStatus':
      return {...state, status: action.payload};
    case 'setLanguage':
      return {...state, language: action.payload};
    case 'setPhoto':
      return {...state, photoUrl: action.payload.url, photoBlob: action.payload.blob};
    case 'setModal':
      return {...state, modal: action.payload};
    default:
      return state;
  }
}

export default mainReducer;
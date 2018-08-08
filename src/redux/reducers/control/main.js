const mainReducer = (
  state = {
    status: 'init',
    modal: 'off',

    photoUrl: null,
    photoBlob: null,

    recording: false,
    onRecordStop: null,

    enlarger: 'off',
    enlargeImage: null,
    enlargeText: '',

    language: 'english',
    version: 'v1.0.0'
  }, action)=>{
  switch (action.type) {
    case 'enlargeText':
      return {...state, enlarger: 'text', enlargeText: action.payload };
    case 'enlargeImage':
      return {...state, enlarger: 'image', enlargeImage: action.payload };
    case 'closeEnlarger':
      return {...state, enlarger: 'off'};
    case 'setAudioRecorder':
      return {...state, recording: action.payload.recording, onRecordStop: action.payload.onRecordStop};
    case 'setStatus':
      return {...state, status: action.payload};
    case 'setLanguage':
      return {...state, language: action.payload};
    case 'setPhoto':
      if(!action.payload){ return state; }
      return {...state, photoUrl: action.payload.url, photoBlob: action.payload.blob};
    case 'setModal':
      return {...state, modal: action.payload};
    default:
      return state;
  }
}

export default mainReducer;

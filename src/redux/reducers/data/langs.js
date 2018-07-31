import * as reducer from '../reducer';

const langsReducer = (
  state = {
    editLangs:[],
    langs: [],
    langKeys: [
      {
        key: 'chinese_written',
        name: ['Chinese(Written)','中文(書面語)'],
        use: true
      },
      {
        key: 'english',
        name: ['English','英文'],
        use: true
      },
      {
        key: 'chinese_spoken',
        name: ['Chinese(Spoken)','中文(口語)'],
        use: true
      },
      {
        key: 'pth_written',
        name: ['PTH(Written)','普通話(書面語)'],
        use: true
      },
      {
        key: 'pth_spoken',
        name: ['PTH(Written)','普通話(口語)'],
        use: true
      },
      {
        key: 'hindi',
        name: ['Hindi','印度語'],
        use: true
      },
      {
        key: 'urdu',
        name: ['Urdu','烏都語'],
        use: true
      },
      {
        key: 'nepalese',
        name: ['Nepalese','尼泊爾語'],
        use: true
      },
      {
        key: 'tagalog',
        name: ['Tagalog','他加祿語'],
        use: true
      },
      {
        key: 'japanese',
        name: ['Japanese','日文'],
        use: true
      },
      {
        key: 'spanish',
        name: ['Spanish','西班牙文'],
        use: true
      },
      {
        key: 'german',
        name: ['German','德文'],
        use: true
      },
      {
        key: 'french',
        name: ['French','法文'],
        use: true
      }
    ]
  }, action)=>{
  const newEditLangs = state.editLangs.slice(0);
  switch (action.type) {
    case 'updateLangs':
      return {...state, langs: reducer.updateElements(state.langs, action.payload)};
    case 'setLangAudio':
      const index = action.payload.index;
      newEditLangs[index] = {...newEditLangs[index], audioBlob: action.payload.blob}
      return {...state, editLangs: newEditLangs}
    case 'setEditLang':
      newEditLangs[action.payload.index] = action.payload.editLang;
      return {...state, editLangs: newEditLangs};
    case 'setEditLangs':
      return {...state, editLangs: action.payload};
    case 'removeEditLangsItem':
      newEditLangs.splice(action.payload,1);
      return {...state, editLangs: newEditLangs};
    case 'pushEditLangs':
      return {...state, editLangs: [...state.editLangs, action.payload]};
    case 'appendLangs':
      return {...state, langs: [...state.langs, ...action.payload]};
    default:
      return state;
  }
}

export default langsReducer;

const contentReducer = (
  state = {
    menu: 'off',
    view: '',
    traces: [],
    subView: ''
  }, action)=>{
  switch (action.type) {
    case 'setSubView':
      return {...state, subView: action.payload}
    case 'backToHome':
      return {...state, traces: state.traces.slice(0, 1), view: state.traces[0]};
    case 'clearView':
      return {...state, traces: [], view: ''};
    case 'pullView':
      return {...state, traces: state.traces.slice(0, state.traces.length - 1), view: state.traces[state.traces.length - 2]};
    case 'pushView':
      return {...state, traces: [...state.traces, action.payload], view: action.payload};
    case 'toggleMenu':
      return {...state, menu: state.menu === 'off'? 'on': 'off'};
    default:
      return state;
  }
}

export default contentReducer;
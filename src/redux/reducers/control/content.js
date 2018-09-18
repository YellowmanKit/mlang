const contentReducer = (
  state = {
    menu: 'init',
    view: '',
    traces: [],
    previousViews: [],
    filterOption: 'All',
    subView: '',
    cachedUrl: {},
    hide: {
      schools: false,
      courses: false,
      subjects: false,
      cardBar: true,
      tree: false
    },
    cardBar: false,
    animation: {
      schools: true,
      courses: true,
      subjects: true,
      cardBar: false,
      row: true,
      panel: false,
      badge: false
    }
  }, action)=>{
  var hide = state.hide;
  var animation = state.animation;
  switch (action.type) {
    case 'setAnimation':
      animation[action.payload.type] = action.payload.state;
      return {...state, animation: animation}
    case 'setHide':
      hide[action.payload.type] = action.payload.state;
      return {...state, hide: hide}
    case 'toggleHide':
      const type = action.payload;
      hide[type] = hide[type] === 'init'? true: !hide[type];
      animation[type] = true;
      return {...state, hide: hide, animation: animation}
    case 'setFilter':
      return {...state, filterOption: action.payload}
    case 'cacheUrl':
      var newCachedUrl = state.cachedUrl;
      newCachedUrl[action.payload.filename] = action.payload.url;
     return {...state, cachedUrl: newCachedUrl}
    case 'setSubView':
      return {...state, subView: action.payload}
    case 'backToHome':
      return {...state, traces: state.traces.slice(0, 1), view: state.traces[0]};
    case 'clearView':
      return {...state, traces: [], view: ''};
    case 'pullPreviewsView':
      return {...state, previousViews: state.previousViews.slice(0, state.traces.length - 1)}
    case 'pullView':
      animation['row'] = false;
      return {...state, traces: state.traces.slice(0, state.traces.length - 1), previousViews: [...state.previousViews, state.view], view: state.traces[state.traces.length - 2], animation: animation};
    case 'pushView':
      animation['row'] = true;
      return {...state, traces: [...state.traces, action.payload], previousViews: [], view: action.payload, animation: animation};
    case 'toggleMenu':
      return {...state, menu: state.menu === 'init'?'on':state.menu === 'off'? 'on': 'off'};
    default:
      return state;
  }
}

export default contentReducer;

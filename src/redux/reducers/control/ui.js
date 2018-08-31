const uiReducer = (
  state = {
    minWidth: 360,
    maxWidth: 840,
    minHeight: 540,
    maxHeight: 1440,
    windowWidth: 0,
    windowHeight: 0,
    basicStyle: {
      width: 0,
      height: 0,
      display: 'flex',
      flexFlow: 'column nowrap',
      alignItems: 'center'
    },
    styles: {
      container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundSize: '100% 100%',
        flexShrink: 0
      },
      area: {
        width: '100%',
        display: 'flex',
        flexFlow: 'row warp'
      },
      button: {
        backgroundColor: 'transparent',
        border: 'none',
        cursor: 'pointer',
        backgroundSize: '100% 100%'
      },
      border: {
        borderStyle: 'solid',
        borderWidth: '1px',
        borderColor: 'grey'
      },
      list: {
        width: '100%',
        height: '100%',
        overflow: 'auto'
      }
    },
    colors: {
      mlangGreen: '#91c33b',
      ultraLightGrey: '#f3f3f3',
      lightGrey: '#ededed',
      grey: '#9b9b9b',
      darkGrey: '#dbdbdb',
      deepDarkGrey: '#777777',
      selectedGrey: '#444444',
      gradientBasic: 'linear-gradient(to right, white 0%, #ededed 100%)'
    }
  }, action)=>{
  switch (action.type) {
    case 'setDimension':
      const _windowWidth = action.payload.width;
      const _windowHeight = action.payload.height;
      const _basicStyle =
      {...state.basicStyle,
        width:
        _windowWidth < state.minWidth? state.minWidth:
        _windowWidth > state.maxWidth? state.maxWidth:
        _windowWidth ,
        height:
        _windowHeight < state.minHeight? state.minHeight:
        _windowHeight > state.maxHeight? state.maxHeight:
        _windowHeight};
      return {...state,
              windowWidth: _windowWidth,
              windowHeight: _windowHeight,
              basicStyle: _basicStyle};
    default:
      return state;
  }
}

export default uiReducer;

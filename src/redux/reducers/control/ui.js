const uiReducer = (
  state = {
    minWidth: 360,
    maxWidth: 480,
    minHeight: 540,
    maxHeight: 720,
    windowWidth: 0,
    windowHeight: 0,
    basicStyle: {
      width: 0,
      height: 0,
      display: 'flex',
      flexFlow: 'column nowrap',
      alignItems: 'center'
    },
    viewStyle: {
      justifyContent: 'flex-start',
      backgroundColor: 'white'
    },
    containerStyle: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundSize: '100% 100%'
    },
    areaStyle: {
      width: '100%',
      display: 'flex',
      flexFlow: 'row warp'
    },
    buttonStyle: {
      backgroundColor: 'transparent',
      border: 'none',
      cursor: 'pointer',
      backgroundSize: '100% 100%'
    },
    eventBtnStyle: {
      width: '67%',
      height: '5%',
      fontWeight: 'bold',
      color: 'white',
      fontSize: '100%',
      marginTop: '5%'
    },
    absoluteBtnStyle: {
      position: 'absolute',
      bottom: '10%',
      backgroundColor: 'rgba(100, 100, 100, 0.5)',
      color: 'white',
      fontSize: '100%',
      fontWeight: 'bold',
      textAlign: 'center',
      borderRadius: '5px'
    },
    borderStyle: {
      borderStyle: 'solid',
      borderWidth: '1px',
      borderColor: 'grey'
    },
    listStyle: {
      width: '100%',
      height: '100%',
      overflow: 'auto'
    },
    mlangGreen: '#91c33b',
    ultraLightGrey: '#f3f3f3',
    lightGrey: '#ededed',
    darkGrey: '#dbdbdb',
    deepDarkGrey: '#777777',
    selectedGrey: '#444444',
    gradientBasic: 'linear-gradient(to right, white 0%, #ededed 100%)'
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
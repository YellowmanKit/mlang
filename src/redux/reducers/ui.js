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
      pageWidth: 0,
      pageHeight: 0,
      display: 'flex',
      flexFlow: 'column nowrap',
      alignItems: 'center'
    },
    buttonStyle: {
      backgroundColor: 'transparent',
      border: 'none',
      cursor: 'pointer',
      backgroundSize: '100% 100%'
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
    }
  }, action)=>{
  switch (action.type) {
    case 'setDimension':
    const _windowWidth = action.payload.width;
    const _windowHeight = action.payload.height
      const newBasicStyle =
      {...state.basicStyle,
        width:
        _windowWidth < state.minWidth? state.minWidth:
        _windowWidth > state.maxWidth? state.maxWidth:
        _windowWidth ,
        height:
        _windowHeight < state.minHeight? state.minHeight:
        _windowHeight > state.maxHeight? state.maxHeight:
        _windowHeight};
      return {...state, windowWidth: _windowWidth, windowHeight: _windowHeight, basicStyle: newBasicStyle};
    default:
      return state;
  }
}

export default uiReducer;

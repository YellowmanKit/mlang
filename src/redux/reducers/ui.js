const uiReducer = (
  state = {
    basicStyle: {
      minWidth: 360,
      maxWidth: 480,
      minHeight: 540,
      maxHeight: 720,
      width: 0,
      height: 0,
      display: 'flex',
      flexFlow: 'column nowrap',
      alignItems: 'center'
    }
  },action)=>{
  switch (action.type) {
    case 'setDimension':
      const newBasicStyle =
      {...state.basicStyle, width: action.payload.width, height: action.payload.height};
      return {...state, basicStyle: newBasicStyle};
    default:
      return state;
  }
}

export default uiReducer;

const contentReducer = (
  state = {
    menu: 'on'
  }, action)=>{
  switch (action.type) {
    case 'toggleMenu':
      return {...state, menu: state.menu === 'off'? 'on': 'off'};
    default:
      return state;
  }
}

export default contentReducer;

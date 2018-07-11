export const pullView = () =>{
  return {
    type: 'pullView'
  }
}

export const pushView = (view) =>{
  return {
    type: 'pushView',
    payload: view
  }
}

export const toggleMenu = () =>{
  return {
    type: 'toggleMenu'
  }
}

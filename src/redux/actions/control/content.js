export const toggleCardBar = () =>{
  return {
    type: 'toggleCardBar'
  }
}

export const setAnimation = (type, state) =>{
  return {
    type: 'setAnimation',
    payload: {type: type, state: state}
  }
}

export const setHide = (type, state) =>{
  return {
    type: 'setHide',
    payload: { type: type, state: state}
  }
}

export const toggleHide = (type) =>{
  return {
    type: 'toggleHide',
    payload: type
  }
}

export const setFilter = (filterOption) =>{
  return {
    type: 'setFilter',
    payload: filterOption
  }
}

export const cacheUrl = (filename, url) =>{
  return {
    type: 'cacheUrl',
    payload: { filename: filename, url: url }
  }
}

export const setSubView = (subView) =>{
  return {
    type: 'setSubView',
    payload: subView
  }
}

export const backToHome = () =>{
  return {
    type: 'backToHome'
  }
}

export const clearView = () =>{
  return {
    type: 'clearView'
  }
}

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

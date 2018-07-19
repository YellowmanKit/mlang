
export const setEditLangs = (editLangs) =>{
  return {
    type: 'setEditLangs',
    payload: editLangs
  }
}


export const removeEditLangsItem = (index) =>{
  return {
    type: 'removeEditLangsItem',
    payload: index
  }
}


export const pushEditLangs = (lang) =>{
  return {
    type: 'pushEditLangs',
    payload: lang
  }
}

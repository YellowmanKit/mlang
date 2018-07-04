export const setStatus = (status) =>{
  console.log("Action: setStatus")
  return {
    type: 'setStatus',
    payload: status
  }
}

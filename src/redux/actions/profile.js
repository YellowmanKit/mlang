import axios from 'axios';
import * as actions from './actions';
var api = process.env.REACT_APP_API;

export function changeProfile(newProfile){
  //console.log(newProfile)
  return function (dispatch) {
    axios.post(api + '/profile/update',{
      data: newProfile
    }).then(res=>{
      dispatch({type: "showModalButton"});
      const result = res.data.result
      //console.log('result: ' + result);
      if(result === 'success'){
        dispatch({type: "message", payload: {eng: 'Update succeed!', chi: '更改成功!'}});
        dispatch({type: "setProfile", payload: res.data.updatedProfile});
      }else{
        dispatch({type: "message", payload: {eng: 'Update failed! Please try again!', chi: '更改失敗! 請再試一次!'}});
      }
    }).catch(err=>{
      actions.connectionError(dispatch);
    })
  }
}

export const setProfile = (profile) =>{
  return {
    type: 'setProfile',
    payload: profile
  }
}

import axios from 'axios';
import * as actions from '../actions';
import to from '../to';
var api = process.env.REACT_APP_API;

export const viewProfile = (profile) =>{
  return {
    type: 'viewProfile',
    payload: profile
  }
}


export function getProfiles(usersId){
  //console.log(students)
  return async function (dispatch) {
    let err, res;
    [err, res] = await to(axios.post(api + '/profile/getMultiple', { data: usersId }));
    if(err){actions.connectionError(dispatch); return;}

    if(res.data.result === 'success'){
      dispatch({type: "updateProfiles", payload: res.data.profiles});
    }else{
      dispatch({type: "message", payload: ['Failed to get profiles data!', '無法查閱學生資料!']});
    }
  }
}

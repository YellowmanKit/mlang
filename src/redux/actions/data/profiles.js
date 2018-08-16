import axios from 'axios';
import * as actions from '../actions';
var api = process.env.REACT_APP_API;


export function getProfiles(usersId){
  //console.log(students)
  return function (dispatch) {
    //actions.connecting(dispatch);
    axios.post(api + '/profile/getMultiple', { data: usersId })
    .then(res=>{
      if(res.data.result === 'success'){
        dispatch({type: "updateProfiles", payload: res.data.profiles});
      }else{
        dispatch({type: "showModalButton"});
        dispatch({type: "message", payload: ['Failed to get profiles data!', '無法查閱學生資料!']});
      }
    }).catch(err=>{
      actions.connectionError(dispatch);
    })
  }

}

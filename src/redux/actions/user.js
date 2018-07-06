//import axios from 'axios';
import  * as mainActions  from './main';

//var api = process.env.REACT_APP_API;

export const setLoginInfo = (info) =>{
  return {
    type: 'setLoginInfo',
    payload: info
  }
}

export function login (_id, _pw) {
  //console.log('login: ' + _id + ' ' + _pw);
  //console.log(api);

  return function (dispatch) {
    dispatch({type: "setModal", payload: "loggingIn"});

    return mainActions.fetchData(_id)(dispatch);

    /*axios.get(api + '/user/login',{ headers: { id: _id, pw: _pw }})
    .then(res=>{
      const result = res.data.login
      console.log('result: ' + result);
      if(result === 'failed'){
        dispatch({type: "setModal", payload: "loginFailed"});
      }else{
        dispatch({type: "setLoginInfo", payload: {id: _id, pw: _pw}});
        return mainActions.fetchData(_id)(dispatch);
      }

    }).catch(err=>{
      //console.log(err);
      dispatch({type: "setModal", payload: "loginError"});
    });*/
  }
}

import axios from 'axios';
//import  * as mainActions  from './main';

var api = process.env.REACT_APP_API;

export const setLoginInfo = (info) =>{
  return {
    type: 'setLoginInfo',
    payload: info
  }
}

export function resetPassword (_email) {
  //console.log('login: ' + _id + ' ' + _pw);
  return function (dispatch) {
    dispatch({type: "setModalMessage", payload: {eng: 'Reseting password...', chi: '密碼重置中...'}});

    axios.get(api + '/user/resetPassword',{ headers: { email: _email }})
    .then(res=>{
      const result = res.data.result
      //console.log('result: ' + result);
      dispatch({type: "showModalButton"});
      if(result !== 'success'){
        dispatch({type: "setModalMessage", payload: {eng: 'Failed to reset password! Please make sure to enter a correct email address!', chi: '密碼重置失敗! 請確定電郵地址正確!'}});
      }else{
        dispatch({type: "setModalMessage", payload: {eng: 'Reset password succeed! Please check email for new password!', chi: '密碼重置成功! 請查看電子郵件!'}});
      }

    }).catch(err=>{
      //console.log(err);
      dispatch({type: "showModalButton"});
      dispatch({type: "setModalMessage", payload: {eng: 'Connection error, Please try again!', chi: '網絡出現問題，請再試一次!'}});
    });
  }
}

export function getNewAccount (_email) {
  //console.log('login: ' + _id + ' ' + _pw);
  return function (dispatch) {
    dispatch({type: "setModalMessage", payload: {eng: 'Acquiring for new account...', chi: '申請進行中...'}});

    axios.get(api + '/user/getNewAccount',{ headers: { email: _email }})
    .then(res=>{
      const result = res.data.result
      //console.log('result: ' + result);
      dispatch({type: "showModalButton"});
      if(result !== 'success'){
        dispatch({type: "setModalMessage", payload: {eng: 'Failed to acquire new account!', chi: '申請失敗!'}});
      }else{
        dispatch({type: "setModalMessage", payload: {eng: 'Acquire succeed! Please check your email for login infomation!', chi: '申請成功! 請查看電子郵件!'}});
      }
    }).catch(err=>{
      //console.log(err);
      dispatch({type: "showModalButton"});
      dispatch({type: "setModalMessage", payload: {eng: 'Connection error, please try again!', chi: '網絡出現問題，請再試一次!'}});
    });
  }
}

export function login (_id, _pw) {
  //console.log('login: ' + _id + ' ' + _pw);

  return function (dispatch) {
    dispatch({type: "setModalMessage", payload: {eng: 'Logging in...', chi: '登入中...'}});
    axios.get(api + '/user/login',{ headers: { id: _id, pw: _pw }})
    .then(res=>{
      const result = res.data.result
      //console.log('result: ' + result);
      if(result !== 'success'){
        dispatch({type: "setModalMessage", payload: {eng: 'Login failed! Invalid id or password!', chi: '登入失敗! 名稱或密碼不正確!'}});
        dispatch({type: "showModalButton"});
      }else{
        dispatch({type: "setUser", payload: res.data.user});
        dispatch({type: "setProfile", payload: res.data.profile});
        dispatch({type: "setStatus", payload: "ready"});
        dispatch({type: "hideModal"});
      }
    }).catch(err=>{
      //console.log(err);
      dispatch({type: "setModalMessage", payload: {eng: 'Connection error, Please try again!', chi: '網絡出現問題，請再試一次!'}});
      dispatch({type: "showModalButton"});
    });
  }
}

export function logout() {
  return function (dispatch) {
    dispatch({type: "setStatus", payload: "waitForLogin"});
  }
}

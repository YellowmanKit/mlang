import axios from 'axios';
import * as actions from '../actions';
var api = process.env.REACT_APP_API;

export function changeUserInfo(newUser){
  //console.log(newUser)
  return function (dispatch) {
    actions.connecting(dispatch);

    axios.post(api + '/user/update',{
      data: newUser
    }).then(res=>{
      dispatch({type: "showModalButton"});
      if(res.data.result === 'success'){
        dispatch({type: "message", payload: {eng: 'Update succeed!', chi: '更改成功!'}});
        dispatch({type: "setUser", payload: res.data.updatedUser});
      }else{
        dispatch({type: "message", payload: {eng: 'Update failed! Please try again!', chi: '更改失敗! 請再試一次!'}});
      }
    }).catch(err=>{
      actions.connectionError(dispatch);
    })
  }
}

export function resetPassword (_email) {
  //console.log('login: ' + _id + ' ' + _pw);
  return function (dispatch) {
    dispatch({type: "message", payload: {eng: 'Reseting password...', chi: '密碼重置中...'}});

    axios.get(api + '/user/resetPassword',{ headers: { email: _email }})
    .then(res=>{
      dispatch({type: "showModalButton"});
      if(res.data.result === 'success'){
        dispatch({type: "message", payload: {eng: 'Reset password succeed! Please check email for new password!', chi: '密碼重置成功! 請查看電子郵件!'}});
      }else{
        dispatch({type: "message", payload: {eng: 'Failed to reset password! Please make sure to enter a correct email address!', chi: '密碼重置失敗! 請確定電郵地址正確!'}});
      }

    }).catch(err=>{
      actions.connectionError(dispatch);
    });
  }
}

export function getNewAccount (_email) {
  //console.log('login: ' + _id + ' ' + _pw);
  return function (dispatch) {
    dispatch({type: "message", payload: {eng: 'Acquiring for new account...', chi: '申請進行中...'}});

    axios.get(api + '/user/getNewAccount',{ headers: { email: _email }})
    .then(res=>{
      dispatch({type: "showModalButton"});
      if(res.data.result === 'success'){
        dispatch({type: "message", payload: {eng: 'Acquire succeed! Please check your email for login infomation!', chi: '申請成功! 請查看電子郵件!'}});
      }else{
        dispatch({type: "message", payload: {eng: 'Failed to acquire new account! The email address is either invalid or already used!', chi: '申請失敗! 電郵地址不正確或已被使用!'}});
      }
    }).catch(err=>{
      actions.connectionError(dispatch);
    });
  }
}

export function login (_id, _pw) {
  //console.log('login: ' + _id + ' ' + _pw);

  return function (dispatch) {
    dispatch({type: "message", payload: {eng: 'Logging in...', chi: '登入中...'}});
    axios.get(api + '/user/login',{ headers: { id: _id, pw: _pw }})
    .then(res=>{
      if(res.data.result === 'success'){
        dispatch({type: "setUser", payload: res.data.user});
        dispatch({type: "setProfile", payload: res.data.profile});
        dispatch({type: "setTeachingCourses", payload: res.data.teachingCourses});
        dispatch({type: "setJoinedCourses", payload: res.data.joinedCourses});
        dispatch({type: "setStatus", payload: "ready"});
        dispatch({type: "hideModal"});
      }else{
        dispatch({type: "message", payload: {eng: 'Login failed! Invalid id or password!', chi: '登入失敗! 名稱或密碼不正確!'}});
        dispatch({type: "showModalButton"});
      }
    }).catch(err=>{
      actions.connectionError(dispatch);
    });
  }
}

export function logout() {
  return function (dispatch) {
    dispatch({type: "setStatus", payload: "waitForLogin"});
  }
}

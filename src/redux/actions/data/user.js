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
        dispatch({type: "message", payload: ['Update succeed!', '更改成功!']});
        dispatch({type: "setUser", payload: res.data.updatedUser});
      }else{
        dispatch({type: "message", payload: ['Update failed! Please try again!', '更改失敗! 請再試一次!']});
      }
    }).catch(err=>{
      actions.connectionError(dispatch);
    })
  }
}

export function resetPassword (_email) {
  //console.log('login: ' + _id + ' ' + _pw);
  return function (dispatch) {
    dispatch({type: "message", payload: ['Reseting password...', '密碼重置中...']});

    axios.get(api + '/user/resetPassword',{ headers: { email: _email }})
    .then(res=>{
      dispatch({type: "showModalButton"});
      if(res.data.result === 'success'){
        dispatch({type: "message", payload: ['Reset password succeed! Please check email for new password!', '密碼重置成功! 請查看電子郵件!']});
      }else{
        dispatch({type: "message", payload: ['Failed to reset password! Please make sure to enter a correct email address!', '密碼重置失敗! 請確定電郵地址正確!']});
      }

    }).catch(err=>{
      actions.connectionError(dispatch);
    });
  }
}

export function getNewAccount (_email) {
  //console.log('login: ' + _id + ' ' + _pw);
  return function (dispatch) {
    if(_email.indexOf('@') < 0){
      dispatch({type: "showModalButton"});
      dispatch({type: "message", payload: ['Invalid email!', '電郵地址不正確!']});
      return;
    }
    dispatch({type: "message", payload: ['Acquiring for new account...', '申請進行中...']});

    axios.get(api + '/user/getNewAccount',{ headers: { email: _email }})
    .then(res=>{
      dispatch({type: "showModalButton"});
      if(res.data.result === 'success'){
        dispatch({type: "message", payload: ['Acquire succeed! Please check your email for login infomation!', '申請成功! 請查看電子郵件!']});
      }else{
        dispatch({type: "message", payload: ['Failed to acquire new account! The email address is either invalid or already used!', '申請失敗! 電郵地址不正確或已被使用!']});
      }
    }).catch(err=>{
      actions.connectionError(dispatch);
    });
  }
}

export function login (_id, _pw) {
  console.log(api);
  return function (dispatch) {
    dispatch({type: "message", payload: ['Logging in...', '登入中...']});
    axios.get(api + '/user/login',{ headers: { id: _id, pw: _pw }})
    .then(res=>{
      if(res.data.result === 'success'){
        console.log(res.data);
        dispatch({type: "setUser", payload: res.data.user});
        dispatch({type: "setProfile", payload: res.data.profile});

        dispatch({type: "updateCourses", payload: res.data.courses});
        dispatch({type: "updateProjects", payload: res.data.projects});

        dispatch({type: "updateTeachingCourses", payload: res.data.teachingCourses});
        dispatch({type: "updateJoinedCourses", payload: res.data.joinedCourses});

        dispatch({type: "updateTeachingProjects", payload: res.data.teachingProjects});
        dispatch({type: "updateJoinedProjects", payload: res.data.joinedProjects});

        dispatch({type: "setStatus", payload: "ready"});
        dispatch({type: "hideModal"});
      }else{
        dispatch({type: "message", payload: ['Login failed! Invalid id or password!', '登入失敗! 名稱或密碼不正確!']});
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
    window.location.reload();
  }
}

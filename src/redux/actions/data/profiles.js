import axios from 'axios';
import * as actions from '../actions';
import to from '../to';
var api = actions.api();

export const viewAdminProfile = (profile) =>{
  return {
    type: 'viewAdminProfile',
    payload: profile
  }
}

export const viewTeacherProfile = (profile) =>{
  return {
    type: 'viewTeacherProfile',
    payload: profile
  }
}

export const viewProfile = (profile) =>{
  return {
    type: 'viewProfile',
    payload: profile
  }
}

export function getStatistics(userId){
  return async function (dispatch) {
      let err, res;
      [err, res] = await to(axios.post(api + '/profile/getStatistics', { data: userId }));
      if(err){actions.connectionError(dispatch); return;}

      if(res.data.result === 'success'){
        dispatch({type: 'setStatistics', payload: {id: userId, statistics: res.data.statistics}});
      } else {
        dispatch({type: 'message', payload: ['Failed to load student statistics!',  '無法查閱學生統計數據！',  '无法查阅学生统计数据！']});
      }
  }
}

export function getProfiles(usersId){
  //console.log(students)
  return async function (dispatch) {
    let err, res;
    [err, res] = await to(axios.post(api + '/profile/getMultiple', { data: usersId }));
    if(err){actions.connectionError(dispatch); return;}

    if(res.data.result === 'success'){
      dispatch({type: 'updateProfiles', payload: res.data.profiles});
    }else{
      dispatch({type: 'message', payload: ['Failed to get profiles data!', '無法查閱學生資料!', '无法查阅学生资料!']});
    }
  }
}

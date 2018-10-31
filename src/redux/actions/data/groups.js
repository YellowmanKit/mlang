import axios from 'axios';
import * as actions from '../actions';
import to from '../to';
var api = actions.api();



export function joinGroup(userId, groupCode){
  return async function (dispatch){
    actions.connecting(dispatch);

    let err, res;
    [err, res] = await to(axios.post(api + '/group/join', { data: { userId: userId, groupCode: groupCode} }));
    if(err){actions.connectionError(dispatch); return;}

    if(res.data.result === 'success'){

    }else{
      dispatch({type: 'message', payload: ['Failed to join group! Please check if the group code is correct!', '加入失敗! 請檢查小組代碼是否正確!', '加入失败! 请检查小组代码是否正确!']});
    }
  }
}

export function createGroup(userId, projectId, groupName){
  console.log(userId);
  return async function (dispatch){
    actions.connecting(dispatch);

    let err, res;
    [err, res] = await to(axios.post(api + '/group/add', { data: { userId: userId, projectId: projectId, groupName: groupName } }));
    if(err){actions.connectionError(dispatch); return;}

    if(res.data.result === 'success'){
      dispatch({type: 'message', payload: ['Create group succeed!', '成功創建小組!', '成功创建小组!']});
      dispatch({type: 'updateGroups', payload: [res.data.group]});
      dispatch({type: 'updateGroups', payload: [res.data.group]});
    }else{
      dispatch({type: 'message', payload: ['Failed to create group! Please try again!', '創建失敗! 請再試一次!', '创建失败! 请再试一次!']});
    }
  }
}

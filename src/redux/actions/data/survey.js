import axios from 'axios';
import * as actions from '../actions';
import to from '../to';
var api = actions.api();

export const setEditQuestion = (editQuestion) =>{
  return {
    type: 'setEditQuestion',
    payload: editQuestion
  }
}

export const setEditQuestions = (editQuestions) =>{
  return {
    type: 'setEditQuestions',
    payload: editQuestions
  }
}

export const killEditQuestionsItem = (index) =>{
  return {
    type: 'killEditQuestionsItem',
    payload: index
  }
}

export const removeEditQuestionsItem = (index) =>{
  return {
    type: 'removeEditQuestionsItem',
    payload: index
  }
}

export const pushEditQuestions = (lang) =>{
  return {
    type: 'pushEditQuestions',
    payload: lang
  }
}


export const viewQuestionnaire = (questionnaire) =>{
  return {
    type: 'viewQuestionnaire',
    payload: questionnaire
  }
}

export const viewPublish = (publish) =>{
  return {
    type: 'viewPublish',
    payload: publish
  }
}

export function editPublish(data){
  return async function (dispatch) {
    actions.connecting(dispatch);

    let err, publishRes;
    [err, publishRes] = await to(axios.post(api + '/survey/publish/edit', {data: data}));
    if(err){actions.connectionError(dispatch); return;}

    if(publishRes.data.result === 'success'){
      console.log(publishRes.data);
      dispatch({type: 'message', payload: ['Edit publish succeed!', '成功修改發佈!', '成功修改发布!']});
      dispatch({type: 'updatePublishes', payload: publishRes.data.updatedPublishes});
      dispatch({type: 'pullView'});
    }else{
      dispatch({type: 'message', payload: ['Failed to edit publish!', '發佈修改失敗!', '发布修改失败!']});
    }
  }
}

export function addPublish(data){
  return async function (dispatch) {
    actions.connecting(dispatch);

    let err, publishRes;
    [err, publishRes] = await to(axios.post(api + '/survey/publish/add', {data: data}));
    if(err){actions.connectionError(dispatch); return;}

    if(publishRes.data.result === 'success'){
      //console.log(publishRes.data);
      dispatch({type: 'message', payload: ['Submit publish succeed!', '成功提交發佈!', '成功提交发布!']});
      dispatch({type: 'updatePublishes', payload: [publishRes.data.updatedPublish]});
      dispatch({type: 'updateCreatedPublishes', payload: [publishRes.data.updatedPublish._id]});
      dispatch({type: 'updateSchools', payload: [publishRes.data.school]});

      dispatch({type: 'pullView'});
    }else{
      dispatch({type: 'message', payload: ['Failed to submit publish! Please make sure the school code is valid!', '發佈提交失敗! 請確保學校代碼輸入正確!', '发布提交失败! 请确保学校代码输入正确!']});
    }
  }
}

export function editQuestionnaire(data){
  return async function (dispatch) {
    actions.connecting(dispatch);

    let err, questRes;
    [err, questRes] = await to(axios.post(api + '/survey/questionnaire/edit', {data: data}));
    if(err){actions.connectionError(dispatch); return;}

    if(questRes.data.result === 'success'){
      console.log(questRes.data);
      dispatch({type: 'message', payload: ['Edit questionnaire succeed!', '成功修改問卷!', '成功修改问卷!']});
      dispatch({type: 'updateQuestions', payload: questRes.data.updatedQuestions});
      dispatch({type: 'updateQuestionnaires', payload: [questRes.data.updatedQuestionnaire]});
      dispatch({type: 'pullView'});
    }else{
      dispatch({type: 'message', payload: ['Failed to edit questionnaire!', '問卷修改失敗!', '问卷修改失败!']});
    }
  }
}

export function addQuestionnaire(data){
  return async function (dispatch) {
    actions.connecting(dispatch);

    let err, questRes;
    [err, questRes] = await to(axios.post(api + '/survey/questionnaire/add', {data: data}));
    if(err){actions.connectionError(dispatch); return;}

    if(questRes.data.result === 'success'){
      console.log(questRes.data);
      dispatch({type: 'message', payload: ['Submit questionnaire succeed!', '成功提交問卷!', '成功提交问卷!']});
      dispatch({type: 'updateQuestions', payload: questRes.data.updatedQuestions});
      dispatch({type: 'updateQuestionnaires', payload: [questRes.data.updatedQuestionnaire]});
      dispatch({type: 'updateCreatedQuestionnaires', payload: [questRes.data.updatedQuestionnaire._id]});
      dispatch({type: 'pullView'});
    }else{
      dispatch({type: 'message', payload: ['Failed to submit questionnaire!', '問卷提交失敗!', '问卷提交失败!']});
    }
  }
}

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

export const viewSubmit = (submit) =>{
  return {
    type: 'viewSubmit',
    payload: submit
  }
}

export function getPublishSubmittedData(publish){
  return async function (dispatch) {
      let err, res;
      [err, res] = await to(axios.post(api + '/survey/publish/getSubmitted', { data: publish }));
      if(err){actions.connectionError(dispatch); return;}

      if(res.data.result === 'success'){
        dispatch({type: 'updateSubmits', payload: res.data.submits });
        dispatch({type: 'updateAnswers', payload: res.data.answers });
        dispatch({type: 'updateProfiles', payload: res.data.profiles });
      } else {
        dispatch({type: 'message', payload: ['Failed to load publish submitted data!',  '無法查閱發佈數據！',  '无法查阅发布数据！']});
      }
  }
}

export function getPublishStatistics(publishId){
  return async function (dispatch) {
      let err, res;
      [err, res] = await to(axios.post(api + '/survey/publish/getStatistics', { data: publishId }));
      if(err){actions.connectionError(dispatch); return;}

      if(res.data.result === 'success'){
        dispatch({type: 'setStatistics', payload: {id: publishId, statistics: res.data.statistics}});
      } else {
        dispatch({type: 'message', payload: ['Failed to load publish statistics!',  '無法查閱發佈統計數據！',  '无法查阅发布统计数据！']});
      }
  }
}

export function editSubmit(data){
  return async function (dispatch) {
    actions.connecting(dispatch);

    let err, res;
    [err, res] = await to(axios.post(api + '/survey/submit/edit', {data: data}));
    if(err){actions.connectionError(dispatch); return;}

    if(res.data.result === 'success'){
      console.log(res.data);
      dispatch({type: 'message', payload: ['Edit answer succeed!', '成功修改答案!', '成功修改答案!']});
      dispatch({type: 'updateSubmits', payload: [res.data.updatedSubmit]});
      dispatch({type: 'updateAnswers', payload: res.data.updatedAnswers});
      dispatch({type: 'pullView'});
    }else{
      dispatch({type: 'message', payload: ['Failed to edit answer!', '答案修改失敗!', '答案修改失败!']});
    }
  }
}

export function addSubmit(data){
  return async function (dispatch) {
    actions.connecting(dispatch);

    let err, res;
    [err, res] = await to(axios.post(api + '/survey/submit/add', {data: data}));
    if(err){actions.connectionError(dispatch); return;}

    if(res.data.result === 'success'){
      //console.log(res.data);
      dispatch({type: 'message', payload: ['Submit answer succeed!', '成功提交答案!', '成功提交答案!']});
      dispatch({type: 'updateSubmits', payload: [res.data.updatedSubmit]});
      dispatch({type: 'updateAnswers', payload: res.data.updatedAnswers});
      dispatch({type: 'pullView'});
    }else{
      dispatch({type: 'message', payload: ['Failed to submit answer!', '答案提交失敗!', '答案提交失败!']});
    }
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
      dispatch({type: 'updatePublishes', payload: publishRes.data.updatedPublish});
      dispatch({type: 'viewPublish', payload: publishRes.data.updatedPublish});
      dispatch({type: 'pullView'});
    }else{
      dispatch({type: 'message', payload: ['Failed to edit publish! Please make sure the school code is valid!', '發佈修改失敗! 請確保學校代碼輸入正確!', '发布修改失败! 请确保学校代码输入正确!']});
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
      dispatch({type: 'updateQuestionnaires', payload: [publishRes.data.updatedQuestionnaire]});

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

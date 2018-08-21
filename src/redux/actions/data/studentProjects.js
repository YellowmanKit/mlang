import axios from 'axios';
import * as actions from '../actions';
import to from '../to';
var api = process.env.REACT_APP_API;

export const viewStudentProject = (_studentProject) =>{
  return {
    type: 'viewStudentProject',
    payload:  _studentProject
  }
}

export function clearAlert(studentProjectId){
  return async function (dispatch) {
    let err, res;
    [err, res] = await to(axios.post(api + '/studentProject/clearAlert', { data: {studentProjectId: studentProjectId} }));
    if(err){ actions.connectionError(dispatch); return; }

    if(res.data.result === 'success'){
      dispatch({type: "updateStudentProjects", payload: [res.data.updatedStudentProject]});
    }
  }
}

export function getStudentProjects(studentProjects){
  return async function (dispatch) {
    //actions.connecting(dispatch);
    let err, res;
    [err, res] = await to(axios.post(api + '/studentProject/getMultiple', { data: studentProjects }));
    if(err){ actions.connectionError(dispatch); return; }

    if(res.data.result === 'success'){
      dispatch({type: "updateStudentProjects", payload: res.data.studentProjects});
      dispatch({type: "updateCards", payload: res.data.cards});
      dispatch({type: "updateLangs", payload: res.data.langs});
      dispatch({type: "updateProfiles", payload: res.data.profiles});
    }else{
      dispatch({type: "message", payload: ['Failed to get student projects data!', '無法查閱學生專題研習資料!']});
    }
  }
}

export function getStudentProject(_student, _project, studentProjectsLength){
  return async function (dispatch) {
    let err, res;
    [err, res] = await to(axios.get(api + '/studentProject/get', { headers: { student: _student, project: _project }}))
    if(err){ actions.connectionError(dispatch); return; }

    if(res.data.result === 'success'){
      dispatch({type: "updateStudentProjects", payload: [res.data.studentProject]});
      dispatch({type: "viewStudentProject", payload: res.data.studentProject});
      dispatch({type: "updateProject", payload: res.data.updatedProject});
    }else{
      console.log('failed to get studentProject')
    }
  }
}

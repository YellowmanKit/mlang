import axios from 'axios';
import * as actions from '../actions';
var api = process.env.REACT_APP_API;

export const viewStudentProject = (_studentProject) =>{
  return {
    type: 'viewStudentProject',
    payload:  _studentProject
  }
}

export function getStudentProjects(studentProjects){
  return function (dispatch) {
    //actions.connecting(dispatch);
    axios.post(api + '/studentProject/getMultiple', { data: studentProjects })
    .then(res=>{
      if(res.data.result === 'success'){
        dispatch({type: "appendStudentProjects", payload: res.data.studentProjects});
        dispatch({type: "appendStudents", payload: res.data.students});
      }else{
        dispatch({type: "showModalButton"});
        dispatch({type: "message", payload: ['Failed to get student projects data!', '無法查閱學生專題研習資料!']});
      }
    }).catch(err=>{
      actions.connectionError(dispatch);
    })
  }
}

export function getStudentProject(_student, _project, studentProjectsLength){
  //console.log(_student)
  //console.log(_project)
  return async function (dispatch) {
    //actions.connecting(dispatch);
    const res = await axios.get(api + '/studentProject/get', {
      headers: {
        student: _student,
        project: _project
      }
    }).catch(err=>{
      actions.connectionError(dispatch);
    })
    if(res.data.result === 'success'){
      dispatch({type: "appendStudentProjects", payload: [res.data.studentProject]});
      dispatch({type: "viewStudentProject", payload: res.data.studentProject});
      dispatch({type: "updateProject", payload: res.data.updatedProject});
    }else{
      console.log('failed to get studentProject')
    }
  }
}

/*export function addStudentProject(data){
  return async function (dispatch) {
    actions.connecting(dispatch);
    const res = await axios.post(api + '/studentProject/add', {
      data: {
        student: data.author,
        project: data.project
      }
    }).catch(err=>{
      actions.connectionError(dispatch);
    })
    return res.data.studentProject;
  }
}*/

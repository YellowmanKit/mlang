import axios from 'axios';
import * as actions from '../actions';
var api = process.env.REACT_APP_API;

export const viewStudentProject = (_index, _studentProject) =>{
  return {
    type: 'viewStudentProject',
    payload: { index: _index, studentProject: _studentProject}
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
      dispatch({type: "viewStudentProject", payload: {index: studentProjectsLength, studentProject: res.data.studentProject}});

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

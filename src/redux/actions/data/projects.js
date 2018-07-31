import axios from 'axios';
import * as actions from '../actions';
var api = process.env.REACT_APP_API;

export const viewProject = (_index, _project) =>{
  return {
    type: 'viewProject',
    payload: { index: _index, project: _project}
  }
}

export function getProjects(projects){
  //console.log(projects)
  return function (dispatch) {
    //actions.connecting(dispatch);
    axios.post(api + '/project/getMultiple', { data: projects })
    .then(res=>{
      if(res.data.result === 'success'){
        dispatch({type: "updateProjects", payload: res.data.projects});
      }else{
        dispatch({type: "showModalButton"});
        dispatch({type: "message", payload: ['Failed to get projects data!', '無法查閱專題研習資料!']});
      }
    }).catch(err=>{
      actions.connectionError(dispatch);
    })
  }
}

export function addProject(newProject){
  //console.log(newProject)
  return function (dispatch) {
    actions.connecting(dispatch);

    var iconFile = new FormData();
    iconFile.append('files', newProject.icon, 'projectIcon');

    axios.post(api + '/upload', iconFile, { headers: { type: 'projectIcon'}}).then(res=>{
      //console.log("File uploaded");
      const data = res.data;
      if(data.result === 'failed'){
        actions.connectionError(dispatch);
        return;
      }
      newProject['icon'] = data.filenames[0];

      axios.post(api + '/project/add', {
        data: newProject
      }).then(res=>{
        dispatch({type: "showModalButton"});
        const result = res.data.result
        //console.log(res.data);
        if(result === 'success'){
          dispatch({type: "message", payload: ['Add project succeed!', '成功創建專題研習!']});
          dispatch({type: "updateProjects", payload: [res.data.newProject]});
          dispatch({type: "updateTeachingCourse", payload: res.data.updatedCourse});
          dispatch({type: "pullView"});
          //dispatch({type: "setPhoto", payload: {blob: null, url: null}});
        }else{
          dispatch({type: "message", payload: ['Add project failed! Please try again!', '創建失敗! 請再試一次!']});
        }
      }).catch(err=>{
        actions.connectionError(dispatch);
      })

    }).catch(err=>{
      actions.connectionError(dispatch);
    })

  }
}

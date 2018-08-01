import axios from 'axios';
import * as actions from '../actions';
var api = process.env.REACT_APP_API;

export const viewCourse = (course) =>{
  return {
    type: 'viewCourse',
    payload: course
  }
}

export function joinCourse(_data){

  return function (dispatch) {
    actions.connecting(dispatch);

    axios.post(api + '/course/join', {
      data: _data
    }).then(res=>{
      dispatch({type: "showModalButton"});
      if(res.data.result === 'failed'){
        dispatch({type: "message", payload: ['Join course failed! Please make sure to enter a correct code!',  '加入失敗! 請確定代碼輸入正確!']});
        return;
      }
      dispatch({type: "message", payload: ['Join course succeed!', '成功加入班別!']});
      dispatch({type: "updateCourses", payload: [res.data.joinedCourse]});
      dispatch({type: "updateJoinedCourses", payload: [res.data.joinedCourse._id]});
      dispatch({type: "setProfile", payload: res.data.updatedProfile});
      dispatch({type: "backToHome"});

    }).catch(err=>{
      actions.connectionError(dispatch);
    })
  }
}

export function addCourse(newCourse){
  //console.log(newCourse)
  return function (dispatch) {
    actions.connecting(dispatch);

    var iconFile = new FormData();
    iconFile.append('files', newCourse.icon, 'courseIcon.png');

    axios.post(api + '/upload', iconFile, { headers: { type: 'courseIcon'}}).then(res=>{
      //console.lupdatele uploaded");
      const data = res.data;
      if(data.result === 'failed'){
        actions.connectionError(dispatch);
        return;
      }

      newCourse['icon'] = data.filenames[0];

      axios.post(api + '/course/add', {
        data: newCourse
      }).then(res=>{
        dispatch({type: "showModalButton"});
        if(res.data.result === 'success'){
          dispatch({type: "message", payload: ['Add course succeed!', '成功創建班別!']});
          dispatch({type: "updateCourses", payload: [res.data.newCourse]});
          dispatch({type: "updateTeachingCourses", payload: [res.data.newCourse._id]});
          dispatch({type: "backToHome"});
          //dispatch({type: "setPhoto", payload: {blob: null, url: null}});
        }else{
          dispatch({type: "message", payload: ['Add course failed! Please try again!', '創建失敗! 請再試一次!']});
        }
      }).catch(err=>{
        actions.connectionError(dispatch);
      })

    }).catch(err=>{
      actions.connectionError(dispatch);
    })

  }
}

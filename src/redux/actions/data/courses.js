import axios from 'axios';
import * as actions from '../actions';
var api = process.env.REACT_APP_API;

export const viewCourse = (_index, _course) =>{
  return {
    type: 'viewCourse',
    payload: { index: _index, course: _course}
  }
}

export function joinCourse(_data){

  return function (dispatch) {
    actions.connecting(dispatch);

    axios.post(api + '/course/join', {
      data: _data
    }).then(res=>{
      dispatch({type: "showModalButton"});
      const data = res.data;
      if(data.result === 'failed'){
        dispatch({type: "message", payload: ['Join course failed! Please make sure to enter a correct code!',  '加入失敗! 請確定代碼輸入正確!']});
        return;
      }
      dispatch({type: "message", payload: ['Join course succeed!', '成功加入班別!']});
      const courseJoined = data.joinedCourse;
      dispatch({type: "appendJoinedCourses", payload: courseJoined});
      const updatedProfile = data.updatedProfile;
      dispatch({type: "setProfile", payload: updatedProfile});
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
    iconFile.append('files', newCourse.icon, 'courseIcon');

    axios.post(api + '/upload', iconFile, { headers: { type: 'courseIcon'}}).then(res=>{
      //console.log("File uploaded");
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
        const result = res.data.result
        console.log(res.data);
        if(result === 'success'){
          dispatch({type: "message", payload: ['Add course succeed!', '成功創建班別!']});
          dispatch({type: "appendTeachingCourses", payload: res.data.newCourse});
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

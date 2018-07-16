import axios from 'axios';
import * as actions from './actions';
var api = process.env.REACT_APP_API;

export const setTeachingCourses = (courses) =>{
  return {
    type: 'setTeachingCourses',
    payload: courses
  }
}

export const appendTeachingCourse = (course) =>{
  return {
    type: 'appendTeachingCourse',
    payload: course
  }
}

export function addCourse(newCourse){
  //console.log(newCourse)
  return function (dispatch) {
    var iconFile = new FormData();
    iconFile.append('files', newCourse.icon);

    axios.post(api + '/upload', iconFile, { headers: { type: 'courseIcon'}}).then(res=>{
      console.log("File uploaded");
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
          dispatch({type: "message", payload: {eng: 'Add course succeed!', chi: '成功創建班別!'}});
          dispatch({type: "appendTeachingCourse", payload: res.data.newCourse});
            dispatch({type: "backToHome"});
          //dispatch({type: "setPhoto", payload: {blob: null, url: null}});
        }else{
          dispatch({type: "message", payload: {eng: 'Add course failed! Please try again!', chi: '創建失敗! 請再試一次!'}});
        }
      }).catch(err=>{
        actions.connectionError(dispatch);
      })

    }).catch(err=>{
      actions.connectionError(dispatch);
    })

  }
}

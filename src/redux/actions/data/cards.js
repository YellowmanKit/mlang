import axios from 'axios';
import * as actions from '../actions';
import to from '../to';
//import * as studentProjects from './studentProjects';


var api = process.env.REACT_APP_API;

export const viewCard = (index, card) =>{
  return {
    type: 'viewCard',
    payload: { index: index, card: card}
  }
}

export function getCards(cardsId){
  //console.log(cardsId)
  return async function (dispatch) {
    let err, cardsRes;
    [err, cardsRes] = await to(axios.post(api + '/card/getMultiple', { data: { cards: cardsId}}))
    if(err){actions.connectionError(dispatch); return;}

    if(cardsRes.data.result === 'success'){
      dispatch({type: "appendCards", payload: cardsRes.data.cards});
      dispatch({type: "appendLangs", payload: cardsRes.data.langs});
    }else{
      console.log('get cards failed!')
    }
  }
}

export function addCard(data){
  return async function (dispatch) {
    actions.connecting(dispatch);
    /*var studentProject = data.studentProject;
    if(studentProject.project === undefined){
      studentProject = await studentProjects.addStudentProject(data)(dispatch);
    }*/

    var cardFile = new FormData();
    //data.icon.originalname = 'cardIcon';
    cardFile.append('files', data.icon);
    const editLangs = data.editLangs;
    for(var i=0;i<editLangs.length;i++){
      //editLangs[i].audioBlob.originalname = 'langAudio';
      cardFile.append('files', editLangs[i].audioBlob);
    }
    let err, uploadRes, cardRes;
    [err, uploadRes] = await to(axios.post(api + '/upload', cardFile, { headers: { type: 'card'}}))
    if(err){actions.connectionError(dispatch); return;}

    const filenames = uploadRes.data.filenames;

    const card = {
      icon: filenames[filenames.length - 1],
      author: data.author,
      studentProject: data.studentProject
    }
    const langs = [];
    for(var j=0;j<editLangs.length;j++){
      const lang = {
        key: editLangs[j].key,
        text: editLangs[j].text,
        audio: filenames[j]
      }
      langs.splice(0,0,lang);
    }
    [err, cardRes] = await to(axios.post(api + '/card/add', { data: { project: data.project, card: card, langs: langs}}))
    if(err){actions.connectionError(dispatch); return;}

    dispatch({type: "showModalButton"});
    if(cardRes.data.result === 'success'){
      dispatch({type: "message", payload: ['Submit card succeed!', '成功提交卡片!']});
      //console.log(cardRes.data.card)
      //console.log(cardRes.data.langs)
      //console.log(cardRes.data.newStudentProject)
      dispatch({type: "appendCards", payload: [cardRes.data.card]});
      dispatch({type: "appendLangs", payload: cardRes.data.langs});
      dispatch({type: "updateStudentProjects", payload: cardRes.data.updatedStudentProject});
      dispatch({type: "pullView"});
    }else{
      dispatch({type: "message", payload: ['Submit card failed! Please try again!', '提交失敗! 請再試一次!']});
    }

  }
}

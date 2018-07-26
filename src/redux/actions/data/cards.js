import axios from 'axios';
import * as actions from '../actions';
import to from '../to';
//import * as studentProjects from './studentProjects';


var api = process.env.REACT_APP_API;

export const gradeCards = (id, cards) =>{
  return {
    type: 'gradeCards',
    payload: { studentProjectId: id, cards: cards}
  }
}

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
      dispatch({type: "appendLangs", payload: cardsRes.data.langs});
      dispatch({type: "appendCards", payload: cardsRes.data.cards});
      dispatch({type: "appendStudents", payload: cardsRes.data.students});
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
    cardFile.append('files', data.icon, 'cardIcon');
    const editLangs = data.editLangs;
    for(var i=0;i<editLangs.length;i++){
      cardFile.append('files', editLangs[i].audioBlob, 'langAudio_' + i);
    }
    let err, uploadRes, cardRes;
    [err, uploadRes] = await to(axios.post(api + '/upload', cardFile, { headers: { type: 'card'}}))
    if(err){actions.connectionError(dispatch); return;}

    const filenames = uploadRes.data.filenames;
    var cardIcon;
    var langAudios = [];
    for(var j=0;j<filenames.length;j++){
      const splted = filenames[j].split('-');
      if(splted[1] === 'cardIcon'){
        cardIcon = filenames[j];
      }else{
        langAudios.splice(0,0, filenames[j]);
      }
    }

    const card = {
      icon: cardIcon,
      author: data.author,
      studentProject: data.studentProject
    }
    const langs = [];
    for(var k=0;k<editLangs.length;k++){
      const lang = {
        key: editLangs[k].key,
        text: editLangs[k].text,
        audio: getLangAudio(langAudios, k)
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
      //dispatch({type: "updateProject", payload: cardRes.data.updatedProject});
      dispatch({type: "updateStudentProject", payload: cardRes.data.updatedStudentProject});
      dispatch({type: "setEditLangs", payload: []});
      //dispatch({type: "setPhoto", payload: {photoUrl: null, photoBlob: null}});
      dispatch({type: "pullView"});
    }else{
      dispatch({type: "message", payload: ['Submit card failed! Please try again!', '提交失敗! 請再試一次!']});
    }

  }
}

function getLangAudio(audios, index){
  for(var i=0;i<audios.length;i++){
    const langIndex = audios[i].slice(-1);
    if(langIndex === '' + index){
      return audios[i]
    }
  }
  return '';
}

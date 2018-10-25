import * as actions from '../actions';
import to from '../to';
import Parse from 'parse';
Parse.initialize(process.env.REACT_APP_PARSE_APP_ID, process.env.PARSE_DOTNET_KEY);
Parse.serverURL = process.env.REACT_APP_PARSE_SERVER;

export function fetchUser(id, pw){
  return async function (dispatch){
    let err, res, user;
    [err, user] = await to(Parse.User.logIn(id, pw));
    if(err){
      dispatch({type: 'message', payload: ['Failed to login mlanghku! Please check if mlanghku id and password are correct in Account!', '無法登入mlanghku! 請在帳號資訊檢查mlanghku登入名稱及密碼是否正確!', '无法登入mlanghku! 请在帐号资讯检查mlanghku登入名称及密码是否正确!']});
      return;
    }
    console.log(user);

    const timestamp = actions.timestamp();
    [err, res] = await to(Parse.Cloud.run('RenewUser', { timestamp: timestamp }));
    if(err){ console.log(err.message); return; }

    const data = JSON.parse(res);
    console.log(data);
    processUserData(data)(dispatch);
  }
}

function fetchLangs(relation){
  return async function (dispatch){
    let err, langs;
    var processedLangs = [];
    var langsId = [];
    [err, langs] = await to(relation.query().find());
    if(err){ actions.mlanghkuDataFetchFailed(dispatch); return; }

    //console.log(langs);
    for(var i=0;i<langs.length;i++){
      const attributes = langs[i].attributes;
      const lang = {
        _id: langs[i].id,
        createdAt: attributes.createdAt,
        key: langKeyToKey(attributes.langKey),
        text: attributes.name,
        audio: attributes.sound._url
      }
      processedLangs.push(lang);
      langsId.push(lang._id);
    }
    //console.log(processedCards);
    dispatch({type: 'updateLangs', payload: processedLangs});
    return langsId;
  }
}

function langKeyToKey(langKey){
  switch (langKey) {
    case 'zh_w':
      return 'chinese_written';
    case 'zh':
      return 'chinese_spoken';
    case 'pth':
      return 'pth_spoken';
    case 'pth_w':
      return 'pth_written';
    case 'en':
      return 'english';
    case 'hi':
      return 'hindi';
    case 'ur':
      return 'urdu';
    case 'ne':
      return 'nepalese';
    case 'tl':
      return 'tagalog';
    case 'jp':
      return 'japanese';
    case 'es':
      return 'spanish';
    case 'de':
      return 'german';
    case 'fr':
      return 'french';
    default:
      return 'chinese_written'
  }
}

function fetchCards(relation){
  return async function (dispatch){
    let err, cards;
    var processedCards = [];
    var cardsId = [];
    [err, cards] = await to(relation.query().find());
    if(err){ actions.mlanghkuDataFetchFailed(dispatch); return; }

    //console.log(cards);
    for(var i=0;i<cards.length;i++){
      const attributes = cards[i].attributes;
      const langsId = await fetchLangs(attributes.langs)(dispatch);
      const card = {
        _id: cards[i].id,
        comment: attributes.comments? attributes.comments.join():'',
        audioComment: attributes.commentSound? attributes.commentSound._url:null,
        langs: langsId,
        author: attributes.author.id,
        icon: attributes.image._url,
        createdAt: attributes.createdAt,
        grade: statusToGrade(attributes.status)
      }
      processedCards.push(card);
      cardsId.push(card._id);
    }
    //console.log(processedCards);
    dispatch({type: 'updateCards', payload: processedCards});
    return cardsId;
  }
}

function statusToGrade(status){
  switch (status) {
    case 0:
      return 'notGraded'
    case 1:
      return 'passed'
    case 2:
      return 'failed'
    case 3:
      return 'featured'
    default:
      return 'notGraded'
  }
}

export function fetchStudentProjects(project){
  return async function (dispatch){
    let err, data;
    const query = new Parse.Query('StudentProject');
    query.equalTo('project', { __type: 'Pointer', className: 'Project', objectId: project._id });
    [err, data] = await to(query.find());
    if(err){ actions.mlanghkuDataFetchFailed(dispatch); return; }

    //console.log(data);
    var updatedProject = project;
    var studentProjects = [];
    var studentProjectsId = [];
    for(var i=0;i<data.length;i++){
      const attributes = data[i].attributes;
      //console.log(attributes);
      const cardsId = await fetchCards(attributes.cards)(dispatch);
      const studentProject = {
        _id: data[i].id,
        project: attributes.project.id,
        student: attributes.student.id,
        cards: cardsId,
        createdAt: attributes.createdAt
      }
      studentProjectsId.push(studentProject._id);
      studentProjects.push(studentProject);
    }
    updatedProject.studentProjects = studentProjectsId;
    updatedProject.fetched = true;
    dispatch({type: 'updateStudentProjects', payload: studentProjects});
    dispatch({type: 'updateProjects', payload: [updatedProject]});
    dispatch({type: 'viewProject', payload: updatedProject});
  }
}

function processUserData(data){
  const courses = data.courses? data.courses: [data['my-course']];
  const projects = data['my-projects'].slice(0);
  return function (dispatch){
    var processedCourses = [];
    var subjects = [];
    var processedProjects = [];
    var coursesIds = [];
    for(var i in courses){
      const course = {
        mlanghku: true,
        _id: courses[i].objectId,
        icon: courses[i].courseIcon? courses[i].courseIcon.url: null,
        teacher: courses[i].courseTeacher,
        title: courses[i].courseTitle,
        subjects: [courses[i].objectId],
        joinedStudents: [],
        code: '',
        endDate: new Date(),
        createdAt: new Date(),
      }
      var subject = {
        mlanghku: true,
        _id: course._id,
        course: course._id,
        title: 'mlangHKU',
        description: '',
        createdAt: new Date(),
        projects: []
      }
      for(var j in projects){
        if(projects[j].course.objectId === course._id){
          const project = {
            mlanghku: true,
            _id: projects[j].objectId,
            icon: projects[j].projectIcon? projects[j].projectIcon.url: null,
            title: projects[j].projectTitle,
            description: projects[j].projectDesc,
            subject: subject._id,
            endDate: new Date(projects[j].dueDate.iso),
            createdAt: new Date(projects[j].createdAt),
            studentProjects: []
          }
          subject['projects'].splice(0, 0, project._id);
          processedProjects.push(project)
        }
      }
      subjects.push(subject);
      coursesIds.push(course._id);
      processedCourses.push(course);
    }
    dispatch({type: 'updateProjects', payload: processedProjects});
    dispatch({type: 'updateSubjects', payload: subjects});
    dispatch({type: 'updateCourses', payload: processedCourses});
    if(data.courses){
      dispatch({type: 'updateTeachingCourses', payload: coursesIds});
    }else{
      dispatch({type: 'updateJoinedCourses', payload: coursesIds});
    }
  }
}

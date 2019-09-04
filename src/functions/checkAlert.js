
const checkAlert = {
  subject: (subject, app)=>{
    const projectsId = subject.projects;
    for(var i=0;i<projectsId.length;i++){
      if(checkProject(projectsId[i], app)){ return true; }
    }
    return false;
  },
  project: (project, app)=>{
    if(checkProject(project._id, app)){ return true; }
    return false;
  },
  survey: (survey, app)=>{
    if(checkSurvey(survey, app)){ return true; }
    return false;
  }
}

function checkSurvey(survey, app){
  const assigned = survey.assignedPublishes;
  var submits = survey.submits;
  var needAttention = false;
  for(var i=0;i<assigned.length;i++){
    if(submits.length === 0){ submits = [{publish: null}]; }
    for(var j=0;j<submits.length;j++){
      if(submits[j].publish === assigned[i]){ break; }
      if(j === submits.length - 1){
        const publish = app.functions.getById.publish(assigned[i], app.store);
        const questionnaire = app.functions.getById.questionnaire(publish.questionnaire, app.store);
        app.actions.notices.newPublishNeedAttention(publish, questionnaire, app);
        needAttention = true;
      }
    }
  }
  return needAttention;
}

function checkProject(projectId, app){
  const project = app.functions.getById.project(projectId, app.store);
  if(!project){ return false; }
  if(app.functions.outDated(project.endDate)){ return false; }
  const studentProjects = project.studentProjects;
  var flag = 0;
  for(var j=0;j<studentProjects.length;j++){
    if(checkStudentProject(studentProjects[j], project, app)){ return true; }
    flag += checkNewProject(studentProjects[j], project, app);
  }
  if(flag === 0 &&
    app.store.user.type === 'student' &&
    app.functions.deltaDay(new Date(), new Date(project.createdAt)) < 7 &&
    !app.functions.outDated(new Date(project.endDate))){
    app.actions.notices.newProjectNeedAttention(project, app);
    return true;
  }
  return false;
}

function checkNewProject(studentProjectId, project, app){
  const studentProject = app.functions.getById.studentProject(studentProjectId, app.store);
  if(!studentProject){ return 1; }
  if(studentProject.student === app.store.user._id){
    //return 1;
    if(studentProject.cards.length > 0){ return 1; }
    return 0;
  }
  return 0;
}

function checkStudentProject(studentProjectId, project, app){
  const studentProject = app.functions.getById.studentProject(studentProjectId, app.store);
  if(!studentProject){ return false; }
  const cards = studentProject.cards;
  for(var l=0;l<cards.length;l++){
    if(checkCard(cards[l], project, app)){ return true; }
  }
  return false;
}

function checkCard(cardId, project, app){
  const userType = app.store.user.type;
  const subject = app.functions.getById.subject(project.subject, app.store);
  const course = app.functions.getById.course(subject.course, app.store);

  const card = app.functions.getById.card(cardId, app.store);
  if(!card){ return false; }
  if(userType === 'teacher' && card.grade === 'notGraded'){
    app.actions.notices.newCardInProject(project, course, app);
    return true;
  }
  if(userType === 'student'&& card.author === app.store.user._id){
    if(card.grade === 'failed' && card.author === app.store.user._id && !card.resubmitted){
      app.actions.notices.failedCardInProject(project, app);
      return true;
    }
    if(card.grade !== 'notGraded' && card.grade !== 'failed' && !card.studentRead){
      app.actions.notices.gradedCardNotReadInProject(project, app);
      return true;
    }
  }
}

module.exports = checkAlert;

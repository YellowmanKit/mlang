
const checkAlert = {
  subject: (subject, store, getById)=>{
    const userType = store.user.type;
    const projectsId = subject.projects;
    for(var i=0;i<projectsId.length;i++){
      const project = getById.project(projectsId[i], store);
      if(!project){ return false; }
      const studentProjects = project.studentProjects;
      for(var j=0;j<studentProjects.length;j++){
        const studentProject = getById.studentProject(studentProjects[j], store);
        if(!studentProject){ return false; }
        const cards = studentProject.cards;
        for(var l=0;l<cards.length;l++){
          const card = getById.card(cards[l], store);
          if(!card){ return false; }
          if(userType === 'teacher' && card.grade === 'notGraded'){ return true; }
          if(userType === 'student' && card.grade === 'failed' && !card.resubmitted){ return true; }
        }
      }
    }
    return false;
  },
  project: (project, store, getById)=>{
    const userType = store.user.type;
    const studentProjects = project.studentProjects;
    for(var j=0;j<studentProjects.length;j++){
      const studentProject = getById.studentProject(studentProjects[j], store);
      if(!studentProject){ return false; }
      const cards = studentProject.cards;
      for(var l=0;l<cards.length;l++){
        const card = getById.card(cards[l], store);
        if(!card){ return false; }
        if(userType === 'teacher' && card.grade === 'notGraded'){ return true; }
        if(userType === 'student' && card.grade === 'failed' && !card.resubmitted){ return true; }
      }
    }
    return false;
  }
}

module.exports = checkAlert;

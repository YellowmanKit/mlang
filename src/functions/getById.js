
const getById = {
  profile: (id, store)=>{ return getItemById(store.profiles.profiles, id)},
  school: (id, store)=>{ return getItemById(store.schools.schools, id)},
  course: (id, store)=>{ return getItemById(store.courses.courses, id)},
  subject: (id, store)=>{ return getItemById(store.subjects.subjects, id)},
  project: (id, store)=>{ return getItemById(store.projects.projects, id)},
  studentProject: (id, store)=>{ return getItemById(store.studentProjects.studentProjects, id)},
  card: (id, store)=>{ return getItemById(store.cards.cards, id)},
  lang: (id, store)=>{ return getItemById(store.langs.langs, id)},
  questionnaire: (id, store)=>{ return getItemById(store.survey.questionnaires, id)},
  question: (id, store)=>{ return getItemById(store.survey.questions, id)},

  profileByUser: (userId, store)=>{
    const profilesData = store.profiles.profiles;
    for(var i=0;i<profilesData.length;i++){
      if(profilesData[i].belongTo === userId){
        return profilesData[i];
      }
    }
    return null;
  },
  studentProjectByPair: (studentId, projectId, store)=>{
    const studentProjectsData = store.studentProjects.studentProjects;
    for(var i=0;i<studentProjectsData.length;i++){
      if(studentProjectsData[i].project === projectId &&
        studentProjectsData[i].student === studentId){
        return studentProjectsData[i];
      }
    }
    return null;
  },
  joinedGroupByProject: (projectId, store)=>{
    const groupsData = store.groups.groups;
    for(var i=0;i<groupsData.length;i++){
      if(groupsData[i].project === projectId &&
        groupsData[i].members.includes(store.user._id)){
        return groupsData[i];
      }
    }
    return null;
  },
  groupsByProject: (projectId, store)=>{
    var groups = [];
    const groupsData = store.groups.groups;
    for(var i=0;i<groupsData.length;i++){
      if(groupsData[i].project === projectId){
        groups = [...groups, groupsData[i]];
      }
    }
    return groups;
  },
  courseBySubject: (subjectId, store)=>{
    const coursesData = store.courses.courses;
    for(var i=0;i<coursesData.length;i++){
      if(coursesData[i].subjects.indexOf(subjectId) >= 0){ return coursesData[i]; }
    }
    return null;
  },
  schoolByCode: (code, store)=>{
    const schoolData = store.schools.schools;
    for(var i=0;i<schoolData.length;i++){
      if(schoolData[i].code === code){ return schoolData[i]; }
    }
    return null;
  },
  itemsByItemsId: (items, ids)=>{
    var returnItems = [];
    for(var i=0;i<items.length;i++){
      if(ids.indexOf(items[i]._id) > -1){ returnItems.push(items[i]); }
    }
    return returnItems;
  }
}

function getItemById(data, id){
  for(var i=0;i<data.length;i++){
    if(data[i]._id === id){
      return data[i];
    }
  }
  return null;
}

module.exports = getById;

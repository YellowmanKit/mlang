import Cell from './Cell';

class SubjectCell extends Cell {

  constructor(props){
    super(props);
    this.init(props);
    this.state = {
      title: props.data.title,
      size: [this.bs.height * 0.2, this.bs.height * 0.2],
      filename: props.data.icon,
      type: 'subjectIcon',
      status: 'init',
      alert: this.checkAlert()
    }
  }

  checkAlert(){
    const userType = this.store.user.type;
    const subject = this.props.data;
    const projectsId = subject.projects;
    for(var i=0;i<projectsId.length;i++){
      const project = this.func.getProjectById(projectsId[i]);
      const studentProjects = project.studentProjects;
      for(var j=0;j<studentProjects.length;j++){
        const studentProject = this.func.getStudentProjectById(studentProjects[j]);
        const cards = studentProject.cards;
        for(var l=0;l<cards.length;l++){
          const card = this.func.getCardById(cards[l]);
          if(userType === 'teacher' && card.grade === 'notGraded'){ return true; }
          if(userType === 'student' && card.grade === 'failed' && !card.resubmitted){ return true; }
        }
      }
    }
    return false;
  }

}

export default SubjectCell;

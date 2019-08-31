import React from 'react';
import SubView from 'components/main/pages/home/views/SubView';
import StudentProjectRow from 'components/main/items/rows/StudentProjectRow';

class StudentProjects extends SubView {

  constructor(props){
    super(props);
    this.state = {
      studentProjects: []
    }
  }

  componentDidMount(){
    this.init(this.props);
    if(this.state.studentProjects.length === 0){
      this.initStudentProjects(this.props);
    }
    this.setListScroll('studentProjectList');
  }

  componentWillReceiveProps(newProps){
    this.init(newProps);
    //if(this.state.studentProjects.length === 0){
      this.initStudentProjects(newProps);
    //}
  }

  initStudentProjects(props){
    var studentProjects = this.store.projects.viewingProject.studentProjects.slice(0);

    for(var i=0;i<studentProjects.length;i++){
      studentProjects[i] = this.func.getById.studentProject(studentProjects[i], this.store);
      //console.log(studentProjects[i])
      if(studentProjects[i] === null){ console.log('no studentProjects'); return; }
      var total = 0;
      var featured = 0;
      var alert = 0;
      const cardsId = studentProjects[i].cards;
      total = cardsId.length;
      for(var j=0;j<cardsId.length;j++){
        const card = this.func.getById.card(cardsId[j], this.store);
        if(card === null){ console.log('no card data'); return; }
        if(!card.grade || card.grade === 'notGraded'){
          alert++;
        }
        if(card.grade && card.grade === 'featured'){
          featured++;
        }
      }
      studentProjects[i] = {...studentProjects[i], total: total, featured: featured, alert: alert}
    }
    this.setState({
      studentProjects: studentProjects
    });
  }

  missingStudentsList(){
    const students = this.store.courses.viewingCourse.joinedStudents;
    const studentProjects = this.state.studentProjects;
    const submittedStudents = [];
    for(var i=0;i<studentProjects.length;i++){
      if(studentProjects[i].cards.length > 0){ submittedStudents.push(studentProjects[i].student); }
    }
    return students.map((student, i)=>{
      if(submittedStudents.indexOf(student) < 0){
        return this.missingStudentRow( this.func.getById.profileByUser(student, this.store) )
      }else{
        return null;
      }
    })
  }

  missingStudentRow(profile){
    if(!profile){ return null; }
    const style = {...this.ui.styles.container, ...{
      width: this.bs.width,
      height: this.bs.height * 0.04,
      backgroundColor: this.ui.colors.ultraLightGrey,
      fontSize: this.bs.height * 0.025,
      fontWeight: 'bold',
      color: this.ui.colors.grey
    }}
    return (
      <div style={style} key={profile._id}>
        {this.func.multiLang(
          profile.name + ' has not yet submitted any card',
          profile.name + ' 尚未提交任何卡片',
          profile.name + ' 尚未提交任何卡片')}
      </div>
    )
  }

  studentProjectsList(){
    /*if(this.state.studentProjects.length === 0){
      return this.subTitle(['No submitted cards','沒有任何已提交的卡片','没有任何已提交的卡片'])
    }*/
    return this.state.studentProjects.map((studentProject, i)=>{
      return(
        <StudentProjectRow
        app={this.app}
        studentProject={studentProject}
        key={studentProject._id}
        byStudent={true}
        onClick={()=>{ this.actions.studentProjects.viewStudentProject(studentProject); this.actions.content.pushView('gradingCards'); }}/>
      )
    })
  }

  render() {
    this.init(this.props);
    return(
      <div style={this.subViewStyle()}>
        <div id={'studentProjectList'} onScroll={()=>{ this.onScroll('studentProjectList'); }} style={{...this.bs, ...this.ui.styles.list}}>
          {this.missingStudentsList()}
          {this.studentProjectsList()}
        </div>
      </div>
    )
  }

}

export default StudentProjects;

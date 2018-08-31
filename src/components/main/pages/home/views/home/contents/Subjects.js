import React from 'react';
import UI from 'components/UI';
import Cell from 'components/main/items/Cell';

class Subjects extends UI {

  subjects(){
    const areaStyle = {...this.ui.styles.area, ...{
      width: '100%',
      height: this.bs.height * 0.57,
      flexFlow: 'row wrap',
      alignItems: 'flex-start',
      overflow: 'auto'
    }}
    return(
      <div style={areaStyle}>
        {this.subjectsCells()}
      </div>
    )
  }

  subjectsCells(){
    const subjects =
    this.store.user.type === 'teacher'? this.store.subjects.teachingSubjects:
    this.store.user.type === 'student'? this.store.subjects.joinedSubjects:
    [];

    var subjectsData = [];
    subjects.map(id=>{
      return subjectsData.push(this.func.getSubjectById(id));
    })
    const containerStyle = {...this.ui.styles.container, ...{
      width: this.bs.width * 0.275,
      height: this.bs.width * 0.3
    }}
    return subjectsData.map((subject, i)=>{
      return(
        <div key={i} style={containerStyle}>
          <Cell app={this.app}
          type={'subject'}
          data={subject}
          onClick={()=>{ this.actions.subjects.viewSubject(subject); this.actions.content.pushView('subject'); }}/>
        </div>
      )
    });
  }

  render() {
    this.init(this.props);

    const title = ['Subjects','議題','议题'];

    const containerStyle = {
      width: '100%',
      height: this.bs.height * 0.62,
      background: this.ui.colors.gradientBasic
    }

    return(
      <div style={containerStyle}>
        {this.tabBar(title)}
        {this.subjects()}
      </div>
    )
  }
}

export default Subjects;

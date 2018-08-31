import React from 'react';
import Row from './Row';

//import icon_student from 'resources/images/icons/student_grey.png';
import cards from 'resources/images/icons/cards_lightgrey.png';
import star2 from 'resources/images/icons/star2_lightgrey.png';
import alert from 'resources/images/icons/alert_black.png';

class StudentProjectRow extends Row {

  constructor(props){
    super(props);
    this.init(props);

    const profile = this.func.getProfileByUserId(props.studentProject.student);
    const project = this.func.getProjectById(props.studentProject.project);
    this.state = {
      filename: (props.byStudent && profile)? profile.icon:(props.byProject && project)? project.icon: null,
      type: 'profileIcon'
    }
    this.checkUrl();
  }

  componentWillReceiveProps(newProps){
    this.init(newProps);
    const profile = this.func.getProfileByUserId(newProps.studentProject.student);
    if(!this.state.filename){
      this.setState({
        filename: profile? profile.icon: null,
        type: 'profileIcon'
      })
      this.checkUrl();
    }
  }

  rowInfoStudent(){
    const studentProject = this.props.studentProject;
    const rowStyle = {...this.ui.styles.area, ...{
      width: '100%',
      height: this.bs.height * 0.06,
      alignItems: 'center'
    }}
    const iconSize = this.bs.height * 0.05;
    const textScale = [this.bs.height * 0.05,''];
    return(
      <div style={rowStyle}>
        {this.icon(cards, [iconSize, iconSize])}
        {this.textDisplay(studentProject.total, textScale, '150%', 'center')}
        {this.verGap('5%')}
        {this.icon(star2, [iconSize, iconSize])}
        {this.textDisplay(studentProject.featured, textScale, '150%', 'center')}
        {this.verGap('5%')}
        {this.icon(alert, [iconSize, iconSize], 0.2)}
        {this.textDisplay(studentProject.alert, textScale, '150%', 'center')}
      </div>
    )
  }

  rowInfoProject(){
    const studentProject = this.props.studentProject;
    const project = this.func.getProjectById(studentProject.project);

    const rowStyle = {...this.ui.styles.area, ...{
      width: '100%',
      height: this.bs.height * 0.06,
      alignItems: 'center'
    }}
    const textScale = ['100%',this.bs.height * 0.06];
    return(
      <div style={rowStyle}>
        {this.textDisplay(project.description, textScale, '125%', 'left')}
      </div>
    )
  }

  render(){
    this.init(this.props);
    const studentProject = this.props.studentProject;
    const profile = this.func.getProfileByUserId(studentProject.student);
    const project = this.func.getProjectById(studentProject.project);
    if(!studentProject || !profile){
      return null;
    }
    
    if(this.store.content.view !== 'student' && studentProject.student === this.store.user._id){
      return null;
    }

    const rowStyle = {...this.ui.styles.area, ...this.ui.styles.button, ...{
      flexShrink: 0,
      height: this.bs.height * 0.15,
      borderBottom: '1px solid ' + this.ui.colors.darkGrey,
      alignItems: 'center'
    }}

    const title =
    this.props.byStudent? profile.name:
    this.props.byProject? project.title:
    '';

    const info =
    this.props.byStudent? this.rowInfoStudent.bind(this):
    this.props.byProject? this.rowInfoProject.bind(this):
    '';

    return(
      <button style={rowStyle} onClick={this.props.onClick}>
        {this.verGap('3%')}
        {this.rowIcon()}
        {profile && this.rowContent(title, info )}
      </button>
    )
  }
}

export default StudentProjectRow;

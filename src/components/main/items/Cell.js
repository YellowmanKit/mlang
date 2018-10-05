import React from 'react';
import UI from 'components/UI';
import {Motion, spring}  from 'react-motion';

import Badge from 'components/main/items/Badge';

import icon_alert2 from 'resources/images/icons/alert2.png';
import passed from 'resources/images/general/passed.png';

class Cell extends UI {

  constructor(props){
    super(props);
    this.init(props);
    this.state = {
      filename: props.data.icon,
      type: this.getFileType(props.type),
      status: 'init'
    }
  }

  componentWillReceiveProps(newProps){
    this.init(newProps);
    const newFilename = newProps.data.icon;
    if(this.state.filename !== newFilename){
      this.setState({ filename: newFilename })
      this.checkUrl();
    }
  }

  getFileType(cellType){
    const fileType =
    cellType === 'profile'? 'profileIcon':
    cellType === 'school'? 'schoolIcon':
    cellType === 'course'? 'courseIcon':
    cellType === 'project'? 'projectIcon':
    cellType === 'card'? 'cardIcon':
    cellType === 'subject'? 'subjectIcon':
    '';
    return fileType;
  }

  cellImage(scale){
    const imageStyle = {...this.ui.styles.container, ...this.ui.styles.border, ...{
      maxWidth: this.scale[0] * 0.9 * scale,
      maxHeight: this.scale[1] * 0.8 * scale,
      marginTop: '4%'
    }};
    return <img style={imageStyle} src={this.url.url? this.url.url: null} alt=''/>
  }

  cellTitle(type, scale){
    var text = '';
    if(type === 'school'){
      text = this.props.data.name;
    }
    if(type === 'course' || type === 'project' || type === 'subject'){
      text = this.props.data.title;
    }
    if(type === 'card'){
      const firstLang = this.func.getLangById(this.props.data.langs[0]);
      text = firstLang !== null? firstLang.text: '';
    }
    if(type === 'profile'){
      text = this.props.data.name;
    }
    var size = 100 * scale;
    const textScale =[size + '%',size + '%'];

    return(
      <div style={{flexGrow: 1, overflow: 'hidden'}}>
        {this.textDisplay(text, textScale, this.bs.height * 0.025)}
      </div>
    )
  }

  checkAlertTag(){
    if(this.props.data.teacherAlert && this.store.user.type === 'teacher'){
      return this.alertTag();
    }else if(this.props.type === 'project' && this.store.user.type === 'student'){
      const studentProject = this.func.getStudentProject(this.store.user._id, this.props.data._id);
      if(studentProject && studentProject.studentAlert){
        return this.alertTag();
      }
    }
    return null;
  }

  alertTag(){
    const style = {
      position: 'absolute',
      top: this.bs.width * -0.015,
      right: this.bs.width * -0.015,
      width: this.bs.width * 0.05,
      height: this.bs.width * 0.05
    }
    return <img style={style} src={icon_alert2} alt=''/>
  }

  passedMark(){
    const style = {
      position: 'absolute',
      width: '100%',
      height: '100%'
    }
    return <img style={style} src={passed} alt=''/>
  }

  render(){
    this.init(this.props);
    //console.log(data)
    if(this.props.data === null){
      return null;
    }

    /*this.scale =
    this.props.type === 'school'? [this.bs.width * 0.33,this.bs.width * 0.2]:
    this.props.type === 'course'? [this.bs.width * 0.2,this.bs.width * 0.2]:
    this.props.type === 'project'? [this.bs.width * 0.2,this.bs.width * 0.2]:
    this.props.type === 'card'? [this.bs.width * 0.22, this.bs.width * 0.3]:
    this.props.type === 'subject'? [this.bs.width * 0.2, this.bs.width * 0.2]:
    '';*/

    this.scale =
    this.props.type === 'school'? [this.bs.height * 0.325,this.bs.height * 0.215]:
    this.props.type === 'course'? [this.bs.height * 0.215,this.bs.height * 0.215]:
    this.props.type === 'project'? [this.bs.height * 0.2,this.bs.height * 0.2]:
    this.props.type === 'card'? [this.bs.height * 0.25, this.bs.height * 0.35]:
    this.props.type === 'subject'? [this.bs.height * 0.2, this.bs.height * 0.2]:
    this.props.type === 'profile'? [this.bs.height * 0.2, this.bs.height * 0.2]:
    '';

    this.outDated =
    this.props.type === 'course'? this.func.outDated(this.props.data.endDate):
    this.props.type === 'project'? this.func.outDated(this.props.data.endDate):
    '';

    const cellStyle = {...this.ui.styles.button, ...this.ui.styles.border, ...{
      margin: '1.5%',
      backgroundColor: 'white',
      flexShrink: 0,
      display: 'flex',
      flexFlow: 'column nowrap',
      alignItems: 'center',
      position: 'relative'
    }}
    const badgeScale = [this.bs.width * 0.125, this.bs.width * 0.125];

    const isInit = this.state.status === 'init';
    const isOpen = this.state.status === 'pointed';

    return(
      <Motion defaultStyle={{scale: this.props.wasHide? 0: isInit? 1:isOpen? 1: 1.05, opacity: this.props.wasHide? 0: this.outDated? (isOpen? 0.25:1) : 1}}
      style={{scale: this.props.wasHide? (isOpen? spring(1.05): spring(1)): isInit? 1:isOpen? spring(1.05): spring(1), opacity: this.outDated? (isOpen? spring(1):spring(0.25)) : spring(1)}}>
        {style=>(
          <button style={{...cellStyle,...{opacity: style.opacity, width: this.scale[0] * style.scale, height: this.scale[1] * style.scale}}}
          onClick={()=>{ this.props.onClick(); }}
          onPointerEnter={()=>{ this.setState({status: 'pointed' })}}
          onPointerLeave={()=>{ this.setState({status: 'not-pointed' })}}>
            {this.props.type === 'card' && <Badge app={this.app} grade={this.props.data.grade} scale={badgeScale} />}
            {this.cellImage(style.scale)}
            {this.cellTitle(this.props.type, style.scale)}
            {this.checkAlertTag()}
            {this.outDated && this.passedMark()}
          </button>
        )}
      </Motion>
    )
  }

}

export default Cell;
